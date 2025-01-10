export type PropertyValidationState = "valid" | "error" | "initial";

export interface Validation {
  message?: string;
  state: PropertyValidationState;
}

export interface PropertyValidationRequirement {
  pattern: RegExp;
  message: string;
}

export interface PropertyValidator {
  state: PropertyValidationState;
  validateErrors: (value: string) => void;
  message?: string;
}

export interface RequirementsValidator extends PropertyValidator {
  requirements: Validation[];
  validateRequirements: (value: string) => void;
}
