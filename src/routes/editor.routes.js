import { Router } from "express";

import {
  createJson2VideoRender,
  getJson2VideoRender
} from "../controllers/json2video.controller.js";

import {
  createShotstack,
  getShotstack
} from "../controllers/shotstack.controller.js";

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


/*
|--------------------------------------------------------------------------
| Shotstack
|--------------------------------------------------------------------------
*/

router.post(
  "/shotstack/render",
  createShotstack
);

router.get(
  "/shotstack/render/:renderId",
  getShotstack
);


export default router;
