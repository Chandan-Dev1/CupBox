export function validateUrl(url) {
  if (!url || typeof url !== "string") {
    return { valid: false, message: "URL is required" };
  }

  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return { valid: false, message: "URL cannot be empty" };
  }

  try {
    const parsedUrl = new URL(trimmedUrl);

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return {
        valid: false,
        message: "Only HTTP and HTTPS URLs are allowed"
      };
    }

    return { valid: true, url: trimmedUrl };
  } catch {
    return { valid: false, message: "Please enter a valid URL" };
  }
}
