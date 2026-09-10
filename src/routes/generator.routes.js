import { Router } from "express";

import {
  generateKling
} from "../controllers/kling.controller.js";

import {
  generateHuggingFace
} from "../controllers/huggingface.controller.js";

const router = Router();

router.post(
  "/kling/generate",
  generateKling
);

router.post(
  "/huggingface/generate",
  generateHuggingFace
);

export default router;
