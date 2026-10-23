export type SocialNetwork = {
    code: string;
    title: string;
}

export type EditProfileFormValues = {
    username: string;
    country: string;
    city: string;
    birthday: string;
    address: string;
    avatarUrl: string;
    description: string;
    profileSkills: number[] | null;
    socialNetwork: SocialNetwork[];

    image: string | null;

    specializationId: number | null;
}