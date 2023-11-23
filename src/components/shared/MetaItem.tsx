import Image from "next/image";

interface MetaItemProps {
  icon: string;
  text: React.ReactNode;
}
const MetaItem = ({ icon, text }: MetaItemProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-secondary-color-3">
      <div className="w-6 h-6 rounded-md bg-secondary-color-bg-2 p-1 text-secondary-color-3">
        <Image alt="" src={icon} width={24} height={24} />
      </div>
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default MetaItem;
