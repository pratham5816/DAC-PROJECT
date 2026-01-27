import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../css/LoginPasswordIcon.css";

function PasswordInput({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-3 password-wrapper">
      <label className="form-label">Password</label>

      <div className="password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control password-input"
          placeholder="Enter password"
          value={value}
          onChange={onChange}
        />

        <span
          className="password-toggle-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </div>
  );
}

export default PasswordInput;
