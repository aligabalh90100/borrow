import React from "react";

import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import images from "@/assets/images";
import { BaseButton } from "@/component/buttons";
import { EmailInput, PasswordInput } from "@/component/inputs";
import { ErrorMessage } from "@/component/shared";
import colors from "@/constants/colors";

import useLogin from "@/hooks/login/useLogin";

const LoginScreen = () => {
  const {
    bottom,
    control,
    errors,
    isValid,
    loginError,
    loginLoading,
    onSubmit,
  } = useLogin();
  return (
    <View style={styles.container}>
      {/* top section start */}
      <View style={styles.topSection}>
        <Text style={styles.topSectionHeader}>Borrow</Text>

        <Image
          source={images.dollars}
          style={styles.topSectionImage}
          contentFit="contain"
        />
        <View>
          <Text style={styles.topSectionText}>Smart borrowing,</Text>
          <Text style={{ color: colors.textWhite }}>better tomorrow.</Text>
        </View>
      </View>
      {/* top section end */}
      {/* bottom section start */}
      <KeyboardAwareScrollView
        style={styles.bottomSectionContainer}
        bottomOffset={60}
        contentContainerStyle={[
          styles.formContainer,
          { paddingBottom: bottom + 20 },
        ]}
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.bottomSectionHeader}>Welcome back</Text>
        <Text style={styles.bottomSectionSubHeader}>
          Login to you account to continue
        </Text>

        <EmailInput
          control={control}
          name="email"
          groupContainer={styles.emailInputStyles}
          error={errors.email?.message}
        />
        <PasswordInput
          control={control}
          name="password"
          error={errors.password?.message}
        />
        <ErrorMessage testID="error-message" message={loginError?.message} />
        <BaseButton
          style={styles.btnStyles}
          title="Login"
          disabled={!isValid || loginLoading}
          onPress={onSubmit}
          loading={loginLoading}
        />
      </KeyboardAwareScrollView>
      {/* bottom section end */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgPrimary },
  topSection: {
    height: "40%",
    alignItems: "center",
    padding: 20,
  },
  topSectionHeader: {
    marginTop: "auto",
    fontWeight: 900,
    fontSize: 35,
    color: colors.textWhite,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  topSectionImage: { width: 150, aspectRatio: 1 },
  topSectionText: { color: colors.textWhite },
  bottomSectionContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    flex: 1,
    backgroundColor: colors.bgScreen,
  },
  formContainer: {
    flexGrow: 1,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  bottomSectionHeader: { fontWeight: 600, fontSize: 20 },
  bottomSectionSubHeader: { color: colors.textSub },
  emailInputStyles: { marginTop: 20, marginBottom: 10 },
  btnStyles: { marginTop: "auto" },
});
export default LoginScreen;
