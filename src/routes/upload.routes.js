import { Router } from "express";

import {
  createUploadUrl
} from "../controllers/upload.controller.js";

const router = Router();


/*
|--------------------------------------------------------------------------
| Create provider upload URL
|--------------------------------------------------------------------------
*/

router.post(
  "/url",
  createUploadUrl
);


export default router;
