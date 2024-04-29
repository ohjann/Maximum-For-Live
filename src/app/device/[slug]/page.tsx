import Image from "next/image";
import DeviceTable from "./table";

type Device = {
  title: string;
  author: string;
  authorUrl: string;
  image: string;
  description: string;
  tags: string[];
  liveVersion: number;
  maxVersion: string;
  dateAdded: Date;
  lastUpdated?: Date;
  rating?: string;
  type: string; // enum? midi_device
  downloadUrl: string;
  license: string;
};

const data: Device[] = [
  {
    title: "MacroMod 1.0 by Tabula",
    author: "Tabula",
    authorUrl: "https://maxforlive.com/profile/user/Tabula",
    image:
      "https://maxforlive.com/images/screenshots/?ss=Capture%20d%E2%80%99e%CC%81cran%202024-04-29%20a%CC%80%2015.35.58.jpg&id=10336",
    description: `A super simple device.

It's a alternate version of :
https://maxforlive.com/library/device/10291/remote2mod
Thanks to finleguin

It's a shame that Live 12 hasn't implemented its new modulation system for macros yet. I've attempted to address this shortfall.

With this device and a workaround, you can stay in control of a parameter even after it’s been mapped to a macro knob !

This is very useful if you want to change presets without assigning the macro's value changes to it.

You can use the "Mod" function, and the potentiometer will range from -100% to 100%. This way, 0% corresponds to the original parameter value. The remote function is also there for a more traditional mapping.

In a rack, mapping the potentiometer to a macro allows you to use variations without altering the preset's original parameters, and you can still adjust the parameters within the original device.

I've included 8 and 16 knobs versions

Ableton 12 compatible`,
    tags: ["utility", "push"],
    liveVersion: 12,
    maxVersion: "8.1.5",
    dateAdded: new Date("Apr 29 2024 15:11:32"),
    type: "midi_device",
    downloadUrl: "https://subtabula.gumroad.com/l/MacroMod",
    license: "None"
  }
];

export default function Device({ params }: { params: { slug: string } }) {
  const slug = decodeURI(params.slug);
  const device = data.find(
    ({ title }) => title.toLowerCase() === slug.toLowerCase()
  );
  return device ? (
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
        <div className="overflow-hidden rounded-md max-w-lg p-5 self-center justify-center">
          <Image
            src={device.image}
            alt="device image"
            width={400}
            height={100}
            className="h-auto w-auto object-cover portrait"
          />
        </div>
        <p>{device.description}</p>
      </div>
      <div>
        <div className="my-6 w-full overflow-y-auto">
          <DeviceTable
            title="Device Details"
            rows={{
              Tags: device.tags.join(","),
              "Max Version Used": device.maxVersion,
              "Date Added": device.dateAdded.toISOString(),
              "Date Last Updated": device.lastUpdated
                ? device.lastUpdated.toISOString()
                : "Not updated yet",
              "Average Rating": device.rating ?? 'n/a',
              "Download URL": device.downloadUrl,
              License: device.license
            }}
          />
        </div>
      </div>
    </div>
  ) : "";
}
