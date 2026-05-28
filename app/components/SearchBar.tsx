import React, { useState } from "react";
import { motion } from "motion/react";
import SearchResultCard from "./SearchResultCard";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      console.log("Search results:", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: isExpanded ? "auto" : "none" }}
      />
      
      <motion.div
        className="relative z-50 inline-flex items-center gap-2 rounded-full p-2 bg-night hover:shadow-[0px_10px_20px_-5px_rgba(0,0,0,0.5)] shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.25)]"
      animate={{
        y: isExpanded ? 50 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.div className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-violet-900 transition-colors duration-300 cursor-pointer">
        <img src="/images/brave-logo.svg" alt="Brave Logo" className="h-5 w-5 object-contain" />
      </motion.div>
      <motion.input
        className="outline-0 bg-transparent text-gray-100 placeholder-gray-400"
        type="text"
        placeholder="Ask DSA Search"
        aria-label="Search DSA problems"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setSearchQuery("");
            setSearchResults(null);
            setIsExpanded(false);
            e.currentTarget.blur();
          } else if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => {
          if (document.hasFocus()) {
            setIsExpanded(false);
          }
        }}
        animate={{
          width: isExpanded ? "450px" : "328px",
        }}
      />

      {/* Clear Button */}
      {searchQuery && isExpanded && (
        <motion.div
          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-700 transition-colors duration-300 cursor-pointer text-gray-400 hover:text-white"
          onMouseDown={(e) => {
            e.preventDefault(); // Prevents the input from losing focus
            setSearchQuery("");
            setSearchResults(null);
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.div>
      )}

      <motion.div
        className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-violet-900 transition-colors duration-300 cursor-pointer ${
          isExpanded ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onMouseDown={(e) => {
          e.preventDefault(); // Prevents the input from losing focus before the search triggers
          handleSearch();
        }}
        animate={{
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <img src="/images/search.svg" alt="Search Logo" className="h-5 w-5 object-contain" />
      </motion.div>

      {/* JSON Results Dropdown */}
      {isExpanded && searchResults && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-4 left-0 w-full bg-night border border-gray-700 rounded-2xl p-4 shadow-2xl text-left cursor-default"
        >
          <div className="max-h-80 overflow-y-auto flex flex-col gap-2 text-gray-200">
            {searchResults.error ? (
              <p className="text-center text-sm text-red-400 py-4">
                {searchResults.error}
              </p>
            ) : searchResults.results && searchResults.results.length > 0 ? (
              searchResults.results.map((result: any, index: number) => (
                <SearchResultCard key={index} result={result} index={index} />
              ))
            ) : (
              <p className="text-center text-sm text-gray-400 py-4">
                No results found.
              </p>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
    </>
  );
};

export default SearchBar;
