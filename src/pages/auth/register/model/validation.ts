export const usernameRules = {
    required: 'Введите никнейм',
    minLength: {value: 3, message: 'Минимум 3 символа'}
};

export const emailPattern = {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Некорректный email',
};

export const passwordRules = {
    validate: (value: string) => {
        if (value.length < 8) return 'Минимум 8 символов';
        if (!/(?=.*[A-Za-z])(?=.*\d)/.test(value)) {
            return 'Пароль должен содержать латиницу и цифры';
        }
        return true;
    }
};