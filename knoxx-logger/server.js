const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

app.post("/log-visit", async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  const { page, userAgent, referrer } = req.body;

  const embed = {
    embeds: [
      {
        title: "📥 New Visitor Logged",
        color: 0x00ffcc,
        fields: [
          { name: "IP", value: ip || "Unknown", inline: false },
          { name: "Page", value: page || "Unknown", inline: false },
          { name: "Device", value: userAgent || "Unknown", inline: false },
          { name: "Referrer", value: referrer || "None", inline: false }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    await fetch("https://discord.com/api/webhooks/1407279476592869387/6NWVmuA7uknDEZhokkPpxWJKuNda1RdZGmLtZHMxS1krrB56stgkRRJf1CMQHdpxfumu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed)
    });
    res.sendStatus(200);
  } catch (err) {
    console.error("Discord webhook failed:", err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("Logger running on port 3000"));
