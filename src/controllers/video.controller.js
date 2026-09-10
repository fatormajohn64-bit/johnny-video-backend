import {
  generateVideo,
  editVideo,
  generateAndEditVideo
} from "../services/pipeline/video-pipeline.service.js";

import {
  validateProviderSettings
} from "../services/pipeline/settings-validator.service.js";


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

    // Validate provider-specific settings
    const validatedInput =
      validateProviderSettings(
        generator,
        input
      );

    const result =
      await generateVideo({
        provider: generator,
        prompt,
        input: {
          ...validatedInput,
          ...input
        }
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

    // Validate editor settings
    const validatedSettings =
      validateProviderSettings(
        editor,
        settings
      );

    let result;

    if (editor === "json2video") {
      result = await editVideo({
        provider: editor,
        edit: {
          ...validatedSettings,
          videoUrl
        }
      });
    }

    else if (editor === "shotstack") {
      result = await editVideo({
        provider: editor,
        edit: {
          ...validatedSettings,
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

    // Validate generator settings
    const validatedGenerationInput =
      validateProviderSettings(
        generator,
        generationInput
      );

    // Validate editor settings
    const validatedEdit =
      validateProviderSettings(
        editor,
        edit
      );

    const result =
      await generateAndEditVideo({
        generator,
        editor,
        prompt,
        generationInput: {
          ...validatedGenerationInput,
          ...generationInput
        },
        edit: {
          ...validatedEdit,
          ...edit
        }
      });

    res.status(202).json({
      success: true,
      result
    });

  } catch (error) {
    next(error);
  }
}
