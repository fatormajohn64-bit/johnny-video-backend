import { HttpError } from "../../utils/http-error.js";
import { providerSettings } from "../../config/provider-settings.js";


/*
|--------------------------------------------------------------------------
| Validate provider settings
|--------------------------------------------------------------------------
*/

export function validateProviderSettings(
  provider,
  input = {}
) {
  const config =
    providerSettings[provider];

  if (!config) {
    throw new HttpError(
      400,
      `Unknown provider: ${provider}`,
      "PROVIDER_NOT_FOUND"
    );
  }

  if (
    input === null ||
    typeof input !== "object" ||
    Array.isArray(input)
  ) {
    throw new HttpError(
      400,
      "Settings must be an object",
      "INVALID_SETTINGS"
    );
  }

  const definitions =
    config.settings || {};

  const validated = {};


  /*
  |--------------------------------------------------------------------------
  | Validate every configured setting
  |--------------------------------------------------------------------------
  */

  for (
    const [key, definition]
    of Object.entries(definitions)
  ) {
    let value = input[key];


    /*
    |--------------------------------------------------------------------------
    | Default value
    |--------------------------------------------------------------------------
    */

    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      if (
        definition.default !== undefined
      ) {
        value = definition.default;
      }

      else if (definition.required) {
        throw new HttpError(
          400,
          `${key} is required`,
          "SETTING_REQUIRED"
        );
      }

      else {
        continue;
      }
    }


    /*
    |--------------------------------------------------------------------------
    | Select
    |--------------------------------------------------------------------------
    */

    if (
      definition.type === "select"
    ) {
      if (
        !Array.isArray(
          definition.options
        )
      ) {
        throw new HttpError(
          500,
          `Invalid configuration for ${key}`,
          "INVALID_SETTING_CONFIG"
        );
      }

      const selected =
        String(value);

      if (
        !definition.options.includes(
          selected
        )
      ) {
        throw new HttpError(
          400,
          `Invalid ${key}. Allowed values: ${definition.options.join(", ")}`,
          "INVALID_SETTING"
        );
      }

      validated[key] = selected;

      continue;
    }


    /*
    |--------------------------------------------------------------------------
    | Number
    |--------------------------------------------------------------------------
    */

    if (
      definition.type === "number"
    ) {
      const numberValue =
        Number(value);

      if (
        !Number.isFinite(
          numberValue
        )
      ) {
        throw new HttpError(
          400,
          `${key} must be a valid number`,
          "INVALID_SETTING"
        );
      }

      if (
        definition.min !== undefined &&
        numberValue < definition.min
      ) {
        throw new HttpError(
          400,
          `${key} must be at least ${definition.min}`,
          "INVALID_SETTING"
        );
      }

      if (
        definition.max !== undefined &&
        numberValue > definition.max
      ) {
        throw new HttpError(
          400,
          `${key} must be at most ${definition.max}`,
          "INVALID_SETTING"
        );
      }

      validated[key] =
        numberValue;

      continue;
    }


    /*
    |--------------------------------------------------------------------------
    | Boolean
    |--------------------------------------------------------------------------
    */

    if (
      definition.type === "boolean"
    ) {
      if (
        typeof value !== "boolean"
      ) {
        throw new HttpError(
          400,
          `${key} must be true or false`,
          "INVALID_SETTING"
        );
      }

      validated[key] = value;

      continue;
    }


    /*
    |--------------------------------------------------------------------------
    | URL
    |--------------------------------------------------------------------------
    */

    if (
      definition.type === "url"
    ) {
      if (
        typeof value !== "string"
      ) {
        throw new HttpError(
          400,
          `${key} must be a URL`,
          "INVALID_SETTING"
        );
      }

      try {
        const url =
          new URL(value);

        if (
          ![
            "http:",
            "https:"
          ].includes(url.protocol)
        ) {
          throw new Error();
        }

      } catch {
        throw new HttpError(
          400,
          `${key} must be a valid HTTP or HTTPS URL`,
          "INVALID_SETTING"
        );
      }

      validated[key] = value;

      continue;
    }


    /*
    |--------------------------------------------------------------------------
    | Text
    |--------------------------------------------------------------------------
    */

    if (
      definition.type === "text"
    ) {
      if (
        typeof value !== "string"
      ) {
        throw new HttpError(
          400,
          `${key} must be text`,
          "INVALID_SETTING"
        );
      }

      validated[key] = value;

      continue;
    }


    /*
    |--------------------------------------------------------------------------
    | Object
    |--------------------------------------------------------------------------
    */

    if (
      definition.type === "object"
    ) {
      if (
        typeof value !== "object" ||
        value === null ||
        Array.isArray(value)
      ) {
        throw new HttpError(
          400,
          `${key} must be an object`,
          "INVALID_SETTING"
        );
      }

      validated[key] =
        structuredClone(value);

      continue;
    }


    /*
    |--------------------------------------------------------------------------
    | Unknown type
    |--------------------------------------------------------------------------
    */

    throw new HttpError(
      500,
      `Unsupported setting type: ${definition.type}`,
      "INVALID_SETTING_CONFIG"
    );
  }


  return validated;
}
