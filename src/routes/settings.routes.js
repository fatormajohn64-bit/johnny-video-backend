import { Router } from "express";

import {
  getProviderSettings
} from "../controllers/settings.controller.js";

const router = Router();

router.get("/:provider", getProviderSettings);

export default router;
