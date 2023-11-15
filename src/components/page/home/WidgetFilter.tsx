import { widgetFilter } from "@/constants";
import Image from "next/image";

function WidgetFilter() {
  return (
    <div className="p-2.5 rounded-2xl bg-white flex flex-col gap-2.5">
      {widgetFilter.map((item, index) => (
        <WidgetItem key={index} item={item}></WidgetItem>
      ))}
    </div>
  );
}
function WidgetItem({ item }: { item: (typeof widgetFilter)[0] }) {
  return (
    <div className="p-2 flex items-center gap-1.5 cursor-pointer hover:bg-secondary-color-6 rounded-md">
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-secondary-color-6 flex-shrink-0">
        <Image src={item.icon} width={20} height={20} alt="icon"></Image>
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="text-xs font-semibold">{item.title}</h3>
        <p className="text-[10px] text-secondary-color-3">{item.desc}</p>
      </div>
    </div>
  );
}

export default WidgetFilter;
