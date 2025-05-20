"use client";
import React, { useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, Divider, Text, Stack } from "@mantine/core";
import { Formik, Form, FormikHelpers } from "formik";
import { availabilityOptions } from "@/constants/dictionary";
import { validationSchemaClusterCreate } from "@/utils/validation/cluster-validation";
import NearByForm from "./NearByForm";
import { useUpdateClusterData } from "@/api/cluster/updateCluster";
import { getInitialValuesUpdateCluster } from "@/utils/initialValues/initialValuesCluster";
import LoadingGlobal from "@/styles/loading/loading-global";

interface EditClusterModalProps {
  opened: boolean;
  onClose: () => void;
  initialData: IClusterUpdate;
}

const EditClusterModal: React.FC<EditClusterModalProps> = ({ opened, onClose, initialData }) => {
  const { mutate: updateCluster, isPending: isLoadingEditCluster } = useUpdateClusterData(onClose);

  const handleSubmit = useCallback(
    async (values: IClusterUpdate, { resetForm }: FormikHelpers<IClusterUpdate>) => {
      try {
        updateCluster({ ...values, id: initialData.id });
      } catch (error: any) {
        console.error("Update Error:", error);
      }
    },
    [updateCluster, onClose, initialData]
  );

  const handleChangeCluster = (field: keyof IClusterUpdate, value: any, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue(field, value);
  };

  return (
    <Modal opened={opened} onClose={onClose} size="70%" yOffset="100px">
      <Formik
        initialValues={getInitialValuesUpdateCluster(initialData)}
        validationSchema={validationSchemaClusterCreate}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => {
          //   console.log("values", values);
          return (
            <SimpleGrid>
              <Form>
                <SimpleGrid p="40px" spacing="md">
                  <Stack>
                    <Text fw={700} mb={10}>
                      Ubah Cluster
                    </Text>
                  </Stack>
                  <LoadingGlobal visible={isLoadingEditCluster} />

                  <Group grow>
                    <TextInput
                      error={touched.name && errors.name ? errors.name : undefined}
                      label="Nama Cluster"
                      value={values.name}
                      onChange={(e) => handleChangeCluster("name", e.currentTarget.value, setFieldValue)}
                    />
                  </Group>

                  <TextInput
                    error={touched.location && errors.location ? errors.location : undefined}
                    label="Lokasi"
                    value={values.location}
                    onChange={(e) => handleChangeCluster("location", e.currentTarget.value, setFieldValue)}
                  />

                  <Group grow>
                    <TextInput
                      error={touched.price && errors.price ? errors.price : undefined}
                      label="Harga Cluster"
                      value={values.price ? `Rp. ${values.price.toLocaleString("id-ID")}` : ""}
                      onChange={(e) => {
                        const raw = e.currentTarget.value.replace(/\D/g, "");
                        const numeric = Number(raw) || 0;
                        handleChangeCluster("price", numeric, setFieldValue);
                      }}
                    />
                    <NumberInput
                      error={touched.square && errors.square ? errors.square : undefined}
                      label="Luas Lahan"
                      value={values.square}
                      hideControls
                      onChange={(val) => handleChangeCluster("square", val || 0, setFieldValue)}
                    />
                    <NumberInput
                      error={touched.quantity && errors.quantity ? errors.quantity : undefined}
                      label="Unit Tersedia"
                      value={values.quantity}
                      hideControls
                      onChange={(val) => handleChangeCluster("quantity", val || 0, setFieldValue)}
                    />
                  </Group>

                  <Group grow>
                    <Select
                      error={touched.status && errors.status ? errors.status : undefined}
                      label="Status"
                      data={availabilityOptions}
                      placeholder="Pilih status"
                      value={values.status}
                      onChange={(val) => handleChangeCluster("status", val || "", setFieldValue)}
                      clearable
                      required
                    />
                    <NumberInput
                      error={touched.sequence && errors.sequence ? errors.sequence : undefined}
                      label="Urutan"
                      value={values.sequence}
                      hideControls
                      onChange={(val) => handleChangeCluster("sequence", val || 0, setFieldValue)}
                    />
                  </Group>

                  <Textarea
                    error={touched.maps && errors.maps ? errors.maps : undefined}
                    label="Maps"
                    value={values.maps}
                    onChange={(e) => handleChangeCluster("maps", e.currentTarget.value, setFieldValue)}
                  />

                  <Divider p={12} mt={16} />
                  <NearByForm setFieldValue={setFieldValue} values={values} />

                  <Group justify="flex-end" mt="md">
                    <Button onClick={onClose} variant="default">
                      Batal
                    </Button>
                    <Button type="submit" loading={isLoadingEditCluster} disabled={isLoadingEditCluster}>
                      Simpan Perubahan
                    </Button>
                  </Group>
                </SimpleGrid>
              </Form>
            </SimpleGrid>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default EditClusterModal;
