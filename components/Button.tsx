import React from "react";

const Button = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <button
      className="relative inline-flex h-10 sm:h-12 w-full md:w-48 overflow-hidden rounded-3xl p-[2px] focus:outline-none transform transition-all duration-300 ease-in-out hover:scale-105 border border-electricBlue/50 hover:border-electricBlue"
      onClick={handleClick}
    >
      <span className="absolute inset-0[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00FFFF_0%,#39FF14_50%,#00FFFF_100%)]" />
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-3xl
             bg-black px-5 text-sm font-medium text-electricBlue backdrop-blur-3xl gap-2 ${otherClasses}`}
      >
        {position === "left" && icon}
        <span className="font-extrabold text-white">
          {title}</span>
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default Button;
