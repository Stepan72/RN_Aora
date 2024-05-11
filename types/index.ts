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

export interface TrendingProps {
  posts: VideoCardProps[];
}

export interface EmptyStateProps {
  title: string;
  subtitle: string;
}

export interface VideoCardProps {
  $id: string;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator: CreatorProps;
}

export interface CreatorProps {
  accountId: string;
  avatar: string;
  email: string;
  username: string;
}
