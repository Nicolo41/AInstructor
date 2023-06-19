import React, { FC, ReactNode } from "react";
import clsx from "clsx";
import Image from "next/image";

import background from "@assets/images/background.webp";

type BackgroundProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  rounded?: boolean;
};

const Shapes = () => {
  return (
    <Image
      src={background}
      alt={"background"}
      className={
        "absolute inset-0 w-full h-full pointer-events-none object-cover"
      }
    />
  );
};

const Background: FC<BackgroundProps> = (props) => {
  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden bg-tertiary-10",
        props.rounded && "rounded-3xl",
        props.className
      )}
    >
      <Shapes />
      <div
        className={clsx(
          "relative min-h-full h-full min-w-full",
          props.innerClassName
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Background;
