
const express = require('express');
const axios = require('axios');
const app = express();

// Configuration - In a real project, these would be in a .env file
const PORT = process.env.PORT || 3000;
const TARGET_API = 'https://typicode.com'; // Mocking a backend service

app.use(express.json());

// 1. Logging Middleware - standard for gateway projects
app.use((req, res, next) => {
    console.log(`[Gateway Log] ${new Date().toISOString()} | ${req.method} -> ${req.url}`);
    next();
});

// 2. The Proxy Logic - Advanced logic to forward requests
app.all('/v1/*', async (req, res) => {
    const targetUrl = `${TARGET_API}${req.url.replace('/v1', '')}`;
    
    try {
        console.log(`Proxying request to: ${targetUrl}`);
        
        // Forwarding the request with axios
        const response = await axios({
            method: req.method,
            url: targetUrl,
            data: req.body,
            headers: { 
                'X-Proxy-Source': 'NodeGateway', // Custom tracking header
                'Authorization': req.headers['authorization'] || '' 
            },
            timeout: 5000 // Handling slow backends
        });

        // Forward the backend status and data back to the client
        res.status(response.status).json(response.data);
        
    } catch (error) {
        // Human touch: Detailed error handling for debugging
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data : 'Gateway Error';
        
        console.error(`❌ Proxy Error: ${error.message}`);
        res.status(status).json({
            error: true,
            message: 'Failed to reach backend service',
            details: message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => res.json({ status: 'Gateway Online', uptime: process.uptime() }));

app.listen(PORT, () => {
    console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});


