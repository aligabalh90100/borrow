import React from "react";
import { ActivityIndicator } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

interface ILoading extends ViewProps {
  loading?: boolean;
}
const Loading = ({ loading = false, children }: ILoading) => {
  if (loading) return <ActivityIndicator size={"small"} color={"#fff"} />;
  return children;
};

export default Loading;
