import colors from "@/constants/colors";
import secureStorage from "@/services/secureStorage";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const SplashScreen = () => {
  async function handleNavigationAfterSplash() {
    const userToken = await secureStorage.getItem("app_token");
    router.replace(userToken ? "/homeScreen" : "/loginScreen");
  }
  useEffect(() => {
    setTimeout(handleNavigationAfterSplash, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Borrow</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgPrimary,
  },
  logo: {
    fontSize: 50,
    color: colors.textWhite,
    fontWeight: 600,
    letterSpacing: 4,
  },
});
