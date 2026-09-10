import {
  providerSettings
} from "../config/provider-settings.js";

export function getProviderSettings(
  req,
  res
) {
  const {
    provider
  } = req.params;

  const settings =
    providerSettings[provider];

  if (!settings) {
    return res.status(404).json({
      error: "PROVIDER_NOT_FOUND",
      message: `Unknown provider: ${provider}`
    });
  }

  res.json({
    success: true,
    provider,
    ...settings
  });
}
