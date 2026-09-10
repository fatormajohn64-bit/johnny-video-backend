import {
  createJson2Video,
  getJson2Video
} from "../services/editors/json2video.service.js";


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
    const movie = req.body;

    if (
      !movie ||
      typeof movie !== "object" ||
      Array.isArray(movie)
    ) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",

        message:
          "A JSON2Video Movie JSON object is required"
      });
    }

    const result =
      await createJson2Video(
        movie
      );

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

    if (!projectId) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",

        message:
          "projectId is required"
      });
    }

    const result =
      await getJson2Video(
        projectId
      );

    res.json({
      success: true,

      provider: "json2video",

      result
    });

  } catch (error) {
    next(error);
  }
}
