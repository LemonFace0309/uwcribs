import { VFC } from "react";

import { Tab, TabList } from "react-tabs";

export const NavTabList: VFC = () => (
  <div className="pt-20 bg-sea-300">
    <div className="px-4 m-auto max-w-7xl">
      <TabList>
        <Tab>All</Tab>
      </TabList>
    </div>
  </div>
);
