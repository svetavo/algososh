import React from "react";
import styles from "./input.module.css";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
  extraClass?: string;
  isLimitText?: boolean;
  max?: number | undefined;
  maxLength?: number | undefined;
}

export const Input: React.FC<InputProps> = ({
  placeholder = "Введите текст",
  extraClass = "",
  type = "text",
  maxLength,
  max,
  isLimitText = false,
  onChange,
  ...rest
}) => {
  const limitText = ({maxLength, max} : InputProps) => {
    if (type === "text" && maxLength! >= 5) {
      return `Максимум — ${maxLength} символов`;
    } else if (type === "text" && maxLength! < 5) {
      return `Максимум — ${maxLength} символа`;
    } else {
      return `Максимальное число — ${max}`;
    }
  };
  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input
        className={`${styles.input} text text_type_input text_color_input`}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        max={max}
        onChange={onChange}
        {...rest}
      />
      {isLimitText && (
        <span
          className={`text text_type_input-lim text_color_input mt-2 ml-8 ${styles.limit}`}
        >
          {limitText({maxLength, max})}
        </span>
      )}
    </div>
  );
};
