import React from "react";

const SocialIcon = ({
  url,
  icon,
  className,
}: {
  url: string;
  icon: React.ReactNode;
  className?: string;
}) => {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {icon}
    </a>
  );
};

export default SocialIcon;
