import { useCallback, useState } from "react";
import {
  PropertyValidationRequirement,
  PropertyValidator,
  RequirementsValidator,
  Validation,
} from "../../../types";

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

export const useEmailValidation = (): PropertyValidator => {
  const [validation, updateValidation] = useState<Validation>({
    state: "initial",
    message: "Invalid email address",
  });

  const validateErrors = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const isValid = EMAIL_REGEX.test(value);
    updateValidation((prev) => ({
      ...prev,
      state: isValid ? "valid" : "error",
    }));
  };

  return {
    state: validation.state,
    validateErrors,
    message: "Invalid email address",
  };
};

const PASSWORD_REQUIREMENTS: PropertyValidationRequirement[] = [
  {
    pattern: /^\S{8,}$/,
    message: "8 characters or more (no spaces)",
  },
  {
    pattern: /[a-z].*[A-Z]|[A-Z].*[a-z]/,
    message: "Uppercase and lowercase letters",
  },
  {
    pattern: /\d/,
    message: "At least one digit",
  },
];

export const usePasswordValidation = (): RequirementsValidator => {
  const [validation, updateValidation] = useState<Validation>({
    state: "initial",
  });
  const [requirementsState, updateRequirementsState] = useState<Validation[]>(
    PASSWORD_REQUIREMENTS.map(({ message }) => ({ state: "initial", message }))
  );

  const validateRequirements = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;

      const validations: Validation[] = [];
      PASSWORD_REQUIREMENTS.forEach(({ pattern, message }) => {
        const isValid = pattern.test(value);

        validations.push({
          message,
          state: isValid ? "valid" : "initial",
        });
      });

      updateRequirementsState(validations);
    },
    []
  );

  const validateErrors = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;

      let noErrors = true;
      const validations: Validation[] = [];

      PASSWORD_REQUIREMENTS.forEach(({ pattern, message }) => {
        const isValid = pattern.test(value);

        noErrors &&= isValid;

        validations.push({
          message,
          state: isValid ? "valid" : "error",
        });
      });

      updateValidation({ state: noErrors ? "valid" : "error" });
      updateRequirementsState(validations);
    },
    []
  );

  return {
    state: validation.state,
    validateRequirements,
    validateErrors,
    requirements: requirementsState,
  };
};
