import React, { MouseEvent } from "react";

export default function Overlay({
  close,
  children,
}: {
  close: () => void;
  children: React.ReactNode;
}) {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    close(); 
  };

  const handleChildClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent clicks inside the child container from propagating to the overlay
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="inset-0 fixed bg-gray-800/10 z-[1000] w-full flex items-center justify-center"
    >
      <div className="z-[1001]" onClick={handleChildClick}>
        {children}
      </div>
    </div>
  );
}
