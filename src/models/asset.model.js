import { randomUUID } from "node:crypto";

export function createAsset({
  projectId,
  type,
  url,
  provider = null,
  metadata = {}
}) {
  return {
    id: randomUUID(),

    projectId,

    type,

    url,

    provider,

    metadata,

    createdAt:
      new Date().toISOString()
  };
}
