import { useCallback, useState } from "react";
import { useEmailValidation, usePasswordValidation } from "./useValidation";
import { PropertyValidator, RequirementsValidator } from "../../../types";

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
  onEmailBlur: React.FocusEventHandler<HTMLInputElement>;
  onPasswordBlur: React.FocusEventHandler<HTMLInputElement>;
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
      const value = event.currentTarget.value;
      passwordValidator.validateRequirements(value);
      setPassword(value);
    },
    [passwordValidator]
  );

  const onEmailBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      emailValidator.validateErrors(event.target.value);
    },
    [emailValidator]
  );

  const onPasswordBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      passwordValidator.validateErrors(event.target.value);
    },
    [passwordValidator]
  );

  const onPasswordVisibilityToggle = useCallback(() => {
    setIsPasswordVisible((state) => !state);
  }, []);

  const onFormSubmit = useCallback(() => {
    const isEmailValid = emailValidator.state === "valid";
    const isPasswordValid = passwordValidator.state === "valid";

    if (!isEmailValid) {
      emailValidator.validateErrors(email ?? "");
    }
    if (!isPasswordValid) {
      passwordValidator.validateErrors(password ?? "");
    }

    isPasswordValid && isEmailValid && setIsFormSubmitted(true);
  }, [emailValidator, passwordValidator, email, password]);

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
      onEmailBlur,
      onPasswordBlur,
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
