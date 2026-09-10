import { Router } from "express";

import {
  createJson2VideoRender,
  getJson2VideoRender
} from "../controllers/json2video.controller.js";

const router = Router();


/*
|--------------------------------------------------------------------------
| JSON2Video
|--------------------------------------------------------------------------
*/

router.post(
  "/json2video/render",
  createJson2VideoRender
);

router.get(
  "/json2video/render/:projectId",
  getJson2VideoRender
);


export default router;
