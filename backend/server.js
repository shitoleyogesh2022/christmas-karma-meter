const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const Razorpay = require('razorpay');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Christmas Karma Backend is running!',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Keep-alive ping endpoint
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Create Order
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR' } = req.body;
        
        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        const options = {
            amount: amount, // amount in paise
            currency: currency,
            receipt: `receipt_${Date.now()}`,
            notes: {
                service: 'Christmas Karma Meter Premium'
            }
        };

        const order = await razorpay.orders.create(options);
        
        res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to create order' 
        });
    }
});

// Verify Payment
app.post('/api/verify-payment', async (req, res) => {
    try {
        const { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature 
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing payment details' 
            });
        }

        // Verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid payment signature' 
            });
        }

        // Payment verified successfully
        // Here you would typically:
        // 1. Save payment details to database
        // 2. Update user premium status
        // 3. Send confirmation email

        res.json({
            success: true,
            message: 'Payment verified successfully',
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Payment verification failed' 
        });
    }
});

// Webhook endpoint for Razorpay
app.post('/api/webhook', (req, res) => {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (webhookSecret) {
        const body = JSON.stringify(req.body);
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(body)
            .digest('hex');
            
        if (expectedSignature !== webhookSignature) {
            return res.status(400).json({ error: 'Invalid webhook signature' });
        }
    }
    
    // Handle webhook events
    const event = req.body.event;
    const payload = req.body.payload;
    
    console.log('Webhook received:', event);
    
    switch (event) {
        case 'payment.captured':
            // Handle successful payment
            console.log('Payment captured:', payload.payment.entity.id);
            break;
        case 'payment.failed':
            // Handle failed payment
            console.log('Payment failed:', payload.payment.entity.id);
            break;
    }
    
    res.json({ status: 'ok' });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ 
        success: false, 
        error: 'Internal server error' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Christmas Karma Backend running on port ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;