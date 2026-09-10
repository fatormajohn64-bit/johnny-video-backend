import { HttpError } from "../../utils/http-error.js";
import { providerSettings } from "../../config/provider-settings.js";

export function validateProviderSettings(provider, input = {}) {
  const config = providerSettings[provider];

  if (!config) {
    throw new HttpError(
      400,
      `Unknown provider: ${provider}`,
      "PROVIDER_NOT_FOUND"
    );
  }

  const settings = config.settings || {};
  const validated = {};

  for (const [key, definition] of Object.entries(settings)) {
    const value = input[key];

    // Use default when nothing was provided
    if (value === undefined || value === null) {
      if (definition.default !== undefined) {
        validated[key] = definition.default;
      }

      if (definition.required) {
        throw new HttpError(
          400,
          `${key} is required`,
          "SETTING_REQUIRED"
        );
      }

      continue;
    }

    // Validate select options
    if (
      definition.type === "select" &&
      Array.isArray(definition.options)
    ) {
      if (!definition.options.includes(String(value))) {
        throw new HttpError(
          400,
          `Invalid ${key}. Allowed values: ${definition.options.join(", ")}`,
          "INVALID_SETTING"
        );
      }
    }

    // Validate numbers
    if (definition.type === "number") {
      const numberValue = Number(value);

      if (Number.isNaN(numberValue)) {
        throw new HttpError(
          400,
          `${key} must be a number`,
          "INVALID_SETTING"
        );
      }

      validated[key] = numberValue;
      continue;
    }

    validated[key] = value;
  }

  return validated;
}
