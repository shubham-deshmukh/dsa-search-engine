import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    console.log(isExpanded);
  }, [isExpanded]);
  return (
    <motion.div
      className="inline-flex gap-[8px] rounded-[12px] p-2 bg-night hover:shadow-[0px_10px_20px_-5px_rgba(0,0,0,0.5)] shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.25)]"
      animate={{
        y: isExpanded ? 50 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.div className="h-[30px] w-[30px] p-[7px] hover:bg-violet-900 transition-colors duration-300">
        <img src="/images/brave-logo.svg" alt="Brave Logo" height="" />
      </motion.div>
      <motion.input
        className="w-82 outline-0"
        type="text"
        placeholder="Ask Brave Search"
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        animate={{
          width: isExpanded ? "450px" : "328px",
        }}
      />

      <motion.div
        className="h-[30px] w-[30px] p-[7px] hover:bg-violet-900 transition-colors duration-300"
        animate={{
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <img src="/images/search.svg" alt="Search Logo" />
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;
