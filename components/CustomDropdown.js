"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./CustomDropdown.module.css";

export default function CustomDropdown({
  options = [],
  value,
  onChange,
  icon = "tune",
  placeholder = "Select option...",
  ariaLabel,
  disabled = false,
  className = "",
  align = "right", // "left" | "right"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    if (disabled) return;
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdownContainer} ${className} ${
        disabled ? styles.disabled : ""
      }`}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`${styles.triggerButton} ${
          isOpen ? styles.triggerButtonActive : ""
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || placeholder}
        disabled={disabled}
      >
        <div className={styles.triggerLeft}>
          {icon && (
            <span className={`material-symbols-outlined ${styles.leadingIcon}`}>
              {icon}
            </span>
          )}
          <span className={styles.selectedLabel}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <span
          className={`material-symbols-outlined ${styles.chevron} ${
            isOpen ? styles.chevronOpen : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div
          className={styles.menuPopover}
          style={{ [align === "left" ? "left" : "right"]: 0, [align === "left" ? "right" : "left"]: "auto" }}
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => handleSelect(option.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(option.value);
                  }
                }}
                className={`${styles.menuOption} ${
                  isSelected ? styles.menuOptionSelected : ""
                }`}
              >
                <div className={styles.optionContent}>
                  {option.icon && (
                    <span className={`material-symbols-outlined ${styles.optionIcon}`}>
                      {option.icon}
                    </span>
                  )}
                  <span>{option.label}</span>
                </div>
                {isSelected && (
                  <span className={`material-symbols-outlined ${styles.checkIcon}`}>
                    check
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

