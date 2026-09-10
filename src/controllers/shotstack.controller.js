import {
  createShotstackRender,
  getShotstackRender
} from "../services/editors/shotstack.service.js";

import {
  buildShotstackInput
} from "../services/pipeline/editor-input.service.js";


/*
|--------------------------------------------------------------------------
| Create Shotstack render
|--------------------------------------------------------------------------
*/

export async function createShotstack(
  req,
  res,
  next
) {
  try {
    const {
      videoUrl,
      edit = {}
    } = req.body || {};

    const editInput =
      buildShotstackInput({
        videoUrl,
        edit
      });

    const result =
      await createShotstackRender(
        editInput
      );

    res.status(202).json({
      success: true,
      provider: "shotstack",
      result
    });

  } catch (error) {
    next(error);
  }
}


/*
|--------------------------------------------------------------------------
| Get Shotstack render
|--------------------------------------------------------------------------
*/

export async function getShotstack(
  req,
  res,
  next
) {
  try {
    const {
      renderId
    } = req.params;

    const result =
      await getShotstackRender(
        renderId
      );

    res.json({
      success: true,
      provider: "shotstack",
      result
    });

  } catch (error) {
    next(error);
  }
}
