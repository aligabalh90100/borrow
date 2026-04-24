import colors from "@/constants/colors";
import { PropsWithChildren, ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface IHeaderProps extends PropsWithChildren {
  title?: string;
  headerStyles?: StyleProp<ViewStyle>;
  titleStyles?: StyleProp<TextStyle>;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
}
const Header = ({
  title,
  headerStyles,
  titleStyles,
  headerLeft,
  headerRight,
}: IHeaderProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: top,
          paddingBottom: 10,
        },
        headerStyles,
      ]}
    >
      <View style={[styles.headerContainer]}>
        {headerRight && (
          <View style={{ position: "absolute", right: 20 }}>{headerRight}</View>
        )}
        {headerLeft && (
          <View style={{ position: "absolute", left: 20 }}>{headerLeft}</View>
        )}
        {title && <Text style={[styles.headerText, titleStyles]}>{title}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyles: {
    left: 10,
    position: "absolute",
    height: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  headerText: {
    fontWeight: 600,
    fontSize: 16,
    color: colors.textWhite,
    zIndex: 10,
  },
});

export default Header;
