import React from "react";
import logo from "../../assets/logos/logo.png";
import { Row, Col } from "antd";

export const AppIcon: React.FC<{page?: string}> = ({page}) => {
  return (
    <Row
      style={{
        position: "absolute",
        top: "10px",
      }}
    >
      <Col>
        {page ? (
          page === "login" ? (
            <img
              src={logo}
              alt=""
              width="70"
              height=""
              style={{
                position: "absolute",
                top: 0,
                left: -35,
              }}
              loading="lazy"
            ></img>
          ) : (
            <img src={logo} alt="" width="100" height="50" loading="lazy"></img>
          )
        ) : (
          <img src={logo} alt="" width="100" height="50" loading="lazy"></img>
        )}
      </Col>
    </Row>
  );
}
