import Image from "next/image";
import DeviceTable from "./table";

export type Device = {
  slug: string;
  title: string;
  author: string;
  authorUrl: string;
  image: string;
  description: string;
  tags: string[];
  liveVersion: string;
  maxVersion: string;
  dateAdded: Date;
  lastUpdated?: Date;
  rating?: string;
  type: string; // enum? midi_device
  downloads?: number;
  downloadUrl?: string;
  url?: string;
  license: string;
};

const data: Device[] = require("./data");

export default function Device({ params }: { params: { slug: string } }) {
  const slug = decodeURI(params.slug);
  const device = data.find(
    (device) => device.slug.toLowerCase() === slug.toLowerCase()
  );
  return device ? (
    <>
      <div className="max-w-screen-sm p-10">
      <div className="flex flex-col">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {device.title}
        </h1>
        <h2>
          by{" "}
          <a
            href={`${device.authorUrl}`}
            className="font-medium text-primary underline underline-offset-4"
          >
            {device.author}
          </a>
        </h2>
        <p style={{ whiteSpace: "preserve-breaks" }}>{device.description}</p>
      </div>
      <div>
        <div className="my-6 w-full overflow-y-auto">
          <DeviceTable
            title="Device Details"
            rows={{
              Tags: device.tags.join(","),
              "Max Version Used": device.maxVersion,
              "Date Added": new Date(device.dateAdded).toISOString(),
              "Date Last Updated": device.lastUpdated
                ? new Date(device.lastUpdated).toISOString()
                : "Not updated yet",
              "Average Rating": device.rating ?? 'n/a',
              "Download URL": device.downloadUrl ?? '',
              License: device.license
            }}
          />
        </div>
      </div>
    </div>
      <div className="max-w-screen-sm p-10">
        <div className="overflow-hidden rounded-md max-w-lg p-5 self-center justify-center">
          <Image
            src={device.image}
            alt="device image"
            width={400}
            height={100}
            className="h-auto w-auto object-cover portrait"
          />
        </div>
      </div>
    </>
  ) : "";
}
