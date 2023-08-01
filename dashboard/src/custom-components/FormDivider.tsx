import { Divider } from "antd";

export default function CustomFormDivider({text}) { 
    return (
      <Divider
        style={{
          borderColor: "#2bb19c",
          fontWeight: "bold",
        }}
        orientation="left"
      >
        {text}
      </Divider>
    );
}