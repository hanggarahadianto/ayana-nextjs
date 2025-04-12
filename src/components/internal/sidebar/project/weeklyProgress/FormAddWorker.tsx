import React, { memo } from "react";
import { Group, TextInput, Select, Card, Stack, Text } from "@mantine/core";
import ButtonAdd from "@/lib/button/buttonAdd";
import ButtonDelete from "@/lib/button/butttonDelete";
import { useFormikContext } from "formik";
import { useDebouncedCallback } from "use-debounce";

interface FormAddWorkerProps {
  workers: IWorkerCreate[];
  setWorkers: (newWorkers: IWorkerCreate[]) => void; // ubah dari Dispatch
}

const FormAddWorker: React.FC<FormAddWorkerProps> = React.memo(({ workers, setWorkers }) => {
  const { setFieldValue } = useFormikContext<IWeeklyProgressCreate>();

  const addWorker = () => {
    const updated = [...workers, { worker_name: "", position: "", total_cost: 0 }];
    setWorkers(updated);
    updateAmountWorker(updated);
  };

  const deleteWorker = (index: number) => {
    const updated = workers.filter((_, i) => i !== index);
    setWorkers(updated);
    updateAmountWorker(updated);
  };

  const handleWorkerChange = (index: number, field: keyof IWorkerCreate, value: string | number) => {
    const updated = [...workers];
    updated[index] = { ...updated[index], [field]: value };
    setWorkers(updated);
    updateAmountWorker(updated); // <== panggil di sini
  };

  const updateAmountWorker = useDebouncedCallback((updatedWorkers: IWorkerCreate[]) => {
    const total = updatedWorkers.reduce((sum, worker) => sum + (worker.total_cost || 0), 0);
    setFieldValue("amount_worker", total);
  }, 300);

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

export default memo(FormAddWorker);
