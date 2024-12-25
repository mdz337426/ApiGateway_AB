const express = require('express');
const morgan = require('morgan');
const {createProxyMiddleware} = require('http-proxy-middleware');
const { default: rateLimit } = require('express-rate-limit');
const app = express();
const PORT = 3000;

app.use(morgan('combined'));
app.use('/bookingservice', createProxyMiddleware({target:'http://localhost:3002', changeOrigin:true}));
app.use("/authservice", createProxyMiddleware({target:'http://localhost:3003', changeOrigin:true}));
app.use("/searchservice", createProxyMiddleware({target:'http://localhost:3004', changeOrigin:true}));

const limiter = rateLimit({
    windowMs:2*60*1000,
    max:7,
})

app.get('/home', (req, res)=>{
    return res.json({message : "ok"}); 
});

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`);
});