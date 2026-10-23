export type Permissions = {
    id: number;
    name: string;
}

export type UserRoles = {
    id: number;
    name: string; 
    permissions: Permissions[];
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

export type Specialization = {
    id: number,
    title: string,
    slug: string,
    description: string,
    imageSrc: string,
    createdAt: string,
    updatedAt: string,
    createdBy: CreatedBy;
}

export type ProfileSkill = {
    id: number;
    title: string;
    description: string;
    imageSrc: string,
    createdAt: string;
    updatedAt: string;
    specializations: Specialization[];
    createdBy: CreatedBy;
}

export type Profile = {
    userId: string;
    id: string;
    profileType: number;
    specializationId: number,
    markingWeight: number,
    description: string;
    image_src: string;
    isActive: boolean;
    ratingPoints: number;
    profileSkills: ProfileSkill[];
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
    profiles: Profile[];
}

export type UpdateUserRequest = {
    username?: string;
    phone?: string;
    country?: string;
    city?: string;
    birthday?: string;
    address?: string;
    avatarUrl?: string;
    avatarImage?: string;
}

export type SocialNetwork = {
    code: string;
    title: string;
}

export type UpdateProfileRequest = {
    userId?: string;
    description?: string;
    socialNetwork?: SocialNetwork[];
    profileSkills?: number[];
}

export type UserResponse = {
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
}

export type SpecializationResponse = {
    total: number;
    page: number;
    limit: number;
    data: Specialization[];
}

export type Skill = {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    specializations: Specialization[];
}

export type SkillsResponse = {
    total: number;
    page: number;
    limit: number;
    data: Skill[];
}