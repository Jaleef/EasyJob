type UserIcon = {
  img_url: string;
  user_name: string;
  post_time: string;
}

export interface UserIconProps {
  user: UserIcon; 
}

export interface PostNaviBarProps {
  user: UserIcon;
  closeModal: () => void;
}

export interface PostItemType {
  post_id: string;
  title: string;
  user_name: string;
  post_time: string;
}

export interface PostHeadersResponse {
  status: boolean;
  data: {
    posts: PostItemType[];
  }
}

export interface UserProfile {
  account: string;
  user_name: string;
  email: string;
}

export interface ProfileResponse {
  status: boolean;
  data: UserProfile;
}

export interface PostType {
  title: string;
  user_name: string;
  post_time: string;
  content: string;
}

export interface PostResponse {
  status: boolean;
  data: PostType;
}
