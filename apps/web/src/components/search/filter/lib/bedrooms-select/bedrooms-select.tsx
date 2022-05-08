import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import { Select, Seperator } from "@root/ui/components";
import {
  bedOptions as options,
  getQueryBedsIndex,
} from "@src/components/search/filter/utils";

export const BedroomsSelect: FC = () => {
  const router = useRouter();
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
      <Select options={options} />
      <Seperator fullWidth className="mt-10" />
    </>
  );
};
