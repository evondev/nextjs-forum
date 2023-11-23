import React from "react";
interface ActionBarItemProps {
  icon: React.ReactNode;
  text: React.ReactNode;
}
const ActionBarItem = ({ icon, text }: ActionBarItemProps) => {
  return (
    <div className="flex items-center gap-4 text-sm text-secondary-color-3 font-medium">
      <div className="w-7 h-7 rounded-md p-1 bg-secondary-color-bg-2 text-secondary-color-3">
        {icon}
      </div>
      <div>{text}</div>
    </div>
  );
};

export default ActionBarItem;
