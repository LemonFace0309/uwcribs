import { FC } from "react";

import { RadioGroup, Seperator } from "@root/ui/components";

const options = [
  { name: "season", value: "fall", label: "Fall" },
  { name: "season", value: "winter", label: "Winter" },
  { name: "season", value: "spring", label: "Spring" },
];

export const SeasonRadio: FC = () => (
  <>
    <p className="mt-10 mb-4 text-sm font-bold">Season</p>
    <RadioGroup options={options} />
    <Seperator fullWidth className="mt-10" />
  </>
);
