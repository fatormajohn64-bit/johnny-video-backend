import { InferenceClient } from "@huggingface/inference";
import { env } from "../../config/env.js";
import { HttpError } from "../../utils/http-error.js";

export async function generateHuggingFaceVideo({
  prompt,
  model,
  input = {}
}) {
  if (!env.hfToken) {
    throw new HttpError(
      503,
      "HF_TOKEN is not configured",
      "PROVIDER_NOT_CONFIGURED"
    );
  }

  const client =
    new InferenceClient(
      env.hfToken
    );

  const selectedModel =
    model || env.hfVideoModel;

  const video =
    await client.textToVideo({
      model: selectedModel,
      inputs: prompt,
      ...input
    });

  return {
    success: true,
    provider: "huggingface",
    model: selectedModel,
    status: "completed",
    video,
    contentType:
      video?.type || "video/mp4"
  };
}
