import { BaseText, Card } from "@/component/shared";
import colors from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
const { width } = Dimensions.get("screen");
const CARD_WIDTH = width - 40;
const MOCK_OFFERS = [
  {
    id: 1,
    title: "New Offers!",
    text: "Check out out partner offerings, handpicked to help you save.",
  },
  {
    id: 2,
    title: "New Offers!",
    text: "Check out out partner offerings, handpicked to help you save.",
  },
  {
    id: 3,
    title: "New Offers!",
    text: "Check out out partner offerings, handpicked to help you save.",
  },
];
const OffersSlider = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      snapToAlignment="start"
      snapToInterval={CARD_WIDTH + 8}
      decelerationRate="fast"
      disableIntervalMomentum={true}
      overScrollMode="never"
    >
      {MOCK_OFFERS.map((offer) => (
        <Card key={offer.id} style={styles.offerCard}>
          <View style={styles.offerCardContent}>
            <Ionicons name="gift" size={25} />
            <Text style={styles.offerCardTitle}>
              {offer.title}{" "}
              <Text style={styles.offerCardText}>{offer.text}</Text>
            </Text>
          </View>
          <BaseText style={styles.offerCardLink}>Check out</BaseText>
        </Card>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  scrollContent: {
    gap: 8,
    paddingHorizontal: 20,
  },
  offerCard: {
    borderWidth: 1,
    borderColor: colors.borderDefault,
    width: CARD_WIDTH,
    gap: 8,
  },
  offerCardContent: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
  },
  offerCardTitle: { fontWeight: 600, flex: 1 },
  offerCardText: { fontWeight: 300, flex: 1, fontSize: 13 },
  offerCardLink: {
    textDecorationLine: "underline",
    color: colors.link,
    fontWeight: 500,
    alignSelf: "flex-end",
  },
});

export default OffersSlider;
