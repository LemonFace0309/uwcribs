import { FC } from "react";

import { Tab, TabList } from "@root/ui/components";

export const NavTabList: FC = () => (
  <div className="pt-20 bg-sea-300">
    <div className="px-4 m-auto max-w-7xl">
      <TabList>
        <Tab>All</Tab>
      </TabList>
    </div>
  </div>
);
