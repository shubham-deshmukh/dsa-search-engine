import React from "react";

interface SearchResult {
  title?: string;
  name?: string;
  url?: string;
  link?: string;
  description?: string;
  snippet?: string;
  platform?: string;
  tags?: string[];
}

interface SearchResultCardProps {
  result: SearchResult;
  index: number;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ result, index }) => {
  const href = result.url || result.link || "#";
  const title = result.title || result.name || `Search Result ${index + 1}`;
  const description = result.description || result.snippet;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 rounded-xl bg-gray-800/40 hover:bg-gray-800 border border-transparent hover:border-violet-500/30 transition-all duration-200"
    >
      <h4 className="text-sm font-medium text-violet-300 mb-1">{title}</h4>
      {description && (
        <p className="text-xs text-gray-400 line-clamp-2">{description}</p>
      )}
      {(result.platform || (result.tags && result.tags.length > 0)) && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {result.platform && (
            <span className="text-[10px] font-semibold tracking-wider text-white bg-violet-600/80 px-2 py-0.5 rounded uppercase">
              {result.platform}
            </span>
          )}
          {result.tags && result.tags.map((tag, i) => (
            <span key={i} className="text-[10px] text-gray-400 bg-gray-700/50 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
};

export default SearchResultCard;