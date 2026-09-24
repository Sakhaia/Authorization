export type LoginRequest = {
    username: string;
    password: string;
}

export type Permissions = {
    id: number;
    name: string;
}

export type UserRoles = {
    id: number;
    name: string; 
    permission: Permissions[];
}

export type User = {
    id: string;
    username: string;
    email: string;
    userRoles: UserRoles[];
    isVerified: boolean;
    isEmailNotificationsEnable: boolean;
}

export type LoginResponse = {
    access_token: string;
    user: User;
}

export type RegisterRequest = {
    username: string,
    password: string,
    email: string,
}

export type SendResetPasswordResponse = {
    message: string;
}

