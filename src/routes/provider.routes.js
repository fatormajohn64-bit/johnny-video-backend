import { Router } from "express";
import { env } from "../config/env.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    generators: [
      {
        id: "kling",
        name: "Kling AI",
        provider: "fal.ai",
        type: "video-generator",
        configured: Boolean(env.falKey)
      },
      {
        id: "huggingface",
        name: "Hugging Face",
        type: "video-generator",
        configured: Boolean(env.hfToken)
      }
    ],

    editors: [
      {
        id: "json2video",
        name: "JSON2Video",
        type: "video-editor",
        configured: Boolean(
          env.json2videoApiKey
        )
      },
      {
        id: "shotstack",
        name: "Shotstack",
        type: "video-editor",
        configured: Boolean(
          env.shotstackApiKey
        )
      }
    ]
  });
});

export default router;
