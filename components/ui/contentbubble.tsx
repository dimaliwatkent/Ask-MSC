import React from "react";
import classNames from "classnames";

type ContentProps = {
  content: React.ReactNode;
  variant: "user" | "ai";
};

const bubbleStyle: string = "max-w-lg px-5 py-2 rounded-lg ";

const ContentBubble = ({ content, variant }: ContentProps) => {
  const containerClass = classNames({
    [`${bubbleStyle} bg-green-500 rounded-l-3xl rounded-tr-3xl self-end`]:
      variant === "user",
    [`${bubbleStyle} bg-red-500 rounded-r-3xl rounded-tl-3xl `]:
      variant === "ai",
  });

  return <div className={containerClass}>{content}</div>;
};

export default ContentBubble;
