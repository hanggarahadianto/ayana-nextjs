import React, { useCallback } from "react";
import { Group, TextInput, Select, Card, Stack, Text } from "@mantine/core";
import ButtonAdd from "@/components/button/buttonAdd";
import ButtonDelete from "@/components/button/butttonDelete";

interface FormAddWorkerProps {
  workers: IWorkerCreate[];
  setWorkers: React.Dispatch<React.SetStateAction<IWorkerCreate[]>>;
}

const FormAddWorker: React.FC<FormAddWorkerProps> = ({ workers, setWorkers }) => {
  const addWorker = useCallback(() => {
    setWorkers((prev) => [...prev, { worker_name: "", position: "", total_cost: 0 }]);
  }, [setWorkers]);

  const deleteWorker = useCallback(
    (index: number) => {
      setWorkers((prev) => prev.filter((_, i) => i !== index));
    },
    [setWorkers]
  );

  const handleWorkerChange = useCallback(
    (index: number, field: keyof IWorkerCreate, value: string | number) => {
      setWorkers((prev) => {
        const newWorkers = [...prev];
        newWorkers[index] = { ...newWorkers[index], [field]: value };
        return newWorkers;
      });
    },
    [setWorkers]
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
};

export default FormAddWorker;
