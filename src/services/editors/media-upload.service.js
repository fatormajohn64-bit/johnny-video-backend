import { env } from "../../config/env.js";
import { HttpError } from "../../utils/http-error.js";

const JSON2VIDEO_URL =
  "https://api.json2video.com/v2";

const SHOTSTACK_INGEST_URL =
  "https://api.shotstack.io/ingest";


/*
|--------------------------------------------------------------------------
| Generic JSON request
|--------------------------------------------------------------------------
*/

async function request(
  url,
  options = {}
) {
  const response = await fetch(url, {
    ...options,

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data =
    await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new HttpError(
      response.status,

      data?.message ||
        data?.error ||
        data?.response?.message ||
        "Media request failed",

      "MEDIA_PROVIDER_ERROR"
    );
  }

  return data;
}


/*
|--------------------------------------------------------------------------
| JSON2Video
|--------------------------------------------------------------------------
*/

export async function createJson2VideoUpload({
  name,
  contentType,
  size
}) {
  if (!env.json2videoApiKey) {
    throw new HttpError(
      503,
      "JSON2VIDEO_API_KEY is not configured",
      "PROVIDER_NOT_CONFIGURED"
    );
  }

  return request(
    `${JSON2VIDEO_URL}/media/file`,
    {
      method: "POST",

      headers: {
        "x-api-key":
          env.json2videoApiKey
      },

      body: JSON.stringify({
        name,
        contentType,
        size
      })
    }
  );
}


/*
|--------------------------------------------------------------------------
| Shotstack
|--------------------------------------------------------------------------
*/

export async function createShotstackUpload() {
  if (!env.shotstackApiKey) {
    throw new HttpError(
      503,
      "SHOTSTACK_API_KEY is not configured",
      "PROVIDER_NOT_CONFIGURED"
    );
  }

  return request(
    `${SHOTSTACK_INGEST_URL}/stage/upload`,
    {
      method: "POST",

      headers: {
        "x-api-key":
          env.shotstackApiKey
      }
    }
  );
}


/*
|--------------------------------------------------------------------------
| Shotstack ingest status
|--------------------------------------------------------------------------
*/

export async function getShotstackUploadStatus(
  id
) {
  if (!env.shotstackApiKey) {
    throw new HttpError(
      503,
      "SHOTSTACK_API_KEY is not configured",
      "PROVIDER_NOT_CONFIGURED"
    );
  }

  if (!id) {
    throw new HttpError(
      400,
      "Upload ID is required",
      "UPLOAD_ID_REQUIRED"
    );
  }

  return request(
    `${SHOTSTACK_INGEST_URL}/source/${encodeURIComponent(id)}`,
    {
      method: "GET",

      headers: {
        "x-api-key":
          env.shotstackApiKey
      }
    }
  );
}
