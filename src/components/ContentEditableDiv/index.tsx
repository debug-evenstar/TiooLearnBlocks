import React, { useRef, useEffect, useState } from "react";

interface ContentEditableDivProps {
  divRef: React.RefObject<HTMLDivElement>;
  className?: string;
  html: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLDivElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
}

const ContentEditableDiv: React.FC<ContentEditableDivProps> = ({
  className = "",
  html,
  disabled = false,
  onChange,
  onFocus,
  divRef,
}) => {
  useEffect(() => {
    // Focus on mount with a slight delay to potentially avoid first keystroke issue
    setTimeout(() => {
      if (divRef.current && !disabled) {
        divRef.current.focus();
      }
    }, 10);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    if (!divRef.current?.textContent) return;
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div
      className={className}
      ref={divRef}
      contentEditable={disabled}
      dangerouslySetInnerHTML={{ __html: html }}
      onInput={handleChange}
      onBlur={handleChange}
      onFocus={onFocus}
    />
  );
};

export default ContentEditableDiv;
