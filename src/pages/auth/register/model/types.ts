import type {useRegisterForm} from './useRegisterForm';

export type UseRegisterFormReturn = ReturnType<typeof useRegisterForm>;

export type RegisterFormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToDataProcessing: boolean;   
    agreeToTerms: boolean;             
    agreeToMarketing: boolean;
}