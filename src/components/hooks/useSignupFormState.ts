import { useCallback, useState } from "react";
import {
  PropertyValidator,
  RequirementsValidator,
  useEmailValidation,
  usePasswordValidation,
} from "./useValidation";

interface SignupFormState {
  email: string | null;
  password: string | null;
  isPasswordVisible: boolean;
  isFormSubmitted: boolean;
  handlers: SignupFormHandlers;
  validators: SignupFormValidators;
}

interface SignupFormHandlers {
  onEmailChange: React.ChangeEventHandler<HTMLInputElement>;
  onPasswordChange: React.ChangeEventHandler<HTMLInputElement>;
  onFormSubmit: React.MouseEventHandler<HTMLButtonElement>;
  onPasswordVisibilityToggle: () => void;
}

interface SignupFormValidators {
  email: PropertyValidator;
  password: RequirementsValidator;
}

export const useSignupFormState = (): SignupFormState => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const passwordValidator = usePasswordValidation();
  const emailValidator = useEmailValidation();

  const onEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.currentTarget.value);
    },
    []
  );

  const onPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      passwordValidator.validateRequirements(event);
      setPassword(event.currentTarget.value);
    },
    []
  );

  const onPasswordVisibilityToggle = useCallback(() => {
    setIsPasswordVisible((state) => !state);
  }, []);

  const onFormSubmit = useCallback(() => {
    setIsFormSubmitted(true);
  }, []);

  return {
    email,
    password,
    isPasswordVisible,
    isFormSubmitted,
    handlers: {
      onEmailChange,
      onPasswordChange,
      onFormSubmit,
      onPasswordVisibilityToggle,
    },
    validators: {
      password: {
        requirements: passwordValidator.requirements,
        state: passwordValidator.state,
        validateErrors: passwordValidator.validateErrors,
        validateRequirements: passwordValidator.validateRequirements,
      },
      email: {
        state: emailValidator.state,
        message: emailValidator.message,
        validateErrors: emailValidator.validateErrors,
      },
    },
  };
};
