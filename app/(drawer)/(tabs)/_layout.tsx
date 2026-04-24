import Bill from "@/assets/svg/bill.svg";
import Home from "@/assets/svg/home.svg";
import Money from "@/assets/svg/money.svg";
import Note from "@/assets/svg/note.svg";
import colors from "@/constants/colors";
import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.activeIcon,
        tabBarInactiveTintColor: colors.defaultIcon,

        sceneStyle: { backgroundColor: colors.bgGray },
      }}
    >
      <Tabs.Screen
        name="homeScreen"
        options={{
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="screenTwo"
        options={{ tabBarIcon: ({ color }) => <Note color={color} /> }}
      />
      <Tabs.Screen
        name="screenThree"
        options={{ tabBarIcon: ({ color }) => <Money color={color} /> }}
      />
      <Tabs.Screen
        name="screenFour"
        options={{ tabBarIcon: ({ color }) => <Bill color={color} /> }}
      />
    </Tabs>
  );
};

export default TabLayout;
