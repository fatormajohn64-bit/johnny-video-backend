function getEnv(name, fallback = "") {
  return process.env[name]?.trim() || fallback;
}

export const env = {
  nodeEnv: getEnv("NODE_ENV", "development"),

  port: Number(getEnv("PORT", "10000")),

  frontendUrl: getEnv(
    "FRONTEND_URL",
    "http://localhost:5500"
  ),

  falKey: getEnv("FAL_KEY"),

  hfToken: getEnv("HF_TOKEN"),

  json2videoApiKey: getEnv(
    "JSON2VIDEO_API_KEY"
  ),

  shotstackApiKey: getEnv(
    "SHOTSTACK_API_KEY"
  ),

  shotstackEnv: getEnv(
    "SHOTSTACK_ENV",
    "v1"
  ),

  hfVideoModel: getEnv(
    "HF_VIDEO_MODEL",
    "Wan-AI/Wan2.2-TI2V-5B"
  )
};
