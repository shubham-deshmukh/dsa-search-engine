import { removeStopwords } from 'stopword';
import natural from 'natural';

export default function preprocess(text) {
  if (!text || typeof text !== 'string') return "";

  // 1. Strip HTML tags (e.g., <strong>, <code>)
  let cleanText = text.replace(/<[^>]*>?/gm, ' ');

  // 2. Remove HTML entities (e.g., &nbsp;, &lt;, etc.)
  cleanText = cleanText.replace(/&[a-z0-9#]+;/gi, ' ');

  // 3. Remove invisible unicode characters (zero-width spaces, BOM, control characters)
  cleanText = cleanText.replace(/[\u200B-\u200D\uFEFF]/g, '');
  cleanText = cleanText.replace(/\p{C}/gu, '');

  // 4. Lowercase, replace non-alphanumeric with spaces to avoid word merging, and tokenize
  const tokens = cleanText
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean); // Filter out any empty tokens

  // 5. Remove stop words
  const cleanTokens = removeStopwords(tokens);

  // 6. Stem each token using Porter Stemmer
  const stemmedTokens = cleanTokens.map(token => natural.PorterStemmer.stem(token));

  return stemmedTokens.join(" ");
}
