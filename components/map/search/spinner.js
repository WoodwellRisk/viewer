import React from "react";
import { Box } from "theme-ui";
import { keyframes } from "@emotion/react";

const Spinner = () => {
  const spin = keyframes({
    from: {
      transform: "rotateZ(0deg)",
    },
    to: {
      transform: "rotateZ(360deg)",
    },
  });

  return (
    <>
      <Box
        aria-label="Loading search results"
        sx={{
          position: "absolute",
          display: ["initial", "initial", "initial", "initial"],
          left: ["49%"],
          top: ["40%"],
          padding: [0],
          margin: [0],
          cursor: "pointer",
          stroke: "primary",
          color: "primary",
        }}
      >
        <Box
          as="svg"
          className="spinner"
          viewBox="0 0 40 40"
          fill="none"
          width="39px"
          height="39px"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          sx={{
            animation: `${spin.toString()} 1.4s linear infinite`,
          }}
        >
          <circle
            className="path"
            cx="20"
            cy="20"
            r="18"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="187"
            strokeDashoffset="0"
            transform-origin="center"
          ></circle>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: ["45%"],
          top: ["46%"],
          cursor: "pointer",
          ml: [2],
          display: ["initial", "initial", "initial", "initial"],
          position: "absolute",
          color: "primary",
          textTransform: "uppercase",
          letterSpacing: "mono",
        }}
      >
        Loading...
      </Box>
    </>
  );
};

export default Spinner;
