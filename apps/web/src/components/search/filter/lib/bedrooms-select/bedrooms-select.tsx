import { FC, useState } from "react";

import { Select, Seperator } from "@root/ui/components";
import { useSearchContext } from "@src/context/search";

const options = [
  { label: "1️⃣", value: "1" },
  { label: "2️⃣", value: "2" },
  { label: "3️⃣", value: "3" },
  { label: "4️⃣", value: "4" },
  { label: "5️⃣", value: "5" },
];

export const BedroomsSelect: FC = () => {
  const { state, dispatch } = useSearchContext();
  const [option, setOption] = useState<string | undefined>(
    state.availableBeds ? state.availableBeds.toString() : undefined
  );

  const selectHandler = (value: string | undefined) => {
    setOption(value);
    if (!value) return;
    dispatch({
      type: "availableBeds",
      value,
    });
  };

  // const router = useRouter();
  // const [selected, setSelected] = useState(options[getQueryBedsIndex(router)]);

  // useEffect(() => {
  //   if (!selected.value) {
  //     router.push("/search");
  //     return;
  //   }

  //   router.push(`/search?beds=${selected.value}`);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selected]);

  return (
    <>
      <p className="mt-10 mb-4 text-sm font-bold">Bedrooms</p>
      <Select options={options} value={option} onChange={selectHandler} />
      <Seperator fullWidth className="mt-10" />
    </>
  );
};
