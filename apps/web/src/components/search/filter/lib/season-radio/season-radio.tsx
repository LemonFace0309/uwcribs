import { FC } from "react";

import { RadioGroup, Seperator } from "@root/ui/components";
import { useSearchContext } from "@src/context/search";

const options = [
  { name: "season", value: "fall", label: "Fall" },
  { name: "season", value: "winter", label: "Winter" },
  { name: "season", value: "spring", label: "Spring" },
];

export const SeasonRadio: FC = () => {
  const { state, dispatch } = useSearchContext();

  const radioHandler = (value: string) => {
    if (!value) return;
    dispatch({
      type: "season",
      value,
    });
  };

  return (
    <>
      <p className="mt-10 mb-4 text-sm font-bold">Season</p>
      <RadioGroup
        options={options}
        value={state.season ? state.season.toString() : undefined}
        onChange={radioHandler}
      />
      <Seperator fullWidth className="mt-10" />
    </>
  );
};
