import React from "react";

const UserMeta = ({
  icon,
  count,
  title,
}: {
  icon: React.ReactNode;
  count: number;
  title: string;
}) => {
  return (
    <div className="p-2 rounded-lg bg-gray-100 flex items-center gap-2">
      <div className="w-10 h-10 flex items-center justify-center bg-slate-200 rounded-lg">
        {icon}
      </div>
      <div>
        <h4 className="text-secondary-color-3">{title}</h4>
        <h5>{count}</h5>
      </div>
    </div>
  );
};

export default UserMeta;
