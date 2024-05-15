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

export type SearchInputProps = {
  initialQuery?: string | string[];
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

export interface TrendingItemProps extends VideoCardProps {
  activeItemId: string;
}

export interface UserProps {
  $collectionId: string;
  $createdAt: Date;
  $databaseId: string;
  $id: string;
  accountId: string;
  avatar: string;
  email: string;
  username: string;
}

export interface InfoBoxProps {
  title: string;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
}
