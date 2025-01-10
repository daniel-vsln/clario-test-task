import "./Signup.css";
import EyeCrossIcon from "../assets/icons/eye-cross.svg";
import EyeIcon from "../assets/icons/eye.svg";
import { PropertyValidationState, useSignupFormState } from "./hooks";

const getClassByValidationState = (state: PropertyValidationState): string => {
  return state !== "initial" ? state : "";
};

export const Signup = () => {
  const { email, password, isPasswordVisible, handlers, validators } =
    useSignupFormState();
  const {
    onEmailChange,
    onPasswordChange,
    onFormSubmit,
    onPasswordVisibilityToggle,
  } = handlers;

  const PasswordVisibilityIcon = isPasswordVisible ? EyeIcon : EyeCrossIcon;
  const PasswordInputType = isPasswordVisible ? "text" : "password";

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
          onBlur={validators.email.validateErrors}
          placeholder="Email"
        />
        {validators.email.state === 'error' && <div className="email-error">
          <p>{validators.email.message}</p>
        </div>}
      </div>
      <div className="password-container">
        <input
          className={getClassByValidationState(validators.password.state)}
          type={PasswordInputType}
          value={password ?? ""}
          name="password"
          onChange={onPasswordChange}
          onBlur={validators.password.validateErrors}
          autoComplete="new-password"
          placeholder="Create your password"
        />
        <i className="eye-icon" onClick={onPasswordVisibilityToggle}>
          <img src={PasswordVisibilityIcon} />
        </i>
        <div className="password-requirements">
          {validators.password.requirements.map((r) => {
            const className = r.state !== "initial" ? r.state : "";
            return <p key={r.message} className={className}>{r.message}</p>;
          })}
        </div>
      </div>

      <button onClick={onFormSubmit}>Sign on</button>
    </section>
  );
};
