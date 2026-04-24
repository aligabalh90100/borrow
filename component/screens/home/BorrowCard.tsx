import CustomCrypto from "@/assets/svg/CustomCrypto";
import { ArcSlider, Card } from "@/component/shared";
import colors from "@/constants/colors";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
const BorrowCard = () => {
  const [hasCrypto, setHasCrypto] = useState(false);

  const handleToggleCrypto = () => setHasCrypto((prev) => !prev);
  return (
    <Card shadow style={styles.container}>
      <Text style={styles.cardHeader}>How much would you like to borrow?</Text>
      {/* crypto  */}
      <Card style={styles.cryptoSection}>
        <View style={styles.cryptoSectionLeft}>
          <View style={styles.cryptoSectionHeaderContainer}>
            {/*crypto icon  */}
            <CustomCrypto />
            {/* crypto icon */}
            <Text style={styles.cryptoSectionHeader}>Do you own crypto?</Text>
          </View>
          <Text style={styles.cryptoSectionText}>
            Increase your limit up to $10,000
          </Text>
        </View>
        <Switch
          style={styles.switch}
          value={hasCrypto}
          onChange={handleToggleCrypto}
        />
      </Card>
      {/* crypto  */}
      <ArcSlider
        min={50}
        max={hasCrypto ? 10000 : 5000}
        step={10}
        hasCrypto={hasCrypto}
        initialValue={50}
        onValueChange={(val) => console.log(val)}
      />
    </Card>
  );
};

export default BorrowCard;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    paddingTop: 20,
  },
  cardHeader: { fontWeight: 500 },
  cryptoSection: {
    backgroundColor: colors.grayLight,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cryptoSectionLeft: { gap: 4 },
  cryptoSectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cryptoSectionHeader: {
    fontWeight: 600,
    fontSize: 14,
    color: colors.darkGray,
  },
  cryptoSectionText: { fontSize: 13, color: colors.darkGray },
  switch: { marginVertical: "auto" },
});
