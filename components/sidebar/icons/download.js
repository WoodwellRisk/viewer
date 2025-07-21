import { IconButton } from "theme-ui";
import { ArrowThin } from "@carbonplan/icons";

const DownloadButton = () => {
  return (
    <>
      <IconButton
        aria-label="Download data button"
        sx={{
          stroke: "primary",
          cursor: "pointer",
          width: 30,
          height: 30,
          border: "1px solid",
          borderColor: "primary",
          borderRadius: "5px",
          transition: "color 0.15s",
          "@media (hover: hover) and (pointer: fine)": {
            "&:hover": {
              color: "secondary",
              borderColor: "secondary",
              borderWidth: "2px",
            },
          },
        }}
      >
        <ArrowThin
          sx={{
            transform: "rotate(90deg)",
            strokeWidth: 1.5,
            width: 15,
            height: 15,
          }}
        />
      </IconButton>
    </>
  );
};

export default DownloadButton;