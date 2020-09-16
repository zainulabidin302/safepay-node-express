
const Safepay = require('safepay');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true })); 

const config = {
  environment: "sandbox",
  sandbox: {
    baseUrl: "https://sandbox.api.getsafepay.com",
    apiKey: "sec_314f7aa5-c837-45cd-93fc-d1e5c4a7b4ac",
    apiSecret: "9ada4b418cbc2f34fa31400c2c027f019162b125d6b5e26d3941d000d9c3c8b1"
  },
  production: {
    baseUrl: "https://api.getsafepay.com",
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
  }
}
app.get('/', (req, res) => {
  res.send('Hello!');
  res.end()
})
app.post('/', async (req, res) => {
  let sfpy = new Safepay(config);

  try {
    const { data } = await sfpy.payments.create({
      amount: req.body.amount,
      currency: "PKR",
    });
    const url  = await sfpy.checkout.create({
      tracker: data.data.token,
      orderId: req.body.amount,
      source: "custom",
      cancelUrl: req.body.cancel_url,
      redirectUrl: req.body.redirect_url,
    });
    
    return res.redirect(url);
  } catch(error) {
    console.log(error)
    res.status(500);
    res.end();
  }
  
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})