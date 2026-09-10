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

    if (!result.video) {
      return res.status(502).json({
        error: "VIDEO_NOT_RETURNED",
        message:
          "Hugging Face did not return video data"
      });
    }

    res.setHeader(
      "Content-Type",
      result.contentType || "video/mp4"
    );

    res.setHeader(
      "Content-Disposition",
      'inline; filename="johnny-tec-video.mp4"'
    );

    const buffer =
      Buffer.from(
        await result.video.arrayBuffer()
      );

    res.send(buffer);

  } catch (error) {
    next(error);
  }
}
