import { env } from "../../config/env.js";

import {
  HttpError
} from "../../utils/http-error.js";

const SHOTSTACK_URL =
  "https://api.shotstack.io/edit";

function getBaseUrl() {
  return `${SHOTSTACK_URL}/${env.shotstackEnv}`;
}

async function shotstackRequest(
  endpoint,
  options = {}
) {
  const response = await fetch(
    `${getBaseUrl()}${endpoint}`,
    {
      ...options,

      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",

        "x-api-key":
          env.shotstackApiKey,

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

      data?.response?.message ||
        data?.message ||
        "Shotstack request failed",

      "SHOTSTACK_ERROR"
    );
  }

  return data;
}


/*
|--------------------------------------------------------------------------
| Create render
|--------------------------------------------------------------------------
*/

export async function createShotstackRender(
  edit
) {
  if (!env.shotstackApiKey) {
    throw new HttpError(
      503,

      "SHOTSTACK_API_KEY is not configured",

      "PROVIDER_NOT_CONFIGURED"
    );
  }

  return shotstackRequest(
    "/render",
    {
      method: "POST",

      body: JSON.stringify(
        edit
      )
    }
  );
}


/*
|--------------------------------------------------------------------------
| Get render status
|--------------------------------------------------------------------------
*/

export async function getShotstackRender(
  renderId
) {
  if (!env.shotstackApiKey) {
    throw new HttpError(
      503,

      "SHOTSTACK_API_KEY is not configured",

      "PROVIDER_NOT_CONFIGURED"
    );
  }

  return shotstackRequest(
    `/render/${encodeURIComponent(
      renderId
    )}`,
    {
      method: "GET"
    }
  );
}
