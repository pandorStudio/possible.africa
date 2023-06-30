import React, { useContext } from "react";
import logo from "../../assets/logos/logo.png";
import logoWhite from "../../assets/logos/logo-white.png";
import { Row, Col } from "antd";
import { ColorModeContext } from "../../contexts/color-mode";

export const AppIcon: React.FC<{ page?: string }> = ({ page }) => {
  const { mode, setMode } = useContext(ColorModeContext);
  return (
    <Row
      style={{
        margin: "10px",
      }}
    >
      <Col>
        {page ? (
          page === "login" ? (
            <img
              src={mode === "dark" ? logoWhite : logo}
              alt=""
              width="70"
              height=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
              loading="lazy"
            ></img>
          ) : (
            <img
              src={mode === "dark" ? logoWhite : logo}
              alt=""
              width="100"
              height="50"
              loading="lazy"
            ></img>
          )
        ) : (
          <img
            src={mode === "dark" ? logoWhite : logo}
            alt=""
            width="100"
            height="50"
            loading="lazy"
          ></img>
        )}
      </Col>
    </Row>
  );
};
