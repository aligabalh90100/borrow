import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import BaseTextInput, { TBaseTextInput } from "./BaseTextInput";

interface IFormInput<T extends FieldValues> extends TBaseTextInput {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
}
const FormInput = <T extends FieldValues>({
  name,
  control,
  rules,
  ...rest
}: IFormInput<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => (
        <BaseTextInput
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          error={error?.message}
          {...rest}
        />
      )}
      rules={rules}
    />
  );
};

export default FormInput;
