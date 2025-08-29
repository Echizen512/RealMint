import React, { ReactNode } from "react";
import RotatingText from "./ui/RotatingText";
import { cn } from "~~/utils/cn";

type ButtonAnimateTextProps = {
  icon: ReactNode;
  texts: string[];
  buttonStyles?: string;
  onClickFunction: () => void;
};

export const ButtonAnimateText = ({ icon, texts, buttonStyles, onClickFunction }: ButtonAnimateTextProps) => {
  return (
    <button className={cn("btn btn-primary max-w-md", buttonStyles)} onClick={onClickFunction}>
      {icon}
      <RotatingText
        texts={texts}
        mainClassName="text-base overflow-hidden justify-center rounded-lg"
        staggerFrom={"last"}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={4000}
      />
    </button>
  );
};
