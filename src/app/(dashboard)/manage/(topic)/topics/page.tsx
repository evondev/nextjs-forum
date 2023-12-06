import HeadingDashboard from "@/components/shared/HeadingDashboard";
import { CreateTopicParams } from "@/lib/actions/shared.types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<CreateTopicParams[]> {
  // Fetch data from your API here.
  return [
    {
      name: "Gaming",
      value: "gaming",
      icon: "gaming",
      desc: "Gaming topic",
    },
    // ...
  ];
}

export default async function ManageTopicPage() {
  const data = await getData();

  return (
    <div>
      <HeadingDashboard>Topics</HeadingDashboard>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
