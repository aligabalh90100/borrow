import colors from "@/constants/colors";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { Loading } from "../loading";

interface IBaseButton extends Omit<PressableProps, "style"> {
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  title?: string;
}
const BaseButton = ({
  title,
  loading,
  style,
  children,
  ...rest
}: IBaseButton) => {
  return (
    <Pressable
      style={[styles.container, rest.disabled && styles.disabledBtn, style]}
      {...rest}
    >
      {title ? (
        <Loading loading={loading}>
          <Text style={styles.btnTitle}>{title}</Text>
        </Loading>
      ) : loading ? (
        <ActivityIndicator size={"small"} />
      ) : (
        children
      )}
    </Pressable>
  );
};

export default BaseButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgPrimary,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 10,
  },
  btnTitle: { color: colors.textWhite, fontWeight: 500, fontSize: 15 },
  disabledBtn: {
    backgroundColor: colors.bgPrimary + "a2",
  },
});
