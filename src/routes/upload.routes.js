import { Router } from "express";

import {
  createUploadUrl,
  getUploadStatus
} from "../controllers/upload.controller.js";

const router = Router();


/*
|--------------------------------------------------------------------------
| Create upload
|--------------------------------------------------------------------------
*/

router.post(
  "/url",
  createUploadUrl
);


/*
|--------------------------------------------------------------------------
| Shotstack upload status
|--------------------------------------------------------------------------
*/

router.get(
  "/shotstack/:id",
  getUploadStatus
);


export default router;
