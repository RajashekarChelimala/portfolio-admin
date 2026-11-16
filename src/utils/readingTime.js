/**
 * Calculate estimated reading time for article content.
 * @param {string} content - raw HTML or plain text content
 * @param {number} wordsPerMinute - average reading speed (default 200 wpm)
 * @returns {string} e.g. "3 min read"
 */
export function getReadingTime(content, wordsPerMinute = 200) {
  if (!content) return "1 min read";
  // Strip HTML tags
  const plainText = content.replace(/<[^>]*>?/gm, "").trim();
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}
