import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // API Routes
  app.post("/api/analyze", async (req, res) => {
    try {
      const { image, prompt } = req.body;
      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      const base64Data = image.split(",")[1];
      
      const result = await model.generateContent([
        prompt || "Analyze this product image to determine if it is original or counterfeit. Look for packaging quality, logo consistency, spelling errors, and overall build quality. Return response in detailed JSON format: { authenticity_percentage, fake_probability, confidence_score, issues_detected: [], report: string, decision: 'Safe' | 'Warning' | 'Dangerous' }",
        {
          inlineData: {
            data: base64Data,
            mimeType: "image/jpeg"
          }
        }
      ]);

      const responseText = result.response.text();
      // Extract JSON from potential markdown blocks
      const cleanJson = responseText.replace(/```json|```/g, "").trim();
      res.json(JSON.parse(cleanJson));
    } catch (error) {
      console.error("AI Analysis Error:", error);
      res.status(500).json({ error: "Failed to analyze image" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
