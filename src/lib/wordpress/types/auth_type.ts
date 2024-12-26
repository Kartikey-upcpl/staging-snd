// export type LoginPayload = {
//     username: string;
//     password: string;
// };

export type LoginPayload =
    | {
          username: string;
          password: string;
      }
    | {
          idToken: string;
          type: 'google';
      };




export type RegisterPayload = {
    agree_privacy_term: boolean;
    first_name: string;
    last_name: string;
    user_login: string;
    password: string;
    email: string;
};

export type UserType = {
    ID: string;
    user_login: string;
    user_pass: string;
    user_nicename: string;
    user_email: string;
    user_url: string;
    user_registered: string;
    user_activation_key: string;
    user_status: string;
    display_name: string;
    first_name: string;
    last_name: string;
    avatar_urls: {
        "24": string;
        "48": string;
        "96": string;
    };
    avatar: string;
    location: string;
    roles: string[];
    social_avatar: string;
    login_type: string;
    options: {
        hideAds: boolean;
    };
};

export type AuthResponse = {
    token: string;
    user: UserType;
};