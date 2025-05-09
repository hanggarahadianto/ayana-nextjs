"use client";
import React, { useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, NumberInput, SimpleGrid, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import { showNotification } from "@mantine/notifications";

import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { availabilityOptions, typeOptions } from "@/constants/dictionary";
import { initialValuesClusterCreate } from "@/utils/initialValues/initialValuesCluster";
import { validationSchemaClusterCreate } from "@/utils/validation/cluster-validation";

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
      <Modal opened={opened} onClose={close} size={"100%"} yOffset="100px">
        <Formik initialValues={initialValuesClusterCreate} validationSchema={validationSchemaClusterCreate} onSubmit={handleSubmit}>
          {({ values, errors, setFieldValue }) => {
            console.log("values", values);
            console.log("error", errors);
            return (
              <Form>
                <SimpleGrid p="40px" spacing="md">
                  <Group grow>
                    <TextInput
                      label="Nama Cluster"
                      placeholder="Masukkan Nama Custer"
                      onChange={(e) => handleChangeCluster("name", e.currentTarget.value, setFieldValue)}
                    />
                  </Group>

                  <TextInput
                    label="Alamat"
                    placeholder="Masukkan alamat"
                    onChange={(e) => handleChangeCluster("location", e.currentTarget.value, setFieldValue)}
                  />

                  <Group grow>
                    <NumberInput
                      label="Kamar Mandi"
                      hideControls
                      placeholder="Masukkan jumlah kamar mandi"
                      onChange={(val) => handleChangeCluster("square", val || 0, setFieldValue)}
                    />
                    <NumberInput
                      label="Kamar Tidur"
                      hideControls
                      placeholder="Masukkan jumlah kamar tidur"
                      onChange={(val) => handleChangeCluster("price", val || 0, setFieldValue)}
                    />
                  </Group>

                  <Group grow>
                    <Select
                      label="Status"
                      data={availabilityOptions}
                      placeholder="Pilih status"
                      clearable
                      onChange={(val) => handleChangeCluster("status", val || "", setFieldValue)}
                      required
                    />
                    <NumberInput
                      label="Kuantitas"
                      hideControls
                      placeholder="Masukkan kuantitas"
                      onChange={(val) => handleChangeCluster("quantity", val || 0, setFieldValue)}
                      required
                    />
                    <NumberInput
                      label="Harga Unit"
                      hideControls
                      placeholder="Masukkan harga unit"
                      onChange={(val) => handleChangeCluster("price", val || 0, setFieldValue)}
                      required
                    />
                  </Group>
                  <Textarea
                    label="Maps"
                    placeholder="Masukkan maps"
                    onChange={(e) => handleChangeCluster("maps", e.currentTarget.value, setFieldValue)}
                    required
                  />

                  <Divider p={12} mt={16} />

                  {/* Komponen untuk near_bies */}
                  {/* <NearByForm setFieldValue={setFieldValue} /> */}

                  <Group grow>
                    <NumberInput
                      w={40}
                      label="Urutan"
                      hideControls
                      placeholder="Masukkan urutan"
                      onChange={(val) => handleChangeCluster("sequence", val || 0, setFieldValue)}
                      required
                    />
                    {/* <FileInput
                      label="Upload Gambar"
                      accept="image/png,image/jpeg"
                      placeholder="Pilih gambar"
                      clearable
                      onChange={(file) => setFieldValue("file", file)}
                      required
                    /> */}
                  </Group>

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Batal
                    </Button>
                    {/* <Button type="submit" loading={isLoadingSubmitClusterData}>
                      Simpan
                    </Button> */}
                  </Group>
                </SimpleGrid>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </SimpleGridGlobal>
  );
};

export default AddClusterModal;
