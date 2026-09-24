export type Permissions = {
    id: number;
    name: string;
}

export type UserRoles = {
    id: number;
    name: string; 
    permission: Permissions[];
}

export type Subscription = {
    id: number;
    name: string;
    code: string;
    isActive: boolean;
}

export type Subscriptions = {
    id: string;
    subscriptionId: number;
    userId: string;
    state: string;
    paymentAttemptsCount: number;
    createDate: string;
    subscription: Subscription;
}

export type CreatedBy = {
    id: string;
    username: string;
}

export type Specializations = {
    id: number,
    title: string,
    slug: string,
    description: string,
    imageSrc: string,
    createdAt: string,
    updatedAt: string,
    createdBy: CreatedBy;
}

export type ProfileSkills = {
    id: number;
    title: string;
    description: string;
    imageSrc: string,
    createdAt: string;
    updatedAt: string;
    specializations: Specializations[];
    createdBy: CreatedBy;
}

export type Profiles = {
    userId: string;
    id: string;
    profileType: number;
    specializationId: number,
    markingWeight: number,
    description: string;
    image_src: string;
    isActive: boolean;
    ratingPoints: number;
    profileSkills: ProfileSkills[];
}

export type ProfileResponse = {
    id: string;
    username: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    birthday: string;
    address: string;
    avatarUrl: string;
    updatedAt: string;
    createdAt: string;
    userRoles: UserRoles[];
    isVerified: boolean;
    isEmailNotificationsEnable: boolean;
    telegramUsername: string;
    subscriptions: Subscriptions[];
    profiles: Profiles[];
}