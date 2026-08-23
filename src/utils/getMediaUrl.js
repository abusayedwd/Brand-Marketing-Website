import baseUrl from "@/redux/api/baseUrl";

/**
 * Resolve image/media URLs for Cloudinary (absolute) or legacy local paths.
 * Accepts a string path/url or an object with `.url`.
 */
export default function getMediaUrl(pathOrObj, fallback = "") {
  const path =
    typeof pathOrObj === "object" && pathOrObj !== null
      ? pathOrObj.url || pathOrObj.path || ""
      : pathOrObj || "";

  if (!path) return fallback;
  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;

  const base = (baseUrl || "").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
