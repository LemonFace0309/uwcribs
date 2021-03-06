import { FC, useState } from "react";

import { Button, Modal } from "@root/ui/components";

import { Filter } from "./filter";

export const FilterModal: FC = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex justify-center w-full mt-4 -mb-8 2xl:hidden">
      <Button onClick={() => setShow(true)} variant="outline">
        Set Filters
      </Button>
      <Modal open={show} onClose={() => setShow(false)}>
        <Filter />

        <div className="flex items-center">
          <Button
            onClick={() => setShow(false)}
            variant="rounded-outline"
            className="mt-8">
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};
