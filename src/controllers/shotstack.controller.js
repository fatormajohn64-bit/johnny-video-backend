import {
  createShotstackRender,
  getShotstackRender
} from "../services/editors/shotstack.service.js";


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
    const edit = req.body;

    if (
      !edit ||
      typeof edit !== "object" ||
      Array.isArray(edit)
    ) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",

        message:
          "A Shotstack Edit JSON object is required"
      });
    }

    const result =
      await createShotstackRender(
        edit
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

    if (!renderId) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",

        message:
          "renderId is required"
      });
    }

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
