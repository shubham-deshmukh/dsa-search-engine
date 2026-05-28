export default function getSiteName(url) {
  try {
    const parsedUrl = new URL(url);
    // 1. Get hostname (e.g., "leetcode.com" or "www.leetcode.com")
    let hostname = parsedUrl.hostname;

    // 2. Remove "www." if it exists
    hostname = hostname.replace(/^www\./, "");

    // 3. Get the part before the first dot
    const siteName = hostname.split(".")[0];

    // 4. Capitalize first letter
    return siteName.charAt(0).toUpperCase() + siteName.slice(1);
  } catch (error) {
    return "Invalid URL";
  }
}
