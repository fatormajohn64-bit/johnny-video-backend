import { HttpError } from "../utils/http-error.js";

export async function upload(
  req,
  res,
  next
) {
  try {
    if (!req.file) {
      throw new HttpError(
        400,
        "Video file is required",
        "VIDEO_REQUIRED"
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Temporary upload
    |--------------------------------------------------------------------------
    |
    | The file currently exists only in memory.
    | We do NOT save it as a project or asset.
    |
    */

    res.status(200).json({
      success: true,

      message:
        "Video uploaded successfully",

      file: {
        filename:
          req.file.originalname,

        mimetype:
          req.file.mimetype,

        size:
          req.file.size
      },

      /*
      | This is intentionally not a permanent URL.
      */
      stored: false
    });

  } catch (error) {
    next(error);
  }
}
