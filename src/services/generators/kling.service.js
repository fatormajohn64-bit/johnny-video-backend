import { fal } from "@fal-ai/client";

import { env } from "../../config/env.js";

import {
  HttpError
} from "../../utils/http-error.js";

const KLING_MODEL =
  "fal-ai/kling-video/v2.6/pro/text-to-video";

export async function generateKlingVideo({
  prompt,
  input = {}
}) {
  if (!env.falKey) {
    throw new HttpError(
      503,
      "FAL_KEY is not configured",
      "PROVIDER_NOT_CONFIGURED"
    );
  }

  fal.config({
    credentials: env.falKey
  });

  const {
    model,
    ...settings
  } = input;

  const result = await fal.subscribe(
    model || KLING_MODEL,
    {
      input: {
        prompt,
        ...settings
      },

      logs: true,

      onQueueUpdate(update) {
        console.log(
          "Kling queue update:",
          update.status
        );
      }
    }
  );

  return {
    success: true,

    provider: "kling",

    model:
      model || KLING_MODEL,

    requestId:
      result.requestId,

    status: "completed",

    data:
      result.data
  };
}
