import "./Signup.css";
import EyeCrossIcon from "../../assets/icons/eye-cross.svg?react";
import EyeIcon from "../../assets/icons/eye.svg?react";
import { PropertyValidationState } from "../../types";
import { useSignupFormState } from "./hooks";

const getClassByValidationState = (state: PropertyValidationState): string => {
  return state !== "initial" ? state : "";
};

export const Signup = () => {
  const {
    email,
    password,
    isPasswordVisible,
    handlers,
    validators,
    isFormSubmitted,
  } = useSignupFormState();
  const {
    onEmailChange,
    onPasswordChange,
    onEmailBlur,
    onPasswordBlur,
    onFormSubmit,
    onPasswordVisibilityToggle,
  } = handlers;

  const PasswordVisibilityIcon = isPasswordVisible ? EyeIcon : EyeCrossIcon;
  const PasswordInputType = isPasswordVisible ? "text" : "password";

  if (isFormSubmitted) {
    return <FormSummittedScreen />;
  }

  return (
    <section className="signup-form">
      <h1>Sign up</h1>

      <div className="email-container">
        <input
          className={getClassByValidationState(validators.email.state)}
          type="email"
          value={email ?? ""}
          name="email"
          onChange={onEmailChange}
          onBlur={onEmailBlur}
          placeholder="Enter your email"
        />
        {validators.email.state === "error" && (
          <div className="email-error">
            <p>{validators.email.message}</p>
          </div>
        )}
      </div>
      <div className="password-container">
        <input
          className={getClassByValidationState(validators.password.state)}
          type={PasswordInputType}
          value={password ?? ""}
          name="password"
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
          autoComplete="new-password"
          placeholder="Create your password"
        />
        <i className="eye-icon" onClick={onPasswordVisibilityToggle}>
          <PasswordVisibilityIcon />
        </i>
        <div className="password-requirements">
          {validators.password.requirements.map((r) => {
            const className = r.state !== "initial" ? r.state : "";
            return (
              <p key={r.message} className={className}>
                {r.message}
              </p>
            );
          })}
        </div>
      </div>
      <button onClick={onFormSubmit} className="signup-button">
        Sign up
      </button>
    </section>
  );
};

const FormSummittedScreen = () => {
  return (
    <div className="success-signup">
      <h3>Your account is created</h3>
      <img src="https://i.pinimg.com/originals/28/51/9d/28519d3cd311485e03f7e57acf5ef98d.gif" />
    </div>
  );
};
