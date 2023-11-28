import Image from "next/image";

interface MetaItemProps {
  icon: React.ReactNode | string;
  text: React.ReactNode;
}
const MetaItem = ({ icon, text }: MetaItemProps) => {
  return (
    <div className="flex items-center gap-2 text-xs lg:text-sm text-secondary-color-3">
      <div className="flex-shrink-0">
        {typeof icon === "string" ? (
          <Image alt="" src={icon} width={24} height={24} />
        ) : (
          icon
        )}
      </div>
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default MetaItem;
