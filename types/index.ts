import { ImageSourcePropType, TextInputProps } from "react-native";

export interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

export interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

export type FormFieldProps = TextInputProps & {
  title: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
};
