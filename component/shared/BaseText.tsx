import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

interface IBaseText extends Omit<TextProps, "style"> {
  style?: StyleProp<TextStyle>;
}
const BaseText = ({ style, ...rest }: IBaseText) => {
  return (
    <Text
      style={[{ fontFamily: "poppins" }, style]}
      allowFontScaling={false}
      {...rest}
    />
  );
};

export default BaseText;
