import {
  generateVideo,
  editVideo,
  generateAndEditVideo
} from "../services/pipeline/video-pipeline.service.js";


/*
|--------------------------------------------------------------------------
| Generate video
|--------------------------------------------------------------------------
*/

export async function generate(
  req,
  res,
  next
) {
  try {
    const {
      generator,
      prompt,
      input = {}
    } = req.body || {};

    if (!generator) {
      return res.status(400).json({
        error: "GENERATOR_REQUIRED",
        message: "generator is required"
      });
    }

    if (!prompt) {
      return res.status(400).json({
        error: "PROMPT_REQUIRED",
        message: "prompt is required"
      });
    }

    const result =
      await generateVideo({
        provider: generator,
        prompt,
        input
      });

    res.status(202).json({
      success: true,
      result
    });

  } catch (error) {
    next(error);
  }
}


/*
|--------------------------------------------------------------------------
| Edit existing video
|--------------------------------------------------------------------------
*/

export async function edit(
  req,
  res,
  next
) {
  try {
    const {
      editor,
      videoUrl,
      settings = {}
    } = req.body || {};

    if (!editor) {
      return res.status(400).json({
        error: "EDITOR_REQUIRED",
        message: "editor is required"
      });
    }

    if (!videoUrl) {
      return res.status(400).json({
        error: "VIDEO_URL_REQUIRED",
        message: "videoUrl is required"
      });
    }

    let result;

    if (editor === "json2video") {
      result = await editVideo({
        provider: editor,
        edit: {
          ...settings,
          videoUrl
        }
      });
    }

    else if (editor === "shotstack") {
      result = await editVideo({
        provider: editor,
        edit: {
          ...settings,
          videoUrl
        }
      });
    }

    else {
      return res.status(400).json({
        error: "UNSUPPORTED_EDITOR",
        message: `Unsupported editor: ${editor}`
      });
    }

    res.status(202).json({
      success: true,
      result
    });

  } catch (error) {
    next(error);
  }
}


/*
|--------------------------------------------------------------------------
| Generate and edit
|--------------------------------------------------------------------------
*/

export async function generateAndEdit(
  req,
  res,
  next
) {
  try {
    const {
      generator,
      editor,
      prompt,
      generationInput = {},
      edit = {}
    } = req.body || {};

    if (!generator) {
      return res.status(400).json({
        error: "GENERATOR_REQUIRED",
        message: "generator is required"
      });
    }

    if (!editor) {
      return res.status(400).json({
        error: "EDITOR_REQUIRED",
        message: "editor is required"
      });
    }

    if (!prompt) {
      return res.status(400).json({
        error: "PROMPT_REQUIRED",
        message: "prompt is required"
      });
    }

    const result =
      await generateAndEditVideo({
        generator,
        editor,
        prompt,
        generationInput,
        edit
      });

    res.status(202).json({
      success: true,
      result
    });

  } catch (error) {
    next(error);
  }
}
