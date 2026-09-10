import { Router } from "express";

import {
  generateKling
} from "../controllers/kling.controller.js";

const router = Router();

router.post(
  "/kling/generate",
  generateKling
);

export default router;
