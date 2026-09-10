import {
  generateHuggingFaceVideo
} from "../services/generators/huggingface.service.js";

export async function generateHuggingFace(req, res, next) {
  try {
    const {
      prompt,
      model,
      input = {}
    } = req.body || {};

    if (!prompt) {
      return res.status(400).json({
        error: "PROMPT_REQUIRED",
        message: "prompt is required"
      });
    }

    const result =
      await generateHuggingFaceVideo({
        prompt,
        model,
        input
      });

    /*
    |--------------------------------------------------------------------------
    | Hugging Face returns video data as a Blob.
    |
    | We intentionally do not save it on the backend.
    |--------------------------------------------------------------------------
    */

    res.status(200).json({
      success: true,
      provider: "huggingface",
      model: result.model,
      status: result.status,
      video: result.video
    });

  } catch (error) {
    next(error);
  }
}
