// Configuration for Christmas Karma Meter
const CONFIG = {
    // Backend URL Configuration
    BACKEND_URL: {
        development: 'http://localhost:3000',
        production: 'https://your-backend-url.herokuapp.com' // Replace with your actual backend URL
    },
    
    // Get current backend URL based on environment
    getBackendUrl() {
        return window.location.hostname === 'localhost' 
            ? this.BACKEND_URL.development 
            : this.BACKEND_URL.production;
    }
};

// Make CONFIG available globally
window.CONFIG = CONFIG;