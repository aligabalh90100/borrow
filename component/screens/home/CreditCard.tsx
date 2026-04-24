import images from "@/assets/images";
import Lenma from "@/assets/svg/lenma.svg";
import { Card } from "@/component/shared";
import colors from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
const CreditCard = () => {
  return (
    <Card shadow style={styles.container}>
      <View style={styles.topContainer}>
        <Lenma />
        <View style={styles.topContentContainer}>
          <View>
            <Text>Your Available Credit </Text>
            <Text style={styles.creditAmount}>$0,00</Text>
          </View>
          <Entypo name="chevron-right" size={20} color={colors.borderDefault} />
        </View>
      </View>
      <Card style={styles.gradientContainer}>
        <Image
          source={images.gameStick}
          style={styles.gameStickImage}
          contentFit="contain"
        />
        <View style={styles.gradientCardActionContainer}>
          <Text style={styles.gradientCardText}>
            Play game and earn credit to use as Lenme Cash
          </Text>
          <Pressable style={styles.gradientCTABtn}>
            <Text style={styles.gradientCtaText}>Earn Now</Text>
          </Pressable>
        </View>
      </Card>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: { marginHorizontal: 20, gap: 15 },
  topContainer: { flexDirection: "row", gap: 5 },
  topContentContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  creditAmount: { fontWeight: 600, fontFamily: "poppins", fontSize: 24 },
  gradientContainer: {
    experimental_backgroundImage:
      "linear-gradient(128.61deg, #7357F5 30.36%, #4A27E7 73.02%)",
    padding: 20,
  },
  gameStickImage: { width: 200, height: 100, marginHorizontal: "auto" },
  gradientCardActionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: -10,
  },
  gradientCardText: { flex: 1, color: colors.textWhite },
  gradientCTABtn: {
    backgroundColor: colors.gold,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  gradientCtaText: { fontWeight: 500, fontSize: 13 },
});

export default CreditCard;
