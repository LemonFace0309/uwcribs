import { FC, useState } from "react";

import { Button, Modal } from "@root/ui/components";

import { Filter } from "./filter";

export const FilterModal: FC = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="flex justify-center w-full mt-4 -mb-8 2xl:hidden">
      <Button onClick={() => setShow(true)} variant="outline">
        Set Filters
      </Button>
      {show && (
        <Modal>
          <Filter />

          <Button
            onClick={() => setShow(false)}
            variant="rounded-outline"
            className="mt-8">
            Apply Filters
          </Button>
        </Modal>
      )}
    </div>
  );
};
