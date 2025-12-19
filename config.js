// Configuration for Christmas Karma Meter
const CONFIG = {
    // Backend URL Configuration
    BACKEND_URL: {
        development: 'http://localhost:3000',
        production: 'https://christmas-karma-backend.onrender.com'
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