import colors from "@/constants/colors";
import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export interface TBaseTextInput extends TextInputProps {
  label?: string;
  containerStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  groupContainer?: StyleProp<ViewStyle>;
  IconRight?: ReactNode;
  IconLeft?: ReactNode;
  error?: string;
}
const BaseTextInput = ({
  IconLeft,
  IconRight,
  containerStyles,
  groupContainer,
  inputStyles,
  label,

  error,
  ...rest
}: TBaseTextInput) => {
  return (
    <View style={[styles.container, groupContainer]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[styles.inputContainer, error && styles.error, containerStyles]}
      >
        {IconLeft && IconLeft}
        <TextInput
          autoCapitalize="none"
          placeholderTextColor={colors.textSub}
          style={[styles.input, inputStyles]}
          {...rest}
        />
        {IconRight && IconRight}
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { gap: 4 },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: 10,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    gap: 4,
  },
  input: { flex: 1, color: colors.textMain },
  label: { color: colors.textMain, fontSize: 14, fontWeight: 500 },
  error: { borderColor: colors.error },
  errorMessage: { fontSize: 12, color: colors.error },
});
export default BaseTextInput;
