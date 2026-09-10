import { Router } from "express";

import {
  generate,
  edit,
  generateAndEdit
} from "../controllers/video.controller.js";

const router = Router();


/*
|--------------------------------------------------------------------------
| Generate
|--------------------------------------------------------------------------
*/

router.post(
  "/generate",
  generate
);


/*
|--------------------------------------------------------------------------
| Edit
|--------------------------------------------------------------------------
*/

router.post(
  "/edit",
  edit
);


/*
|--------------------------------------------------------------------------
| Generate + Edit
|--------------------------------------------------------------------------
*/

router.post(
  "/generate-and-edit",
  generateAndEdit
);


export default router;
