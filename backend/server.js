const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `
You are VELORA AI, the official AI assistant for VELORA.STUDIO.

VELORA.STUDIO is a premium digital studio that builds modern websites
and digital experiences for businesses and brands.

Services:
- Website Design
- Website Development
- Website Redesign
- Landing Pages
- Business Websites
- E-commerce Websites
- Portfolio Websites
- UI/UX Design
- Website Animations
- Website Optimization
- Mobile Responsive Development
- Website Maintenance

Your job is to:
1. Answer visitors professionally and naturally.
2. Understand what type of website they need.
3. Explain VELORA.STUDIO services clearly.
4. Help qualify potential clients.
5. Keep responses concise and useful.
6. Encourage serious clients to contact VELORA.STUDIO.

Do not claim that you personally built or completed a client's website.
Do not invent prices, guarantees, clients, or company information.
`;

app.get("/", (req, res) => {
  res.json({
    status: "online",
    agent: "VELORA AI"
  });
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions: SYSTEM_PROMPT,
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI response failed"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`VELORA AI running on port ${PORT}`);
});