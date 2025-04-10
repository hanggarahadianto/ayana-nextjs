import React, { useCallback } from "react";
import { Group, TextInput, Select, Card, Stack, Text } from "@mantine/core";
import ButtonAdd from "@/lib/button/buttonAdd";
import ButtonDelete from "@/lib/button/butttonDelete";
import { useFormikContext } from "formik";

interface FormAddWorkerProps {
  workers: IWorkerCreate[];
  setWorkers: (newWorkers: IWorkerCreate[]) => void; // ubah dari Dispatch
}

const FormAddWorker: React.FC<FormAddWorkerProps> = React.memo(({ workers, setWorkers }) => {
  const { setFieldValue } = useFormikContext<IWeeklyProgressCreate>();

  const syncWorkers = useCallback(
    (newWorkers: IWorkerCreate[]) => {
      setWorkers(newWorkers);
      setFieldValue("worker", newWorkers);
    },
    [setFieldValue, setWorkers]
  );

  const addWorker = useCallback(() => {
    const newWorkers = [...workers, { worker_name: "", position: "", total_cost: 0 }];
    syncWorkers(newWorkers);
  }, [workers, syncWorkers]);

  const deleteWorker = useCallback(
    (index: number) => {
      const newWorkers = workers.filter((_, i) => i !== index);
      syncWorkers(newWorkers);
    },
    [workers, syncWorkers]
  );

  const handleWorkerChange = useCallback(
    (index: number, field: keyof IWorkerCreate, value: string | number) => {
      const oldWorker = workers[index];
      if (oldWorker[field] === value) return;

      const newWorkers = [...workers];
      newWorkers[index] = { ...oldWorker, [field]: value };
      syncWorkers(newWorkers);
    },
    [workers, syncWorkers]
  );

  return (
    <>
      <Group justify="space-between" p={20}>
        <Text fw={600}>Tambah Pekerja</Text>
        <ButtonAdd onClick={addWorker} size="2.5rem" />
      </Group>
      <Stack>
        {workers.map((worker, index) => (
          <Card key={index} shadow="sm" radius="md" withBorder>
            <Group>
              <TextInput
                label={`Nama Pekerja ${index + 1}`}
                placeholder="Masukan nama pekerja"
                value={worker.worker_name || ""}
                onChange={(e) => handleWorkerChange(index, "worker_name", e.target.value.toLocaleUpperCase())}
              />
              <Select
                label={`Posisi Pekerja ${index + 1}`}
                placeholder="Pilih posisi"
                value={worker.position || ""}
                onChange={(value) => handleWorkerChange(index, "position", value || "")}
                data={[
                  { value: "tukang", label: "Tukang" },
                  { value: "kuli", label: "Kuli" },
                ]}
                allowDeselect
              />

              <TextInput
                w={140}
                label="Harga"
                placeholder="Masukan Harga"
                value={worker.total_cost ? `Rp. ${worker.total_cost.toLocaleString("id-ID")}` : ""}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  handleWorkerChange(index, "total_cost", Number(rawValue) || 0);
                }}
              />

              <ButtonDelete onClick={() => deleteWorker(index)} />
            </Group>
          </Card>
        ))}
      </Stack>
    </>
  );
});

export default React.memo(FormAddWorker, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.workers) === JSON.stringify(nextProps.workers);
});
