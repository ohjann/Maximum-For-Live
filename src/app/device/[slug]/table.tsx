import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type DeviceTableProps = {
  title: string;
  rows: Record<string, string>;
};
const DeviceTable = (props: DeviceTableProps) => {
  const { rows, title } = props;
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Object.entries(rows).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{key}</p>
              </div>
              <div className="ml-auto font-medium">{value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceTable;
