import { BorrowCard, OffersSlider } from "@/component/screens/home";
import CreditCard from "@/component/screens/home/CreditCard";
import { Header } from "@/component/shared";
import colors from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.floatBg} />
      <Header
        title="Borrow"
        titleStyles={styles.headerTextStyles}
        headerRight={
          <Ionicons name="gift-outline" size={24} color={colors.textWhite} />
        }
        headerLeft={<DrawerToggleButton tintColor={colors.textWhite} />}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <BorrowCard />
        <OffersSlider />
        <CreditCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  floatBg: {
    position: "absolute",
    height: "40%",
    backgroundColor: colors.bgPrimary,
    width: "100%",
  },
  headerTextStyles: { textTransform: "uppercase" },
  scrollContent: { flexGrow: 1, gap: 20, paddingBottom: 20 },
});
export default HomeScreen;
