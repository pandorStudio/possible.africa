import React from "react";
import { Typography } from "antd";
import type { TextFieldProps } from "@refinedev/antd";

const { Text } = Typography;

/**
 * This field lets you show basic text. It uses Ant Design's {@link https://ant.design/components/typography/#Typography.Text `<Typography.Text>`} component.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/text} for more details.
 */
export const TextField: React.FC<TextFieldProps> = ({ value, ...rest }) => {
  return <Text {...rest}>{value}</Text>;
};
