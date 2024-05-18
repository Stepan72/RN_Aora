import { ImageSourcePropType, TextInputProps } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { ImagePickerAsset } from "expo-image-picker";

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
  placeholder?: string;
};

export interface TrendingProps {
  posts: VideoCardProps[];
}

export interface EmptyStateProps {
  title: string;
  subtitle: string;
  customButtonTitle?: string;
  customButtonHandler?: () => void;
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
  title?: string;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
}

export interface GlobalContextProps {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: UserProps | null;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<UserProps | null>>;
}

export interface GlobalProviderProps {
  children: React.ReactNode;
}

export interface CreateFormStateProps {
  title: string;
  video: ImagePickerAsset | null;
  thumbnail: ImagePickerAsset | null;
  prompt: string;
}
