import { FC, useState } from "react";

import { RadioGroup, Seperator } from "@root/ui/components";
import { useSearchContext } from "@src/context/search";

const options = [
  { name: "season", value: "fall", label: "Fall" },
  { name: "season", value: "winter", label: "Winter" },
  { name: "season", value: "spring", label: "Spring" },
];

export const SeasonRadio: FC = () => {
  const { dispatch } = useSearchContext();
  const [option, setOption] = useState<string | undefined>();

  const radioHandler = (value: string) => {
    setOption(value);
    if (!value) return;
    dispatch({
      type: "season",
      value,
    });
  };

  return (
    <>
      <p className="mt-10 mb-4 text-sm font-bold">Season</p>
      <RadioGroup options={options} value={option} onChange={radioHandler} />
      <Seperator fullWidth className="mt-10" />
    </>
  );
};
