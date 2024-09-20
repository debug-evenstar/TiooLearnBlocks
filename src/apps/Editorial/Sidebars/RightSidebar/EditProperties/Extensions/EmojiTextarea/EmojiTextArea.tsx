import React, { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import "../../../../../Components/Text/EmojiTextArea.css";

interface EmojiTextAreaProps {
  value: string;
  defaultValue: string;
  onChange: (value: string) => void;
}

const EmojiTextArea: React.FC<EmojiTextAreaProps> = ({
  value,
  onChange,
  defaultValue,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange(event.target.value); // Access the updated value from the event object
  };

  const handleEmojiClick = (emoji: EmojiClickData, e: MouseEvent) => {
    onChange(`${value}${emoji.emoji}`); // Insert emoji into the text area
  };

  return (
    <div className="w-full relative">
      <textarea
        value={value}
        className="w-full border border-black rounded p-2 text-[13px]"
        placeholder="Input Feedback"
        rows={5}
        defaultValue={defaultValue}
        onChange={handleTextAreaChange}
      />
      <button
        type="button"
        className="absolute top-0 right-0 m-1 text-white focus:ring-4 focus:outline-none"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="16" fill="white" />
          <rect
            x="0.25"
            y="0.25"
            width="31.5"
            height="31.5"
            rx="15.75"
            stroke="black"
            stroke-opacity="0.05"
            stroke-width="0.5"
          />
          <path
            d="M19.0006 15.1428C19.3416 15.1428 19.6686 15.0073 19.9097 14.7662C20.1508 14.5251 20.2863 14.1981 20.2863 13.8571C20.2863 13.5161 20.1508 13.1891 19.9097 12.948C19.6686 12.7068 19.3416 12.5714 19.0006 12.5714C18.6596 12.5714 18.3325 12.7068 18.0914 12.948C17.8503 13.1891 17.7148 13.5161 17.7148 13.8571C17.7148 14.1981 17.8503 14.5251 18.0914 14.7662C18.3325 15.0073 18.6596 15.1428 19.0006 15.1428ZM14.2863 13.8571C14.2863 14.1981 14.1508 14.5251 13.9097 14.7662C13.6686 15.0073 13.3416 15.1428 13.0006 15.1428C12.6596 15.1428 12.3325 15.0073 12.0914 14.7662C11.8503 14.5251 11.7148 14.1981 11.7148 13.8571C11.7148 13.5161 11.8503 13.1891 12.0914 12.948C12.3325 12.7068 12.6596 12.5714 13.0006 12.5714C13.3416 12.5714 13.6686 12.7068 13.9097 12.948C14.1508 13.1891 14.2863 13.5161 14.2863 13.8571ZM11.1388 18.6828C11.2793 18.5872 11.452 18.5511 11.6191 18.5824C11.7861 18.6137 11.934 18.7099 12.0303 18.8499L12.038 18.8602L12.0757 18.9108C12.1117 18.9571 12.17 19.0274 12.2497 19.1148C12.41 19.2888 12.6543 19.5262 12.9851 19.7637C13.6434 20.2377 14.6394 20.7142 16.0006 20.7142C17.3617 20.7142 18.3577 20.2377 19.016 19.7637C19.3468 19.5262 19.592 19.2888 19.7514 19.1148C19.8263 19.0334 19.8972 18.9484 19.964 18.8602L19.97 18.8517C20.066 18.7107 20.2141 18.6137 20.3817 18.582C20.5493 18.5502 20.7226 18.5863 20.8636 18.6824C21.0045 18.7784 21.1015 18.9265 21.1333 19.0941C21.165 19.2617 21.1289 19.435 21.0328 19.5759L21.0311 19.5768V19.5785L21.0286 19.5811L21.0226 19.5897L21.0037 19.6162C20.9085 19.7436 20.807 19.866 20.6994 19.9831C20.4174 20.2889 20.1049 20.5652 19.7668 20.8077C18.9354 21.4051 17.6823 21.9999 16.0006 21.9999C14.3188 21.9999 13.0657 21.4051 12.2343 20.8077C11.8962 20.5652 11.5837 20.2889 11.3017 19.9831C11.1873 19.8581 11.0797 19.7271 10.9794 19.5905L10.9726 19.5819L10.9708 19.5785L10.97 19.5768L10.9691 19.5759C10.8732 19.435 10.8372 19.2617 10.869 19.0942C10.9008 18.9267 10.9979 18.7787 11.1388 18.6828ZM16.0006 5.71423C10.3203 5.71423 5.71484 10.3197 5.71484 15.9999C5.71484 21.6802 10.3203 26.2857 16.0006 26.2857C21.6808 26.2857 26.2863 21.6802 26.2863 15.9999C26.2863 10.3197 21.6808 5.71423 16.0006 5.71423ZM7.00056 15.9999C7.00056 11.0294 11.03 6.99995 16.0006 6.99995C20.9711 6.99995 25.0006 11.0294 25.0006 15.9999C25.0006 20.9705 20.9711 24.9999 16.0006 24.9999C11.03 24.9999 7.00056 20.9705 7.00056 15.9999Z"
            fill="#87909E"
          />
        </svg>
      </button>

      {showEmojiPicker && (
        <EmojiPicker
          className="text-[12px]"
          height={300}
          width="100%"
          onEmojiClick={handleEmojiClick}
        />
      )}
    </div>
  );
};

export default EmojiTextArea;
