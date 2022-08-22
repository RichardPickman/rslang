import { MIN_PASSWORD_LENGTH } from "../data/constants";

export const rules = {
  required: (message: string = 'Обязательное поле') => {
    return { required: true, message };
  },
  isEmailCorrect: () => {
    return { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: 'Неверный формат e-mail' }
  },
  isPasswordCorrect: () => {
    return { min: MIN_PASSWORD_LENGTH, message: 'Пароль должен содержать не менее 8 символов' }
  }
}