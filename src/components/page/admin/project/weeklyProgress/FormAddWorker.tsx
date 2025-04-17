import React, { memo, useCallback, useEffect, useMemo } from "react";
import { Group, TextInput, Select, Card, Stack, Text } from "@mantine/core";
import ButtonAdd from "@/components/common/button/buttonAdd";
import ButtonDelete from "@/components/common/button/butttonDelete";
import { useFormikContext } from "formik";
import { debounce } from "lodash";

interface FormAddWorkerProps {
  workers: IWorkerCreate[];
  setWorkers: (newWorkers: IWorkerCreate[]) => void; // ubah dari Dispatch
  errors?: any; // ubah dari any[] ke any
  touched?: any;
}

const FormAddWorker: React.FC<FormAddWorkerProps> = React.memo(({ workers, setWorkers, errors, touched }) => {
  console.log("ERROR DI COMPONENT FORM ADD WORKER", errors);
  const { setFieldValue } = useFormikContext<IWeeklyProgressCreate>();

  const amountWorker = useMemo(() => {
    return workers.reduce((sum, worker) => sum + (worker.total_cost || 0), 0);
  }, [workers]);

  useEffect(() => {
    setFieldValue("amount_worker", amountWorker);
  }, [amountWorker, setFieldValue]);

  // ✅ useCallback to memoize function
  const addWorker = useCallback(() => {
    const updated = [...workers, { worker_name: "", position: "", total_cost: 0 }];
    setWorkers(updated);
  }, [workers, setWorkers]);

  const deleteWorker = useCallback(
    (index: number) => {
      const updated = workers.filter((_, i) => i !== index);
      setWorkers(updated);
    },
    [workers, setWorkers]
  );

  const handleWorkerChange = useCallback(
    (index: number, field: keyof IWorkerCreate, value: string | number) => {
      const updated = [...workers];
      updated[index] = { ...updated[index], [field]: value };
      setWorkers(updated);
    },
    [workers, setWorkers]
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
                error={touched?.[index]?.worker_name && errors?.[index]?.worker_name}
                label={`Nama Pekerja ${index + 1}`}
                placeholder="Masukan nama pekerja"
                value={worker.worker_name || ""}
                onChange={(e) => handleWorkerChange(index, "worker_name", e.target.value.toLocaleUpperCase())}
              />
              <Select
                error={touched?.[index]?.position && errors?.[index]?.position}
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
                error={touched?.[index]?.total_cost && errors?.[index]?.total_cost}
                w={140}
                label="Harga"
                placeholder="Masukan Harga"
                value={worker.total_cost ? `Rp. ${worker.total_cost.toLocaleString("id-ID")}` : ""}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  handleWorkerChange(index, "total_cost", Number(rawValue) || 0);
                }}
              />
              <Stack mt={16}>
                <ButtonDelete onClick={() => deleteWorker(index)} />
              </Stack>
            </Group>
          </Card>
        ))}
      </Stack>
    </>
  );
});

export default memo(FormAddWorker);
