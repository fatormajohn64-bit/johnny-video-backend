import { env } from "../../config/env.js";

import {
  HttpError
} from "../../utils/http-error.js";

const JSON2VIDEO_URL =
  "https://api.json2video.com/v2";

async function json2videoRequest(
  endpoint,
  options = {}
) {
  const response = await fetch(
    `${JSON2VIDEO_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",

        "x-api-key":
          env.json2videoApiKey,

        ...(options.headers || {})
      }
    }
  );

  const data =
    await response.json()
      .catch(() => ({}));

  if (!response.ok) {
    throw new HttpError(
      response.status,
      data.message ||
        data.error ||
        "JSON2Video request failed",
      "JSON2VIDEO_ERROR"
    );
  }

  return data;
}


/*
|--------------------------------------------------------------------------
| Create video
|--------------------------------------------------------------------------
*/

export async function createJson2Video(
  movie
) {
  if (!env.json2videoApiKey) {
    throw new HttpError(
      503,
      "JSON2VIDEO_API_KEY is not configured",
      "PROVIDER_NOT_CONFIGURED"
    );
  }

  return json2videoRequest(
    "/movies",
    {
      method: "POST",

      body: JSON.stringify(
        movie
      )
    }
  );
}


/*
|--------------------------------------------------------------------------
| Get video/render status
|--------------------------------------------------------------------------
*/

export async function getJson2Video(
  projectId
) {
  if (!env.json2videoApiKey) {
    throw new HttpError(
      503,
      "JSON2VIDEO_API_KEY is not configured",
      "PROVIDER_NOT_CONFIGURED"
    );
  }

  return json2videoRequest(
    `/movies?project=${encodeURIComponent(
      projectId
    )}`,
    {
      method: "GET"
    }
  );
}
