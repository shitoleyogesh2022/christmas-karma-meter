// Razorpay Configuration Template
// Copy this to payment-config.js and add your actual credentials

const RAZORPAY_CONFIG = {
    // Replace with your actual Razorpay keys
    KEY_ID: "YOUR_RAZORPAY_KEY_ID", // Get from Razorpay Dashboard
    KEY_SECRET: "YOUR_RAZORPAY_KEY_SECRET", // Keep this secret, use only on server
    
    // Payment Details
    AMOUNT: 4900, // ₹49 in paise (100 paise = 1 rupee)
    CURRENCY: "INR",
    
    // Business Details
    BUSINESS_NAME: "Christmas Karma Meter",
    DESCRIPTION: "Premium Christmas Insights",
    LOGO: "https://via.placeholder.com/100x100?text=🎄",
    
    // Theme
    THEME_COLOR: "#ff6b6b"
};

// RAZORPAY TEST CARDS (Indian Cards Only)
const TEST_CARDS = {
    SUCCESS: {
        number: "5267 3181 8797 5449",
        cvv: "123",
        expiry: "12/25",
        name: "Test User"
    },
    NETBANKING: "Use any test bank from dropdown",
    UPI: "success@razorpay",
    WALLET: "Use Paytm/PhonePe test mode"
};

/* 
SETUP INSTRUCTIONS:
1. Copy this file to payment-config.js
2. Replace YOUR_RAZORPAY_KEY_ID with actual key
3. Replace YOUR_RAZORPAY_KEY_SECRET with actual secret
4. Never commit payment-config.js to GitHub
*/