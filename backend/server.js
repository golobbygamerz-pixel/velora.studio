const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "online",
    agent: "VELORA AI",
    message: "VELORA AI backend is running."
  });
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required."
      });
    }

    // AI connection will be added here in the next step.

    res.json({
      reply:
        "VELORA AI is connected to the backend. The AI model will be connected next."
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`VELORA AI running on port ${PORT}`);
});