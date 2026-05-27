import React, { useState } from "react";
import { motion } from "motion/react";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <motion.div
      className="inline-flex items-center gap-[8px] rounded-full p-2 bg-night hover:shadow-[0px_10px_20px_-5px_rgba(0,0,0,0.5)] shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.25)]"
      animate={{
        y: isExpanded ? 50 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.div className="flex h-[32px] w-[32px] items-center justify-center rounded-full hover:bg-violet-900 transition-colors duration-300 cursor-pointer">
        <img src="/images/brave-logo.svg" alt="Brave Logo" className="h-5 w-5 object-contain" />
      </motion.div>
      <motion.input
        className="outline-0 bg-transparent text-gray-100 placeholder-gray-400"
        type="text"
        placeholder="Ask Brave Search"
        aria-label="Search DSA problems"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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

      <motion.div
        className="flex h-[32px] w-[32px] items-center justify-center rounded-full hover:bg-violet-900 transition-colors duration-300 cursor-pointer pointer-events-none"
        animate={{
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <img src="/images/search.svg" alt="Search Logo" className="h-5 w-5 object-contain" />
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;
