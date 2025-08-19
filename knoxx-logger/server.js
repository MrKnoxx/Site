const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

app.get('/log-visit', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  const webhookURL = "https://discord.com/api/webhooks/1407279476592869387/6NWVmuA7uknDEZhokkPpxWJKuNda1RdZGmLtZHMxS1krrB56stgkRRJf1CMQHdpxfumu";

  fetch(webhookURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `👀 New visitor\n🌐 IP: ${ip}\n📱 Device: ${userAgent}`
    })
  }).catch(err => console.log("Webhook Error:", err));

  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server running on port 3000'));