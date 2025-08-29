"use client";
import React, { useState, useRef, useEffect } from "react";

const CustomerChat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your virtual assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Expanded keywords with more variations
  const keywords = {
    greetings: ["hello", "hi", "hey", "hlo", "helo", "good morning", "good evening", "good afternoon", "greetings", "howdy", "yo", "sup", "what's up", "hi there", "hello there"],
    bye: ["ok", "k", "bye", "tata", "gudbye", "see you", "cu", "seeyou", "goodbye", "farewell", "take care", "cya", "later", "adios", "cheers"],
    order: ["order", "purchase", "buy", "item", "product", "ordered", "bought", "shopping", "cart", "checkout", "place order", "make purchase", "acquire", "procure", "shop"],
    delivery: ["delivery", "ship", "shipment", "dispatch", "arrival", "shipping", "deliver", "when will it arrive", "arrive", "receive", "parcel", "package", "mail", "post", "courier", "transit", "logistics"],
    payment: ["payment", "paid", "transaction", "billing", "invoice", "pay", "credit card", "debit card", "paypal", "stripe", "charge", "cost", "fee", "price", "amount", "bill", "checkout", "funds", "remittance"],
    refund: ["refund", "return", "money back", "reimbursement", "refunded", "repayment", "compensation", "refund policy", "get money back", "request refund", "rebate", "repay"],
    cancel: ["cancel", "stop order", "abort", "void", "terminate", "revoke", "call off", "cancel order", "cancel subscription", "cancel service", "stop purchase", "annul", "rescind"],
    thanks: ["thanks", "thank you", "thx", "ty", "much appreciated", "grateful", "thank u", "appreciate it", "thanks a lot", "thank you so much", "cheers", "gracias", "merci", "obliged"],
    complaint: ["complaint", "problem", "issue", "error", "bug", "fault", "not working", "broken", "defective", "damaged", "poor quality", "unsatisfied", "disappointed", "unhappy", "angry", "frustrated", "upset", "dissatisfied"],
    support: ["support", "help", "assist", "guide", "aid", "need help", "can you help", "assistance", "support team", "customer service", "service desk", "help desk", "advice", "guidance"],
    track: ["track", "status", "where is my order", "tracking", "order status", "location", "where is", "track order", "track package", "track shipment", "delivery status", "monitor", "trace"],
    price: ["price", "cost", "charge", "amount", "rate", "fee", "how much", "pricing", "costs", "expensive", "cheap", "affordable", "price tag", "value", "discount", "offer", "deal", "quotation"],
    stock: ["available", "stock", "in stock", "inventory", "quantity", "out of stock", "available", "supply", "have it", "do you have", "is it available", "when available", "back in stock", "restock", "supply", "allocation"],
    discount: ["discount", "offer", "deal", "promotion", "sale", "coupon", "voucher", "code", "promo", "special offer", "reduction", "markdown", "bargain", "save money", "cheaper", "cut-price", "markdown"],
    hours: ["open", "hours", "timing", "schedule", "working hours", "business hours", "when are you open", "what time", "close", "operating hours", "availability", "office hours", "timeframe", "duration"],
    contact: ["contact", "phone", "email", "reach", "connect", "call", "number", "address", "location", "get in touch", "contact us", "customer support", "hotline", "helpline", "communicate"],
    feedback: ["feedback", "review", "rating", "suggestion", "opinion", "comment", "evaluate", "survey", "rate", "suggest", "advice", "recommend", "compliment", "criticism", "input", "response"],
    gift: ["gift", "voucher", "coupon", "present", "gift card", "gift certificate", "gift voucher", "giveaway", "present", "donation", "gifting", "gift idea", "endowment", "bestow"],
    exchange: ["exchange", "replace", "swap", "change item", "trade", "switch", "substitute", "return", "different size", "different color", "wrong item", "exchange policy", "barter", "convert"],
    warranty: ["warranty", "guarantee", "coverage", "assurance", "protection", "insurance", "warranty period", "guaranteed", "lifetime warranty", "extended warranty", "warranty claim", "certification", "pledge"],
    account: ["login", "account", "signup", "profile", "register", "sign in", "log in", "create account", "user account", "member", "registration", "dashboard", "my account", "credentials"],
    password: ["password", "forgot", "reset", "credentials", "security", "login issue", "can't log in", "change password", "recover account", "lost password", "password reset", "authentication", "access code"],
    subscription: ["subscription", "plan", "membership", "package", "recurring", "monthly", "yearly", "premium", "pro", "basic", "upgrade", "downgrade", "cancel subscription", "subscription fee", "renewal"],
    website: ["website", "site", "webpage", "page", "online", "portal", "platform", "browser", "navigation", "menu", "link", "url", "web address", "domain", "web platform"],
    quality: ["quality", "excellent", "great", "good", "bad", "poor", "awesome", "terrible", "fantastic", "wonderful", "amazing", "horrible", "satisfied", "dissatisfied", "superb", "inferior", "mediocre"],
    technical: ["technical", "tech", "bug", "glitch", "error", "not working", "crash", "freeze", "load", "loading", "performance", "slow", "speed", "optimization", "malfunction", "defect"],
    privacy: ["privacy", "data", "security", "information", "personal", "confidential", "gdpr", "compliance", "protection", "safe", "secure", "hack", "breach", "encryption", "confidentiality"],
    return: ["return", "send back", "send it back", "take back", "refund", "exchange", "return policy", "how to return", "return process", "return item", "send back", "repatriate"],
    recommendation: ["recommend", "suggest", "advise", "what should i buy", "which one", "help choose", "option", "alternative", "better", "best", "top", "popular", "endorse", "propose"],
    features: ["feature", "specification", "spec", "detail", "function", "functionality", "how it works", "what does it do", "capability", "capacity", "size", "dimension", "attribute", "characteristic"],
    company: ["company", "business", "corporation", "firm", "organization", "enterprise", "about us", "who are you", "history", "background", "founder", "team", "establishment", "corporation"],
    partnership: ["partnership", "collaborate", "collaboration", "work together", "affiliate", "program", "reseller", "distributor", "wholesale", "bulk", "b2b", "business to business", "alliance", "coalition"],
    career: ["career", "job", "employment", "hire", "hiring", "recruitment", "position", "vacancy", "opportunity", "apply", "application", "work", "employee", "occupation", "profession"],
    shipping: ["shipping", "delivery", "carrier", "fedex", "ups", "dhl", "usps", "postage", "mail", "freight", "logistics", "transport", "ship", "dispatch", "consignment"],
    international: ["international", "global", "worldwide", "overseas", "abroad", "country", "export", "import", "customs", "duty", "tax", "vat", "cross-border", "multinational"],
    deadline: ["deadline", "urgent", "asap", "soon", "quick", "fast", "rush", "priority", "immediate", "time", "when", "how long", "duration", "timeframe", "time limit", "cutoff"],
    confirmation: ["confirmation", "confirm", "verified", "verification", "acknowledge", "acknowledgment", "receipt", "proof", "evidence", "validate", "validation", "authentication", "corroboration"],
    documentation: ["document", "documentation", "manual", "guide", "instruction", "tutorial", "help article", "wiki", "knowledge base", "faq", "frequently asked questions", "handbook", "guidebook"],
    update: ["update", "change", "modify", "edit", "alter", "revision", "version", "new", "latest", "current", "upgrade", "downgrade", "patch", "amend", "refresh"],
    notification: ["notification", "alert", "message", "email", "sms", "text", "reminder", "announcement", "news", "newsletter", "subscribe", "unsubscribe", "announce", "bulletin"],
  };

  // Expanded templates with more responses
  const templates = {
    greetings: [
      "Hello! I'm your virtual assistant. How can I help you today?",
      "Hi there! It's great to connect with you. What can I assist you with?",
      "Hey! Thanks for reaching out. I'm here to help with any questions you might have.",
      "Greetings! I'm ready to assist you. What would you like to know?",
      "Good day! I'm your AI assistant. How may I be of service today?",
      "Hello! Thanks for getting in touch. How can I make your day better?",
      "Hi! Welcome to our support chat. What would you like help with today?",
      "Hey there! I'm here to provide support. What's on your mind?",
      "Hello! It's a pleasure to assist you today. What can I do for you?",
      "Hi! I'm your friendly virtual assistant. How can I help you?",
    ],
    bye: [
      "Take care! Feel free to reach out if you need anything else.",
      "Goodbye! It was a pleasure helping you today.",
      "See you later! Don't hesitate to come back if you have more questions.",
      "Farewell! Remember I'm here whenever you need assistance.",
      "Have a wonderful day! Come back anytime you need help.",
      "Cheers! I'll be here if you need anything else.",
      "Until next time! Wishing you a great day ahead.",
      "Goodbye for now! It was lovely chatting with you.",
    ],
    order: [
      "I can help with your order! Could you please provide your order ID so I can check its status?",
      "Let me look up your purchase details. Please share your order number with me.",
      "I'd be happy to assist with your order. Can you provide the order reference number?",
      "To help you with your order, I'll need your order ID to pull up the details.",
      "I can check your order status right away. What's your order number?",
      "Let me access your order information. Could you please share your order ID?",
      "For order-related queries, please provide your order number so I can assist you better.",
      "I'm here to help with your order. Could you share your order details?",
      "To give you accurate information about your order, I'll need your order reference.",
      "I can track your order for you. Please provide your order ID.",
    ],
    delivery: [
      "Based on our records, your order should reach you within the estimated delivery timeframe.",
      "The estimated delivery is typically 3-5 business days after dispatch.",
      "We're working to get your product to you as quickly as possible. It should be dispatched soon.",
      "You'll receive a shipping confirmation with tracking information via email once your order ships.",
      "Delivery usually takes 2-3 business days after we've processed and dispatched your order.",
      "Your package is currently in transit and should arrive according to the estimated delivery date.",
      "We've shipped your order, and you can track its progress with the provided tracking number.",
      "Delivery times may vary by location, but most orders arrive within 5-7 business days.",
      "I can check the exact delivery status for you if you provide your order number.",
      "Your order is making its way to you! Most deliveries are completed within the promised timeframe.",
    ],
    payment: [
      "I can confirm that your payment was successfully processed. Thank you for your purchase!",
      "Your transaction has been completed successfully, and we've received your payment.",
      "Payment verification is complete. Your order is now being processed for fulfillment.",
      "I show that your payment has been confirmed on our end. Your order is being prepared.",
      "We've received your payment successfully. Your order confirmation has been sent to your email.",
      "Your transaction was processed without any issues. Thank you for your business!",
      "Payment has been authorized and processed. Your order is now in the fulfillment queue.",
      "I can see that your payment went through successfully. Your order is being processed.",
      "The payment transaction was completed successfully. We appreciate your order!",
      "Your payment has been verified, and we've begun processing your order immediately.",
    ],
    refund: [
      "I can help you initiate a return or refund process. Please provide your order ID to get started.",
      "Refund requests are typically processed within 5-7 business days after we receive the returned items.",
      "To begin the refund process, I'll need your order details and the reason for the return.",
      "Refunds are automatically credited to your original payment method once processed.",
      "I can assist with your refund request. Please share your order number and reason for return.",
      "Our refund policy allows returns within 30 days of purchase for most items.",
      "Refunds usually take 5-10 business days to appear in your account after processing.",
      "Let me help you with your refund. Please provide your order information.",
      "I can initiate the refund process for you. Could you share your order number?",
      "We'll process your refund as quickly as possible once we receive the returned item.",
    ],
    cancel: [
      "I can help you cancel your order. Please provide your order ID to proceed.",
      "We can process order cancellations if the request is made before the item ships.",
      "To cancel your order, I'll need your order reference number to locate it in our system.",
      "I can assist with stopping your order. Please share the order number with me.",
      "Order cancellation is available within 24 hours of purchase for most items.",
      "Let me check if your order can still be canceled. What's your order ID?",
      "We can process cancellation requests for orders that haven't yet been dispatched.",
      "I'll help you cancel your order. Please provide your order details.",
      "To proceed with cancellation, I need to verify your order information first.",
      "I can submit a cancellation request for your order. May I have your order number?",
    ],
    thanks: [
      "You're very welcome! I'm glad I could assist you today.",
      "No problem at all! It was my pleasure to help.",
      "Anytime! Don't hesitate to reach out if you need further assistance.",
      "My pleasure! I'm always here to help with anything you need.",
      "You're most welcome! Happy to be of service.",
      "Glad I could help! Let me know if there's anything else I can do for you.",
      "Happy to assist! Don't hesitate to contact us again if you have more questions.",
      "Thank you for your kind words! It's always a pleasure to help.",
      "You're welcome! Wishing you a wonderful day ahead.",
      "I appreciate your thanks! Remember I'm here whenever you need support.",
    ],
    complaint: [
      "I'm sorry to hear you're experiencing issues. Please describe the problem in detail so I can help resolve it.",
      "We apologize for the inconvenience. Could you provide more details about what happened?",
      "I understand your frustration. Let me help address this concern. Please describe the issue.",
      "Your complaint has been noted, and we'll work to resolve it quickly. Please share more details.",
      "I'm sorry for the trouble you've experienced. Let's work together to find a solution.",
      "We take all complaints seriously. Please provide details so we can investigate properly.",
      "I apologize for the unsatisfactory experience. Let me see how I can help resolve this.",
      "Thank you for bringing this to our attention. Could you please elaborate on the issue?",
      "I'm sorry to hear about this problem. Let me assist you in finding a resolution.",
      "We want to make this right. Please share more information about what went wrong.",
    ],
    support: [
      "I'm here to help! Please describe what you need assistance with.",
      "Sure thing! I'm ready to assist you with any questions or concerns.",
      "Our support team is available to help you 24/7. What do you need help with today?",
      "I'll do my best to assist you. Please tell me more about what you need.",
      "Happy to help! How can I assist you today?",
      "I'm here to provide support. What would you like help with?",
      "Let me guide you through the solution. What exactly do you need assistance with?",
      "I'm dedicated to helping you. Please describe your question or issue.",
      "I'll help you find the answers you need. What's your question?",
      "Our customer support team is here for you. How can we assist today?",
    ],
    track: [
      "I can help you track your order. Please share your order ID for the most accurate information.",
      "You can track your order using the tracking link sent to your email, or I can check for you.",
      "Let me fetch your order status. Can you provide the order number?",
      "Order tracking details are available in your account dashboard, or I can look them up for you.",
      "I can check your order status right away. What's your order number?",
      "Tracking information is sent via email once your order ships. I can also provide updates.",
      "You'll receive tracking updates via email, but I can check the current status if you provide your order ID.",
      "To track your order, please provide your order reference number.",
      "I can access your order tracking information. May I have your order number?",
      "Let me pull up the tracking details for your order. What's your order reference?",
    ],
    price: [
      "Pricing information is available on our product pages. Is there a specific product you're inquiring about?",
      "The cost varies depending on the item and any current promotions. Which product are you interested in?",
      "Prices are subject to change based on market conditions and availability. Could you specify which product?",
      "Our pricing is competitive and varies by product specifications. What item are you looking for?",
      "For accurate pricing information, please visit the product page on our website. I can guide you if needed.",
      "We offer various price points to suit different budgets. Which product are you considering?",
      "Current prices are displayed on each product listing. Is there a particular item you'd like to know about?",
      "Prices may vary based on options and customization. What specific product are you interested in?",
      "I can provide pricing details if you tell me which product you're inquiring about.",
      "Our website has the most up-to-date pricing information. Would you like me to help you navigate to a specific product?",
    ],
    stock: [
      "I can check stock availability for you. Which product are you interested in?",
      "Inventory levels change frequently. Let me check the current stock status for you.",
      "I can verify if an item is in stock. Please specify which product you're asking about.",
      "We try to maintain adequate stock levels, but availability varies. What product are you looking for?",
      "I can check our inventory for you. Which specific item would you like to know about?",
      "Stock availability is updated in real-time on our website. I can also check for you if you provide the product name.",
      "Let me check if the product you're interested in is currently available. What's the item?",
      "I can look up stock information. Please tell me which product you're inquiring about.",
      "Our inventory is constantly changing. I can check current availability if you specify the product.",
      "To check stock levels, I'll need to know which product you're referring to.",
    ],
    discount: [
      "We have ongoing promotions on selected products. Are you looking for a discount on a specific item?",
      "Limited-time offers are available now! Check our deals section or let me know what you're interested in.",
      "You can apply coupon codes at checkout for savings. Are you looking for a discount on a particular product?",
      "We offer seasonal discounts throughout the year. What product are you hoping to find on sale?",
      "Special member discounts are available for loyalty program members. Is there a specific product you're considering?",
      "Sign up for our newsletter to receive exclusive discount codes and promotion alerts.",
      "Check our website's promotion page for current discount offers. I can guide you if needed.",
      "We frequently run promotions on various products. What category are you interested in?",
      "I can check if there are any current discounts available for specific products. What are you looking for?",
      "Our sale section features products with special pricing. Is there something specific you'd like to check?",
    ],
    hours: [
      "Our customer support is available 24/7 through this chat system.",
      "You can contact us anytime via chat or email, and we'll respond as quickly as possible.",
      "Our primary support hours are 9 AM - 6 PM Monday to Friday, but we monitor messages around the clock.",
      "Support is available 24/7 for urgent issues, with slightly longer response times outside business hours.",
      "Our support team is here to help you anytime through our chat system.",
      "We provide 24/7 support for critical issues, with general inquiries responded to during business hours.",
      "You can reach us anytime through our chat support, with responses guaranteed within 24 hours.",
      "Our team monitors messages continuously, so you can contact us anytime that's convenient for you.",
      "We're always available through this chat system, with responses typically within minutes during business hours.",
      "Our virtual assistance is available 24/7, with human support during extended business hours.",
    ],
    contact: [
      "You can reach our support team at support@example.com or call us at 1-800-123-4567 during business hours.",
      "For assistance, you can contact us via email at support@example.com or through our website contact form.",
      "We're available by phone at 1-800-123-4567 from 8 AM to 8 PM EST, or email us anytime at support@example.com.",
      "You can reach our customer service department at 1-800-123-4567 or email support@example.com for assistance.",
      "Contact us through our website's contact form for a prompt response, or email support@example.com directly.",
      "For immediate assistance, please call our hotline at 1-800-123-4567 during business hours.",
      "You can email us at support@example.com for non-urgent inquiries or call 1-800-123-4567 for urgent matters.",
      "We're always reachable via phone or email. Call us at 1-800-123-4567 or email support@example.com.",
      "Reach our support team at support@example.com or call 1-800-123-4567 Monday through Friday, 9 AM to 6 PM EST.",
      "You can contact us through multiple channels: phone at 1-800-123-4567, email at support@example.com, or our contact form.",
    ],
    feedback: [
      "We would love to hear your feedback! Your input helps us improve our products and services.",
      "Thank you for wanting to provide feedback! We value your opinion and use it to enhance our offerings.",
      "Your review helps us improve our services. Please share your thoughts with us.",
      "We appreciate all feedback—both positive and constructive. What would you like to share?",
      "Feedback is always welcome and helps us serve you better. What's on your mind?",
      "We value your opinion. Please share your suggestions to help us enhance our platform.",
      "Your feedback is important to us. What would you like to tell us about your experience?",
      "We're constantly improving based on customer feedback. What would you like to share?",
      "Thank you for taking the time to provide feedback. How can we improve your experience?",
      "We welcome your comments and suggestions. What feedback would you like to provide?",
    ],
    gift: [
      "Gift cards and vouchers are available on our website. Are you looking for a specific type of gift?",
      "You can purchase gift cards online in various denominations. What occasion are you shopping for?",
      "We offer customizable gift options for special occasions. Tell me what you have in mind!",
      "Gift vouchers are available for purchase on our website. Would you like information about our gift options?",
      "Our gift service includes personalized messages and wrapping options. What type of gift are you considering?",
      "You can schedule gift deliveries for specific dates. What occasion are you celebrating?",
      "We have special gift collections for various occasions. What type of gift are you looking for?",
      "Gift cards are available in physical and digital formats. Which would you prefer?",
      "We offer gift recommendations based on occasion and recipient. What details can you share?",
      "Our gift selection includes options for all budgets and occasions. What did you have in mind?",
    ],
    exchange: [
      "We can help you exchange or replace your item. Please provide your order ID to initiate the process.",
      "Item exchange is available for eligible products within 30 days of purchase. What would you like to exchange?",
      "To start an exchange, please provide your order details and the reason for the exchange.",
      "We offer free exchanges within 30 days of purchase for most items. What would you like to exchange?",
      "Exchanges are subject to product availability. Please provide your order information so I can assist.",
      "We can help you exchange for a different size, color, or model. What are you looking to exchange?",
      "To process an exchange, we'll need your order number and the details of what you'd like instead.",
      "I can help you with the exchange process. Please provide your order information.",
      "Exchanges are typically processed within 3-5 business days after we receive the returned item.",
      "Let me help you with your exchange request. Could you share your order number?",
    ],
    warranty: [
      "Most products come with a standard 1-year warranty against manufacturing defects.",
      "Warranty details vary by product. Could you specify which product you're inquiring about?",
      "Our warranty typically covers manufacturing defects for 12 months from the purchase date.",
      "You can extend your warranty at checkout for additional coverage. Which product are you considering?",
      "Warranty information is provided on each product page. I can look up details if you specify the product.",
      "The standard warranty period is 12 months, but some products have longer coverage.",
      "Warranty claims can be submitted through our online portal. What product are you asking about?",
      "Our warranty includes parts and labor for covered issues during the warranty period.",
      "Extended warranty options are available for purchase on most products.",
      "I can check the specific warranty terms for your product if you provide the model number.",
    ],
    account: [
      "You can manage your account settings, orders, and preferences from your account dashboard.",
      "Login or sign up to access your account details and order history.",
      "Account settings can be updated anytime through your profile page.",
      "Creating an account allows you to track orders, save preferences, and access exclusive features.",
      "Your account dashboard provides a personalized experience with all your information in one place.",
      "With an account, you can save payment methods, addresses, and preferences for faster checkout.",
      "Account registration takes only a few minutes and provides access to order history and tracking.",
      "You can manage subscriptions, payment methods, and communication preferences in your account.",
      "I can help with account-related issues. What specifically do you need assistance with?",
      "Your account gives you access to exclusive content, promotions, and faster checkout options.",
    ],
    password: [
      "You can reset your password using the 'Forgot Password' link on the login page.",
      "Password recovery instructions are sent to your registered email address when you request a reset.",
      "For security, we recommend changing your password regularly and using a unique, strong password.",
      "If you're having trouble resetting your password, I can help guide you through the process.",
      "Password reset links expire after 24 hours for security reasons. Do you need a new reset link?",
      "We never ask for your password via email or chat for security reasons.",
      "I can help you with password recovery. Please verify your account email address first.",
      "For security purposes, password resets require email verification.",
      "If you've lost access to your email account, we have additional verification steps to help you recover your account.",
      "You can update your password anytime in your account settings under 'Security'.",
    ],
    subscription: [
      "You can view and manage your subscription plans, billing, and preferences in your account.",
      "Subscription details, including next billing date and plan features, are available in your dashboard.",
      "You can upgrade, downgrade, or cancel your subscription anytime from your account settings.",
      "Subscription billing occurs on the same date each month/year, depending on your plan.",
      "We offer flexible subscription options to meet different needs. Which plan are you interested in?",
      "Subscription details and billing history are available in your account under 'Subscriptions'.",
      "You can pause or cancel your subscription at any time through your account dashboard.",
      "I can help with subscription management. What would you like to do with your subscription?",
      "Our subscription plans include various features at different price points. What are you looking for?",
      "You can try our subscription service with a free trial before committing to a paid plan.",
    ],
    website: [
      "Our website is optimized for all major browsers and devices for the best experience.",
      "You can navigate our website using the menu at the top or the search function to find products quickly.",
      "For the best experience, we recommend using the latest version of your browser.",
      "The website features responsive design that works well on mobile, tablet, and desktop devices.",
      "Site navigation is designed to help you find what you need quickly. Are you looking for something specific?",
      "We regularly update our website with new features and improvements based on user feedback.",
      "If you encounter any website issues, please try clearing your browser cache or using a different browser.",
      "Our search function can help you find products quickly. What are you looking for?",
      "The website includes helpful filters and categories to narrow down your search results.",
      "I can help you navigate our website. What are you trying to find or do?",
    ],
    quality: [
      "We pride ourselves on offering high-quality products that undergo rigorous testing.",
      "All our products undergo quality assurance checks to ensure they meet our standards.",
      "Customer satisfaction is our top priority, and we stand behind the quality of our products.",
      "We source materials from reputable suppliers and implement strict quality control measures.",
      "Our quality assurance process includes multiple checkpoints throughout production.",
      "We welcome feedback on product quality to maintain and improve our standards.",
      "Product quality is consistently monitored, and we continuously work to enhance our offerings.",
      "We offer satisfaction guarantees on most products because we believe in their quality.",
      "Our products are designed for durability, performance, and customer satisfaction.",
      "We regularly review and improve our products based on customer feedback and quality metrics.",
    ],
    technical: [
      "Our technical team can help resolve any issues you're experiencing. Please describe the problem in detail.",
      "I'm sorry you're experiencing technical difficulties. Could you provide more information about the issue?",
      "We're aware of some technical issues and are working on fixes. What specific problem are you encountering?",
      "For technical problems, please provide details about your device, browser, and what you were doing when the issue occurred.",
      "Try refreshing the page or clearing your browser cache as a first step for many technical issues.",
      "Technical support is available 24/7 for urgent issues. How can we help you resolve this problem?",
      "Our engineering team has been notified of similar issues and is working on solutions.",
      "I'll escalate this technical issue to our support engineers for resolution. Please describe what happened.",
      "We're continuously working to improve our technical infrastructure and resolve any issues.",
      "For faster resolution of technical issues, please include any error messages you're seeing.",
    ],
    privacy: [
      "We take your privacy seriously and protect all personal data according to our privacy policy.",
      "Our privacy policy outlines how we handle your information and protect your data.",
      "We never share your personal data with third parties without your consent, except as required by law.",
      "All data is encrypted and stored securely following industry best practices.",
      "You can manage your privacy settings and data preferences in your account dashboard.",
      "We comply with all applicable data protection regulations, including GDPR for EU customers.",
      "Our security measures include regular audits, encryption, and access controls to protect your data.",
      "You can request a copy of your personal data or ask for deletion through your account settings.",
      "We use your data only to provide and improve our services, as detailed in our privacy policy.",
      "Your privacy is important to us. We implement strong measures to keep your information secure.",
    ],
    return: [
      "Returns are accepted within 30 days of purchase for most items in original condition.",
      "Please keep the original packaging and tags for returns to ensure smooth processing.",
      "Return shipping is free for defective items or if the return is due to our error.",
      "The return process typically takes 7-10 business days after we receive the item at our warehouse.",
      "You can initiate a return through your account dashboard or by contacting our support team.",
      "Returned items must be in original condition with all tags and packaging intact for a full refund.",
      "Refunds are issued to the original payment method once we receive and process the return.",
      "We offer a hassle-free return policy for customer satisfaction. What would you like to return?",
      "To process a return, we'll need your order number and reason for return.",
      "Some items may have different return policies due to their nature (e.g., personalized products).",
    ],
    recommendation: [
      "Based on popular choices and customer reviews, I'd recommend our [Product Name] for your needs.",
      "Our best-selling items in that category are [Product 1] and [Product 2]. Would you like details about either?",
      "For your requirements, I suggest considering our [Product Series] which offers [benefits].",
      "Many customers with similar needs choose our [Product Line]. Would you like information about it?",
      "I can recommend products based on your budget and requirements. What are you looking for specifically?",
      "Our product comparison tool can help you choose between options. What products are you considering?",
      "Based on your described use case, our [Product Model] might be the best fit for you.",
      "For [specific need], I'd recommend our [Product Name] which includes [features].",
      "We have several options that might work for you. Could you share more about your preferences?",
      "Our [Category Name] collection has highly-rated products. Would you like me to highlight some top choices?",
    ],
    features: [
      "Our products feature the latest technology for enhanced performance and reliability.",
      "You can find detailed specifications and features on each product page on our website.",
      "The key features include [feature 1], [feature 2], and [feature 3] for optimal performance.",
      "All features are designed with customer needs in mind to provide the best experience.",
      "Our product documentation provides complete feature details and usage instructions.",
      "We offer a range of features to suit different user requirements and preferences.",
      "Feature comparisons are available on our website to help you choose the right product.",
      "Many features can be customized based on your specific needs and preferences.",
      "The [Product Name] includes advanced features like [feature 1] and [feature 2].",
      "Our products are designed with user-friendly features to make them accessible to everyone.",
    ],
    company: [
      "We've been in business for over 10 years, serving customers worldwide with quality products.",
      "Our company mission is to provide exceptional products and excellent customer service.",
      "We're a customer-focused company committed to innovation and satisfaction.",
      "Our company values include integrity, quality, innovation, and customer satisfaction.",
      "We operate in multiple countries with a diverse team of dedicated professionals.",
      "Our company history spans decades of innovation and growth in our industry.",
      "We're committed to sustainable practices and ethical business operations across our organization.",
      "Our leadership team brings decades of industry experience and expertise.",
      "We pride ourselves on our company culture that values both customers and employees.",
      "As a company, we're constantly evolving to meet changing customer needs and market trends.",
    ],
    partnership: [
      "We offer partnership programs for businesses, affiliates, and resellers. What type of partnership interests you?",
      "Our partnership opportunities include reseller programs, affiliate marketing, and business collaborations.",
      "For partnership inquiries, please contact our business development team at partnerships@example.com.",
      "We collaborate with industry leaders to provide integrated solutions for our customers.",
      "Partnership benefits include exclusive pricing, dedicated support, and marketing resources.",
      "Our affiliate program offers competitive commissions for referred customers. Would you like information?",
      "We welcome partnership proposals from compatible businesses. What did you have in mind?",
      "Bulk purchase discounts and special terms are available for business partners.",
      "We have different partnership tiers to accommodate various business sizes and types.",
      "Our partnership program includes training, resources, and support to help our partners succeed.",
    ],
    career: [
      "We're always looking for talented individuals to join our team. Check our careers page for current openings.",
      "Current job openings are listed on our careers page with detailed descriptions and application instructions.",
      "We offer competitive compensation, benefits packages, and opportunities for professional growth.",
      "Our company culture emphasizes collaboration, innovation, and work-life balance.",
      "We provide opportunities for professional development and career advancement within the company.",
      "Internship programs are available for students and recent graduates in various departments.",
      "Employee benefits include health insurance, flexible work options, and wellness programs.",
      "We value diversity and inclusion in our workplace and encourage applicants from all backgrounds.",
      "Our careers page has information about our company culture and what it's like to work with us.",
      "We're growing quickly and often have new positions opening up. Check our careers page regularly for updates.",
    ],
    shipping: [
      "We work with reliable shipping partners to ensure timely and secure delivery of your orders.",
      "Shipping options include standard, expedited, and express delivery with various carriers.",
      "Shipping costs vary based on package weight, dimensions, and destination.",
      "We offer free shipping on orders over $50 to most locations.",
      "All packages are insured during transit for your protection and peace of mind.",
      "Shipping notifications with tracking information are sent via email once your order ships.",
      "International shipping is available to most countries with calculated costs at checkout.",
      "Same-day shipping is available for orders placed before 2 PM in your local time zone.",
      "We use protective packaging to ensure your items arrive in perfect condition.",
      "Shipping times may vary during holidays or peak seasons, but we strive to meet estimated delivery dates.",
    ],
    international: [
      "We ship to over 50 countries worldwide with various shipping options available.",
      "International orders may be subject to customs duties, taxes, or import fees depending on the destination.",
      "Delivery times for international orders vary by destination but typically range from 7-21 business days.",
      "We handle all necessary documentation for international shipments to ensure smooth customs clearance.",
      "International shipping costs are calculated at checkout based on weight and destination.",
      "Some product restrictions may apply to international orders due to regulations or licensing agreements.",
      "We comply with international trade regulations for all shipments and provide required documentation.",
      "Tracking is available for most international shipments through our carrier partners.",
      "International returns may have different processes and requirements than domestic returns.",
      "We recommend checking your country's import regulations before placing an international order.",
    ],
    deadline: [
      "Urgent orders can be expedited for faster processing and delivery. Is there a specific deadline you need to meet?",
      "We understand your urgency and will prioritize your request whenever possible.",
      "Rush processing is available for an additional fee on most items. What's your timeframe?",
      "Please contact our support team directly for urgent deadline requests, and we'll do our best to accommodate.",
      "We'll do our best to meet your timeline requirements. What is your desired delivery date?",
      "Express shipping options can help meet tight deadlines. What is your deadline?",
      "Production times vary by product, but we can check availability for urgent needs if you provide details.",
      "For time-sensitive requests, please call our priority support line for immediate assistance.",
      "We offer various shipping options with different delivery timeframes to meet your needs.",
      "Let me check if we can meet your deadline. What is the specific date you need the order by?",
    ],
    confirmation: [
      "Your order has been confirmed and is being processed. You'll receive a confirmation email shortly.",
      "We've sent a confirmation email with all your order details and next steps.",
      "You'll receive order confirmation via email within minutes of completing your purchase.",
      "Payment confirmation typically takes just a few moments to process and verify.",
      "All transactions receive immediate confirmation numbers for your records.",
      "You can view order confirmations and details in your account dashboard at any time.",
      "Confirmation messages are sent via email and SMS (if you provided a mobile number).",
      "Please keep your confirmation number for future reference and any inquiries about your order.",
      "Your order is now confirmed and in our system. Thank you for your purchase!",
      "We've successfully received your order and payment. Your order confirmation is being generated.",
    ],
    documentation: [
      "Product documentation, including user manuals and guides, is available for download on our website.",
      "User manuals, installation guides, and technical specifications can be found in the support section for each product.",
      "We provide comprehensive documentation with all products, both in print and digital formats.",
      "Video tutorials and how-to guides are available on our website for visual learning.",
      "Our knowledge base contains articles, FAQs, and troubleshooting tips for common questions and issues.",
      "Technical specifications and detailed feature explanations are provided in the product documentation.",
      "Installation guides help with setup and configuration to get you started quickly.",
      "Troubleshooting tips and common solutions are included in the product documentation and online resources.",
      "You can access all product documentation through your account after purchase or on our website.",
      "We regularly update our documentation based on customer feedback and product enhancements.",
    ],
    update: [
      "We regularly update our products based on customer feedback and technological advancements.",
      "Software updates are available for download from our website to keep your products current.",
      "You can check for updates in your account settings or through the product itself if it has update capabilities.",
      "We notify customers when new updates are available through email announcements and in-app notifications.",
      "Update instructions are provided with each release to guide you through the process.",
      "Most updates can be installed automatically or manually, depending on your preferences.",
      "We recommend keeping your software updated for security enhancements and new features.",
      "Update history and release notes are available in our documentation so you can see what's changed.",
      "Firmware updates for hardware products are released periodically to improve performance and add features.",
      "We provide update support through our help articles and customer service if you encounter any issues.",
    ],
    notification: [
      "You can manage your notification preferences in your account settings to control what updates you receive.",
      "We send notifications for order updates, promotions, and important announcements based on your preferences.",
      "Email notifications can be customized or turned off entirely in your communication preferences.",
      "Push notifications are available for mobile app users who want real-time updates.",
      "We respect your communication preferences and privacy when sending notifications.",
      "Notification settings allow you to choose what types of updates you receive and how often.",
      "Important account and security notifications are always sent regardless of preferences for your protection.",
      "You can opt in or out of marketing notifications at any time through your account settings.",
      "We use a preference center that lets you fine-tune exactly what notifications you receive.",
      "Notification frequency can be adjusted to receive updates immediately, daily digests, or weekly summaries.",
    ],
  };

  // Contextual responses for combinations
  const contextualResponses = {
    "order delivery": [
      "Your order is scheduled for delivery tomorrow between 9 AM and 5 PM. You'll receive a notification when it's out for delivery.",
      "The delivery status shows your package is currently out for delivery and should arrive today.",
      "Your order has been shipped and is en route to your address. The estimated delivery is within 2 business days.",
      "I see that your order was dispatched yesterday and should reach you within the next 24-48 hours.",
      "The tracking information indicates your order is in transit and scheduled for delivery by end of day tomorrow.",
    ],
    "order payment": [
      "Payment for your order has been confirmed, and your order is now being processed for fulfillment.",
      "We've received your payment successfully, and your order is now in the fulfillment queue.",
      "Your payment was processed without issues, and we've begun preparing your order for shipment.",
      "I can confirm that your payment was authorized, and your order is being processed immediately.",
      "The transaction was completed successfully, and your order confirmation has been sent to your email.",
    ],
    "delivery late": [
      "I apologize for the delay in delivery. Let me check the current status and provide you with an update.",
      "Sometimes deliveries can be delayed due to weather, carrier issues, or high volume. Let me investigate your specific order.",
      "I understand your concern about the delayed delivery. Let me look into this and get you the most current information.",
      "I'm sorry your delivery is taking longer than expected. Let me check with the carrier for an updated delivery estimate.",
      "Delivery delays can occur for various reasons. Let me track your package and provide you with the latest status.",
    ],
    "return refund": [
      "Once we receive your returned item at our warehouse, we'll process your refund within 5 business days.",
      "Refunds are issued to your original payment method after we receive and inspect the returned product.",
      "The refund process begins once the return is completed and the item is received at our facility.",
      "After we process your return, the refund typically appears in your account within 5-10 business days.",
      "We'll send you a confirmation email once your return is received and your refund has been processed.",
    ],
    "cancel refund": [
      "Your cancellation has been processed, and a refund will be issued to your original payment method within 5-7 business days.",
      "Since you canceled before shipment, your refund will be processed immediately and should appear shortly.",
      "The refund for your canceled order will be credited back to your original payment method within the next billing cycle.",
      "I've processed your cancellation, and the refund will be initiated immediately. Please allow 3-5 days for it to appear.",
      "Your order has been successfully canceled, and the refund is being processed. You'll receive confirmation via email.",
    ],
    "technical support": [
      "Our technical support team can help resolve this issue. Let me connect you with a specialist who can assist.",
      "For technical assistance, our specialists are available 24/7. Let me gather some details to help them assist you better.",
      "I'll escalate this technical issue to our support engineers for resolution. Please describe the problem in detail.",
      "Our technical team has expertise in resolving these types of issues. Let me transfer you to someone who can help.",
      "I understand you're experiencing a technical problem. Let me connect you with our technical support team for specialized assistance.",
    ],
    "account password": [
      "You can reset your password using the 'Forgot Password' link on the login page. Instructions will be sent to your email.",
      "Password reset instructions have been sent to your registered email address. Please check your inbox.",
      "For security, we'll help you reset your password and secure your account. Let me guide you through the process.",
      "I can help you with password recovery. First, I need to verify your account information for security purposes.",
      "If you're having trouble resetting your password, I can generate a new reset link for you. What's your email address?",
    ],
    "product quality": [
      "We stand behind our product quality and want to address any concerns you have. Please describe the issue in detail.",
      "All our products undergo rigorous quality checks, but we'll investigate your specific issue to make it right.",
      "We appreciate feedback on product quality to maintain our standards. Could you please describe what happened?",
      "I'm sorry to hear you're not satisfied with the product quality. Let me help resolve this for you.",
      "We take product quality seriously. Please share details about your experience so we can address it properly.",
    ],
    "international delivery": [
      "International delivery typically takes 7-14 business days depending on the destination and customs processing.",
      "Your international order may be subject to customs duties and import taxes upon arrival in your country.",
      "We provide tracking information for all international shipments so you can monitor your package's journey.",
      "International orders require additional processing time for customs documentation. Please allow extra time for delivery.",
      "We ship internationally using reliable carriers with tracking. Delivery times vary by destination country.",
    ],
    "subscription cancel": [
      "You can cancel your subscription at any time from your account settings under the 'Subscriptions' section.",
      "Subscription cancellations take effect at the end of your current billing cycle. You'll have access until then.",
      "I can help you cancel your subscription. Would you like me to guide you through the process or do it for you?",
      "To cancel your subscription, please confirm that you want to proceed. You'll receive a prorated refund if applicable.",
      "I've processed your subscription cancellation. You'll receive a confirmation email, and your access will continue until the end of your billing period.",
    ],
    "exchange size": [
      "We can help you exchange for a different size. Please provide your order number and the size you need.",
      "Size exchanges are straightforward. We'll send you the new size once we receive the original item back.",
      "To exchange for a different size, please initiate a return for the current item and place a new order for the correct size.",
      "We offer free size exchanges within 30 days of purchase. What size would you like instead?",
      "I can help you with a size exchange. Please provide your order details and the desired size.",
    ],
    "warranty claim": [
      "I can help you with a warranty claim. Please provide your order number and describe the issue you're experiencing.",
      "Warranty claims require proof of purchase and a description of the defect. Let me guide you through the process.",
      "To process your warranty claim, we'll need your order information and details about the product issue.",
      "Our warranty covers manufacturing defects. Please describe the problem, and I'll help you start a claim.",
      "I've initiated your warranty claim. Our support team will contact you within 24-48 hours with next steps.",
    ],
    "payment issue": [
      "I'm sorry you're experiencing payment issues. Let me help troubleshoot the problem. What exactly is happening?",
      "Payment issues can sometimes occur due to browser problems or card issues. Let's try to identify the cause.",
      "If your payment isn't going through, it might be due to card verification or address mismatch. Let me help.",
      "I can help resolve your payment issue. Please describe what happens when you try to complete the transaction.",
      "Sometimes payment problems can be resolved by trying a different browser or payment method. Would you like to try that?",
    ],
  };

  const normalizeInput = (text) => {
    const typos = {
      "hlo": "hello", "helo": "hello", "heyy": "hey", "thx": "thanks", "pament": "payment",
      "delivry": "delivery", "purhcase": "purchase", "recieve": "receive", "servise": "service",
      "prob": "problem", "pls": "please", "plz": "please", "r": "are", "u": "you",
      "accnt": "account", "pw": "password", "subs": "subscription", "info": "information",
      "appreci8": "appreciate", "gr8": "great", "msg": "message", "ques": "question",
      "ans": "answer", "wk": "week", "min": "minute", "sec": "second", "hr": "hour",
      "y": "yes", "n": "no", "okay": "ok", "sry": "sorry", "tnx": "thanks",
      "thanx": "thanks", "fwd": "forward", "b4": "before", "2": "to", "4": "for",
      "lite": "light", "nite": "night", "omg": "oh my god", "lol": "laughing out loud",
      "brb": "be right back", "btw": "by the way", "imo": "in my opinion", "afaik": "as far as i know",
      "asap": "as soon as possible", "idk": "i don't know", "tbh": "to be honest", "yw": "you're welcome",
      "np": "no problem", "rofl": "rolling on floor laughing", "smh": "shaking my head",
    };
    
    let normalized = text.toLowerCase();
    
    // Replace common typos
    Object.keys(typos).forEach(typo => {
      normalized = normalized.replace(new RegExp(`\\b${typo}\\b`, 'g'), typos[typo]);
    });
    
    // Remove special characters but keep spaces
    normalized = normalized.replace(/[^\w\s]/gi, '');
    
    return normalized;
  };

  const getResponse = (text) => {
    const normalized = normalizeInput(text);
    let matchedCategories = [];
    
    // First check for contextual combinations
    for (let context in contextualResponses) {
      const keywords = context.split(" ");
      if (keywords.every(kw => normalized.includes(kw))) {
        const responses = contextualResponses[context];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // Then check for individual categories
    for (let category in keywords) {
      if (keywords[category].some((kw) => normalized.includes(kw))) {
        matchedCategories.push(category);
      }
    }
    
    // If multiple categories matched, prioritize based on context
    if (matchedCategories.length > 0) {
      // Prioritize certain categories when multiple matches occur
      const priorityCategories = ["complaint", "refund", "cancel", "technical", "password", "payment", "delivery"];
      for (let priority of priorityCategories) {
        if (matchedCategories.includes(priority)) {
          const responses = templates[priority];
          return responses[Math.floor(Math.random() * responses.length)];
        }
      }
      
      // Otherwise, return a response from the first matched category
      const responses = templates[matchedCategories[0]];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Default responses for unrecognized input
    const defaultResponses = [
      "I'm not sure I understand. Could you please rephrase your question?",
      "I want to make sure I help you correctly. Could you provide more details?",
      "I'm still learning! Could you try asking that in a different way?",
      "I didn't quite catch that. Could you elaborate a bit more?",
      "I want to ensure I give you the best assistance. Could you clarify your question?",
      "I'm not certain I understand what you're asking. Could you provide more context?",
      "I'd love to help with that. Could you rephrase your question so I can assist better?",
      "I'm not sure I have the right information for that question. Could you try asking differently?",
      "I want to make sure I address your needs properly. Could you provide more details?",
      "I'm having trouble understanding. Could you try asking your question in another way?",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const botResponse = getResponse(input);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setLoading(false);
    }, 1000); // Slightly longer delay for more natural feel
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 text-gray-800">
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-orange-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm animate-pulse">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex p-4 bg-white border-t border-gray-200">
        <input
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-3 focus:outline-none border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default CustomerChat;