import {
  createJson2VideoUpload,
  createShotstackUpload,
  getShotstackUploadStatus
} from "../services/editors/media-upload.service.js";


/*
|--------------------------------------------------------------------------
| Create upload URL
|--------------------------------------------------------------------------
*/

export async function createUploadUrl(
  req,
  res,
  next
) {
  try {
    const {
      provider,
      name,
      contentType,
      size
    } = req.body || {};

    if (!provider) {
      return res.status(400).json({
        error: "PROVIDER_REQUIRED",
        message: "provider is required"
      });
    }

    if (!name) {
      return res.status(400).json({
        error: "NAME_REQUIRED",
        message: "name is required"
      });
    }

    if (!contentType) {
      return res.status(400).json({
        error: "CONTENT_TYPE_REQUIRED",
        message: "contentType is required"
      });
    }

    if (!size) {
      return res.status(400).json({
        error: "SIZE_REQUIRED",
        message: "size is required"
      });
    }

    let result;

    if (provider === "json2video") {
      result =
        await createJson2VideoUpload({
          name,
          contentType,
          size
        });
    }

    else if (provider === "shotstack") {
      result =
        await createShotstackUpload();
    }

    else {
      return res.status(400).json({
        error: "UNSUPPORTED_PROVIDER",
        message:
          `Unsupported provider: ${provider}`
      });
    }

    res.status(200).json({
      success: true,
      provider,
      upload: result
    });

  } catch (error) {
    next(error);
  }
}


/*
|--------------------------------------------------------------------------
| Shotstack upload status
|--------------------------------------------------------------------------
*/

export async function getUploadStatus(
  req,
  res,
  next
) {
  try {
    const { id } = req.params;

    const result =
      await getShotstackUploadStatus(id);

    res.status(200).json({
      success: true,
      provider: "shotstack",
      upload: result
    });

  } catch (error) {
    next(error);
  }
}
