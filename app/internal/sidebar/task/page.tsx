"use client";

import { Button, Group, SimpleGrid, Text } from "@mantine/core";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";

const TaskPage = () => {
  const [modalCreateOpened, setModalCreateOpened] = useState(false);
  const handleAddNew = () => {
    setModalCreateOpened(true);
  };

  return (
    <>
      <SimpleGrid>
        <Group>
          {/* <Button>
            <Text onClick={handleAddNew}>Tambah Task</Text>
          </Button> */}
        </Group>
      </SimpleGrid>
      <AddTaskModal />
    </>
  );
};

export default TaskPage;
