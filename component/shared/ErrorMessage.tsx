import colors from "@/constants/colors";
import React from "react";
import { StyleSheet, TextProps } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const ErrorMessage = ({
  message,
  ...rest
}: { message?: string } & TextProps) => {
  if (!message) return null;
  return (
    <Animated.Text
      style={styles.errorMessage}
      entering={FadeIn}
      exiting={FadeOut}
      {...rest}
    >
      {message}
    </Animated.Text>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  errorMessage: { fontSize: 12, color: colors.error, marginTop: 10 },
});
