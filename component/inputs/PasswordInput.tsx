import colors from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Pressable } from "react-native";
import { TBaseTextInput } from "./BaseTextInput";
import FormInput from "./FormInput";

interface IPasswordInput<T extends FieldValues> extends TBaseTextInput {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
}
const PasswordInput = <T extends FieldValues>({
  error,
  ...rest
}: IPasswordInput<T>) => {
  const [securePassword, setSecurePassword] = useState(true);

  const toggleSecurePassword = () => setSecurePassword((prev) => !prev);
  return (
    <FormInput
      IconLeft={
        <Feather
          name="lock"
          size={20}
          color={error ? colors.error : colors.borderDefault}
        />
      }
      IconRight={
        <Pressable hitSlop={20} onPress={toggleSecurePassword}>
          <Feather
            name={securePassword ? "eye" : "eye-off"}
            size={20}
            color={error ? colors.error : colors.borderDefault}
          />
        </Pressable>
      }
      label="Password"
      placeholder="Enter your password"
      secureTextEntry={securePassword}
      {...rest}
    />
  );
};

export default PasswordInput;
