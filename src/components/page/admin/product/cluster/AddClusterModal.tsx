import React, { useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, Divider, Text, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import { showNotification } from "@mantine/notifications";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { availabilityOptions } from "@/constants/dictionary";
import { initialValuesClusterCreate } from "@/utils/initialValues/initialValuesCluster";
import { validationSchemaClusterCreate } from "@/utils/validation/cluster-validation";
import { useSubmitClusterForm } from "@/api/cluster/postCluster";
import NearByForm from "./NearByForm";
import ButtonAdd from "@/components/common/button/ButtonActionAdd";

const handleChangeCluster = (field: keyof IClusterCreate, value: any, setFieldValue: (field: string, value: any) => void) => {
  setFieldValue(field, value);
};

const AddClusterModal: React.FC<{}> = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postDataCluster, isPending: isLoadingSubmitClusterData } = useSubmitClusterForm(close);

  const handleSubmit = useCallback(
    async (values: IClusterCreate, { resetForm }: FormikHelpers<IClusterCreate>) => {
      try {
        postDataCluster(values, {
          onSuccess: () => {
            showNotification({
              title: "Berhasil",
              message: "Data berhasil disimpan",
              color: "green",
            });
            resetForm();
            close();
          },
          onError: (error: any) => {
            showNotification({
              title: "Gagal menyimpan data",
              message: error.message || "Terjadi kesalahan",
              color: "red",
            });
          },
        });
      } catch (error: any) {
        console.error("Submit Error:", error);
      }
    },
    [postDataCluster, close]
  );

  return (
    <SimpleGridGlobal cols={1}>
      <ButtonAdd onClick={open} size="3.5rem" />
      <Modal opened={opened} onClose={close} size={"70%"} yOffset="100px">
        <Formik initialValues={initialValuesClusterCreate} validationSchema={validationSchemaClusterCreate} onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue }) => {
            // console.log("values", values);
            // console.log("error", errors);
            return (
              <SimpleGrid>
                <Form>
                  <SimpleGrid p="40px" spacing="md">
                    <Stack>
                      <Text fw={700} mb={10}>
                        Tambah Cluster
                      </Text>
                    </Stack>
                    <Group grow>
                      <TextInput
                        error={touched.name && errors.name ? errors.name : undefined}
                        label="Nama Cluster"
                        placeholder="Masukkan Nama Custer"
                        onChange={(e) => handleChangeCluster("name", e.currentTarget.value, setFieldValue)}
                      />
                    </Group>

                    <TextInput
                      error={touched.location && errors.location ? errors.location : undefined}
                      label="Lokasi"
                      placeholder="Masukkan Lokasi"
                      onChange={(e) => handleChangeCluster("location", e.currentTarget.value, setFieldValue)}
                    />

                    <Group grow>
                      <TextInput
                        error={touched.price && errors.price ? errors.price : undefined}
                        label="Harga Cluster"
                        placeholder="Masukkan Harga Cluster"
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
                        hideControls
                        placeholder="Masukkan Luas Lahan"
                        onChange={(val) => handleChangeCluster("square", val || 0, setFieldValue)}
                      />

                      <NumberInput
                        error={touched.quantity && errors.quantity ? errors.quantity : undefined}
                        label="Unit Tersedia"
                        hideControls
                        placeholder="Masukkan Unit Terseida"
                        onChange={(val) => handleChangeCluster("quantity", val || 0, setFieldValue)}
                      />
                    </Group>

                    <Group grow>
                      <Select
                        error={touched.status && errors.status ? errors.status : undefined}
                        label="Status"
                        data={availabilityOptions}
                        placeholder="Pilih Status"
                        clearable
                        onChange={(val) => handleChangeCluster("status", val || "", setFieldValue)}
                        required
                      />

                      <NumberInput
                        w={40}
                        error={touched.sequence && errors.sequence ? errors.sequence : undefined}
                        label="Urutan"
                        hideControls
                        placeholder="Masukkan urutan"
                        onChange={(val) => handleChangeCluster("sequence", val || 0, setFieldValue)}
                      />
                    </Group>
                    <Textarea
                      error={touched.maps && errors.maps ? errors.maps : undefined}
                      label="Maps"
                      placeholder="Masukkan maps"
                      onChange={(e) => handleChangeCluster("maps", e.currentTarget.value, setFieldValue)}
                    />

                    <Divider p={12} mt={16} />
                    <NearByForm setFieldValue={setFieldValue} values={values} />

                    <Group justify="flex-end" mt="md">
                      <Button onClick={close} variant="default">
                        Batal
                      </Button>
                      <Button type="submit" loading={isLoadingSubmitClusterData} disabled={isLoadingSubmitClusterData}>
                        Simpan
                      </Button>
                    </Group>
                  </SimpleGrid>
                </Form>
              </SimpleGrid>
            );
          }}
        </Formik>
      </Modal>
    </SimpleGridGlobal>
  );
};

export default AddClusterModal;
