import {
  createJson2Video,
  getJson2Video
} from "../services/editors/json2video.service.js";

import {
  buildJson2VideoInput
} from "../services/pipeline/editor-input.service.js";


/*
|--------------------------------------------------------------------------
| Create JSON2Video render
|--------------------------------------------------------------------------
*/

export async function createJson2VideoRender(
  req,
  res,
  next
) {
  try {
    const {
      videoUrl,
      movie = {}
    } = req.body || {};

    const edit =
      buildJson2VideoInput({
        videoUrl,
        movie
      });

    const result =
      await createJson2Video(edit);

    res.status(202).json({
      success: true,
      provider: "json2video",
      result
    });

  } catch (error) {
    next(error);
  }
}


/*
|--------------------------------------------------------------------------
| Get JSON2Video render
|--------------------------------------------------------------------------
*/

export async function getJson2VideoRender(
  req,
  res,
  next
) {
  try {
    const {
      projectId
    } = req.params;

    const result =
      await getJson2Video(projectId);

    res.json({
      success: true,
      provider: "json2video",
      result
    });

  } catch (error) {
    next(error);
  }
}
