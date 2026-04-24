import colors from "@/constants/colors";
import Fontisto from "@expo/vector-icons/Fontisto";
import React from "react";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { TBaseTextInput } from "./BaseTextInput";
import FormInput from "./FormInput";
interface IEmailInput<T extends FieldValues> extends TBaseTextInput {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
}
const EmailInput = <T extends FieldValues>({
  error,
  ...rest
}: IEmailInput<T>) => {
  return (
    <FormInput
      label="Email"
      placeholder="Enter your email"
      keyboardType="email-address"
      IconLeft={
        <Fontisto
          name="email"
          size={20}
          color={error ? colors.error : colors.borderDefault}
        />
      }
      {...rest}
    />
  );
};

export default EmailInput;
