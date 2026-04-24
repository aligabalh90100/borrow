import Crypto from "@/assets/svg/crypto.svg";
import colors from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
const CustomCrypto = () => {
  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Crypto color={"white"} width={10} height={10} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  outer: {
    backgroundColor: colors.black,
    width: 20,
    aspectRatio: 1,
    borderRadius: 20,
    padding: 2,
  },
  inner: {
    backgroundColor: colors.black,
    width: "100%",
    aspectRatio: 1,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomCrypto;
