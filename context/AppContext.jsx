'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser

// Create Context
export const AppContext = createContext();

// Hook to access Context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Context Provider
export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
  const router = useRouter();
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser(); // Use Clerk's user

  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(false);
  const [isSeller, setIsSeller] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);

  // Load cart from server when user changes
  useEffect(() => {
    if (clerkLoaded) {
      if (clerkUser) {
        // User is authenticated - load cart from server
        loadServerCart();
      } else {
        // User is not authenticated - load cart from localStorage
        loadLocalCart();
      }
    }
  }, [clerkUser, clerkLoaded]);

  // Save cart to appropriate storage when cartItems changes
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      if (clerkUser) {
        // User is authenticated - save to server
        saveCartToServer();
      } else {
        // User is not authenticated - save to localStorage
        saveCartToLocalStorage();
      }
    }
  }, [cartItems, clerkUser]);

  // Load cart from server
  const loadServerCart = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        if (data.cart && data.cart.items) {
          // Convert array format to object format
          const serverCartItems = {};
          data.cart.items.forEach(item => {
            serverCartItems[item.productId] = item.quantity;
          });
          setCartItems(serverCartItems);
        }
      }
    } catch (error) {
      console.error('Failed to load cart from server:', error);
      // Fallback to localStorage if server fails
      loadLocalCart();
    } finally {
      setLoading(false);
    }
  };

  // Load cart from localStorage
  const loadLocalCart = () => {
    try {
      const savedCart = localStorage.getItem('localCart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  };

  // Save cart to server
  const saveCartToServer = async () => {
    try {
      // Convert our cartItems object to array format for the server
      const cartItemsArray = Object.entries(cartItems).map(([productId, quantity]) => {
        const product = products.find(p => p._id === productId);
        return {
          productId,
          quantity,
          name: product?.name || '',
          price: product?.offerPrice || 0,
          image: product?.image?.[0] || ''
        };
      }).filter(item => item.quantity > 0);

      await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItemsArray }),
      });
    } catch (error) {
      console.error('Failed to save cart to server:', error);
    }
  };

  // Save cart to localStorage
  const saveCartToLocalStorage = () => {
    try {
      localStorage.setItem('localCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  };
const clearCart = async () => {
    setCartItems({});
    if (clerkUser) {
      // Clear server cart
      await fetch('/api/cart/clear', { method: 'POST' });
    } else {
      // Clear local cart
      localStorage.removeItem('localCart');
    }
  };

  // Merge local cart with server cart when user logs in
  useEffect(() => {
    if (clerkUser && clerkLoaded) {
      mergeCartsOnLogin();
    }
  }, [clerkUser, clerkLoaded]);

  const mergeCartsOnLogin = async () => {
    try {
      // Get local cart from localStorage
      const localCart = JSON.parse(localStorage.getItem('localCart') || '{}');
      
      if (Object.keys(localCart).length > 0) {
        // Load server cart
        const response = await fetch('/api/cart');
        if (response.ok) {
          const data = await response.json();
          let serverCart = {};
          
          if (data.cart && data.cart.items) {
            data.cart.items.forEach(item => {
              serverCart[item.productId] = item.quantity;
            });
          }
          
          // Merge carts (server cart takes precedence for conflicting items)
          const mergedCart = { ...localCart, ...serverCart };
          setCartItems(mergedCart);
          
          // Clear local storage after successful merge
          localStorage.removeItem('localCart');
        }
      }
    } catch (error) {
      console.error('Failed to merge carts:', error);
    }
  };

  // Dummy fetch product data
  const fetchProductData = async () => {
    setProducts(productsDummyData);
  };

  // Dummy fetch user data
  const fetchUserData = async () => {
    setUserData(userDummyData);
  };

  // Add item to cart
  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
  };

  // Update quantity in cart
  const updateCartQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
  };

  // Get total items in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  };

  // Get total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0 && itemInfo) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // Clear cart (useful after checkout)
  

  // Fetch data on load
  useEffect(() => {
    fetchProductData();
    fetchUserData();
  }, []);

  const value = {
    user: clerkUser || userDummyData, // Use Clerk user or fallback to dummy
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    clearCart,
   
    loading
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};