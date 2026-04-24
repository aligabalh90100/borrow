import colors from "@/constants/colors";
import { logout } from "@/services/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
function CustomDrawerContent(props: any) {
  const handleLogout = async () => {
    await logout();
    router.replace("/loginScreen");
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />

      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        icon={({ size }) => (
          <Ionicons name="log-out-outline" size={size} color={colors.error} />
        )}
        labelStyle={{ color: colors.error }}
        style={{ marginBottom: 20, marginTop: "auto" }}
      />
    </DrawerContentScrollView>
  );
}
const DrawerLayout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "",
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="(tabs)" options={{ title: "Home" }} />
    </Drawer>
  );
};

export default DrawerLayout;
