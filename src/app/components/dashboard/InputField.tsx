import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // or any eye icon you want

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, Icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative mt-6 mb-4">
      {/* Left icon */}
      <Icon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />

      {/* Input field */}
      <input
        id={name}
        name={name}
        type={inputType}
        placeholder={label}
        className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />

      {/* Eye toggle icon */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

export default InputField;
