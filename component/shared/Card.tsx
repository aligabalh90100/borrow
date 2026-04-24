import colors from "@/constants/colors";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
interface ICard extends Omit<ViewProps, "style"> {
  style?: StyleProp<ViewStyle>;
  shadow?: boolean;
}
const Card = ({ style, shadow, ...rest }: ICard) => {
  return (
    <View style={[styles.card, shadow && styles.shadow, style]} {...rest} />
  );
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.bgCard,
  },
  shadow: { boxShadow: "0px 0px 6px rgba(0,0,0,0.2)" },
});

export default Card;
