// Add this to your backend/server.js

// Health check endpoint for uptime monitoring
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'alive', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Keep-alive endpoint (alternative)
app.get('/ping', (req, res) => {
    res.send('pong');
});