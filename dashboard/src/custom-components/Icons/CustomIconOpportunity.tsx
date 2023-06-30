import { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";

export default function CustomIconOpportunity() {
  const { mode, setMode } = useContext(ColorModeContext);
  if (mode === "dark") {
    return (
      <svg
        style={{
          height: 15,
          marginRight: "10px",
        }}
        width="15px"
        height="15px"
        viewBox="0 0 15 15"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <image
            width="128"
            height="128"
            href="data:image/png;base64,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"
            id="opportunity_icon"
          />
        </defs>
        <use
          href="#opportunity_icon"
          fill="#FFFFFF"
          stroke="none"
          transform="scale(0.1171875 0.1171875)"
        />
      </svg>
    );
  }
  return (
    <svg
      style={{
        height: 15,
        marginRight: "10px",
      }}
      width="15px"
      height="15px"
      viewBox="0 0 15 15"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <image
          width="128"
          height="128"
          href="data:image/png;base64,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"
          id="opportunity_icon"
        />
      </defs>
      <g>
        <use
          href="#opportunity_icon"
          fill="#FFFFFF"
          stroke="none"
          transform="scale(0.1171875 0.1171875)"
        />
      </g>
    </svg>
  );
}
