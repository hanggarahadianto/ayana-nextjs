import React, { useState } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Card, Text, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik } from "formik";
import { initialValueTask } from "./initialValuesTask";

const AddTaskModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "teal"; // Green
      case "pending":
        return "yellow"; // Yellow
      case "inprogress":
        return "blue"; // Blue
      default:
        return "gray"; // Default color
    }
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    console.log("Form values submitted:", values);
    // Post data or handle submission logic here
    setSubmitting(false);
  };

  const addTaskField = (setFieldValue: any, tasks: any) => {
    // Add a new task to the task array
    const newTask = { name: "", status: "pending" };
    setFieldValue("task", [...tasks, newTask]);
  };

  const handleTaskChange = (setFieldValue: any, tasks: any, index: number, field: string, value: string) => {
    // Clone the task array, modify the task, and set the new array
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setFieldValue("task", updatedTasks);
  };

  return (
    <>
      <Button onClick={open}>Add Task</Button>

      <Modal opened={opened} onClose={close} title="Add New Task" size={"xl"}>
        <Formik
          initialValues={initialValueTask}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, setFieldValue, handleBlur, isValid, resetForm }) => {
            console.log(values);

            return (
              <>
                <TextInput label="Name" placeholder="Name" onChange={(event) => setFieldValue("name", event.currentTarget.value)} mt="md" />
                <Select
                  label="Division"
                  placeholder="Select division"
                  onChange={(value: any) => {
                    setFieldValue("division", value);
                  }}
                  data={[
                    { value: "marketing", label: "Marketing" },
                    { value: "it_support", label: "IT Support" },
                    { value: "finance", label: "Finance" },
                    { value: "legal", label: "Legal" },
                  ]}
                  required
                />
                <Stack mt="md">
                  {values.task.map((task: any, index: any) => (
                    <Card key={index} shadow="sm" padding="lg" radius="md">
                      <TextInput
                        label={`Task Name ${index + 1}`}
                        placeholder="Enter task name"
                        value={task.name}
                        onChange={(event) => handleTaskChange(setFieldValue, values.task, index, "name", event.currentTarget.value)}
                        required
                      />
                      <Select
                        label={`Task Status ${index + 1}`}
                        placeholder="Select status"
                        value={task.status}
                        onChange={(value) => handleTaskChange(setFieldValue, values.task, index, "status", value || "pending")}
                        data={[
                          { value: "done", label: "Done" },
                          { value: "pending", label: "Pending" },
                          { value: "inprogress", label: "In Progress" },
                        ]}
                        mt="xs"
                      />
                      <Text mt="sm" color={getStatusColor(task.status)} fw={500}>
                        Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </Text>
                    </Card>
                  ))}
                </Stack>
                <Button onClick={() => addTaskField(setFieldValue, values.task)} mt="sm" variant="light">
                  Add Another Task
                </Button>
                <Textarea
                  label="Note"
                  placeholder="Enter additional information"
                  onChange={(event) => setFieldValue("note", event.currentTarget.value)}
                  mt="md"
                />
                <Group justify="flex-end" mt="md">
                  <Button onClick={close} variant="default">
                    Cancel
                  </Button>
                  <Button type="submit" color="blue">
                    Add Task
                  </Button>
                </Group>
              </>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default AddTaskModal;
