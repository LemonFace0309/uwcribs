import { NextRouter } from "next/router";

export const bedOptions = [
  { label: "1️⃣", value: "1" },
  { label: "2️⃣", value: "2" },
  { label: "3️⃣", value: "3" },
  { label: "4️⃣", value: "4" },
  { label: "5️⃣", value: "5" },
  { label: "ANY", value: null },
];

export const getQueryBedsIndex = (router: NextRouter) => {
  const lastElIndex = bedOptions.length - 1;

  const { beds } = router.query;
  if (typeof beds !== "string") return lastElIndex;

  const index = bedOptions.findIndex((obj) => obj.value === beds);

  if (index > -1) return index;

  return lastElIndex;
};
