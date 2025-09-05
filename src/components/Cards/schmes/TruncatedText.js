import { useState } from "react";

const TruncatedText = ({ text, limit }) => {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= limit) return text; // short enough, show full

  return (
    <span>
      {expanded ? text : text.slice(0, limit) + "... "}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-500 underline text-xs ml-1"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </span>
  );
};

export default TruncatedText;