import { Router } from "express";

import {
  uploadVideo
} from "../middleware/upload.middleware.js";

import {
  upload
} from "../controllers/upload.controller.js";

const router = Router();

router.post(
  "/video",
  uploadVideo,
  upload
);

export default router;
