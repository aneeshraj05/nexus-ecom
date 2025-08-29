import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {
    const { currency, router } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
        >
            {/* Product Image */}
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <Image
                        className="h-3 w-3"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            {/* Product Info */}
            <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
            
            {/* Ratings */}
            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon}
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            {/* Price and Buy Now */}
            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">{currency}{product.offerPrice}</p>
                
                {/* Buy Now Button with hover effect */}
                <button className="relative max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full overflow-hidden group">
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                        Buy now
                    </span>
                    <span className="absolute top-0 left-[-100%] w-full h-full bg-orange-500 transition-all duration-300 group-hover:left-0 rounded-full"></span>
                </button>
            </div>
        </div>
    )
}

export default ProductCard;
