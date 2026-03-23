import packageJson from "../../package.json";

function normalizeVersion(value?: string) {
  const candidate = value?.trim();
  if (!candidate) {
    const fallback = packageJson.version?.trim() || "0.1.0";
    return fallback.startsWith("v") ? fallback : `v${fallback}`;
  }
  return candidate.startsWith("v") ? candidate : `v${candidate}`;
}

export const APP_VERSION = normalizeVersion(process.env.APP_VERSION);

export function getAppVersion() {
  return APP_VERSION;
}