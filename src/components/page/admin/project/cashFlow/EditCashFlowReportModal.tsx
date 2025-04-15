import React, { startTransition, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Select,
  Card,
  Text,
  Stack,
  InputWrapper,
  SimpleGrid,
  Flex,
  Grid,
  Divider,
  Tabs,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { IconEdit } from "@tabler/icons-react";
import {
  getInitialValuesCashFlow,
  initialValuesCashFlowUpdate,
  validationSchemaCashFlowCreate,
} from "../../../../../utils/initialValues/initialValuesCashFlow";
import { useUpdateCashFlowForm } from "@/api/cash-flow/editDataCashFlow";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { useQuery } from "@tanstack/react-query";
import { getDataGoodsByCashFlowId } from "@/api/good/getDataGoodsByCashFlowId";
import { showNotification } from "@mantine/notifications";
import FormGoods from "./FormGoods";
import { useEditGoodForm } from "@/api/good/editGoods";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { useDeleteDataCashFlow } from "@/api/cash-flow/deleteDataCashFlow";

const EditCashFlowReportModal = ({
  projectName,
  cashFlowData,
  projectId,
  refetchCashFlowData,
}: {
  projectName: any;
  cashFlowData: ICashFlow[];
  projectId: any;
  refetchCashFlowData: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [page, setPage] = useState(1);

  const [initialValues, setInitialValues] = useState(() =>
    cashFlowData.length > 0 ? { ...cashFlowData[0] } : initialValuesCashFlowUpdate
  );

  useEffect(() => {
    if (cashFlowData.length > 0) {
      setInitialValues({ ...cashFlowData[0] });
    }
  }, [cashFlowData]); // Update saat cashFlowData berubah

  const {
    data: goodsData,
    isLoading: isLoadingGoodsdata,
    refetch: refetchGoodsData,
  } = useQuery({
    queryKey: ["getGoodsData", initialValues.id, page], // Tambahkan page ke dalam queryKey
    queryFn: () => getDataGoodsByCashFlowId(initialValues.id, page, 10), // Kirim page & limit ke API
    enabled: !!initialValues?.id,
    refetchOnWindowFocus: false,
  });

  const [debouncedGoods, setDebouncedGoods] = useState<IGoods[] | undefined>(undefined);

  const { mutateAsync: updateDataCashFlow, isPending: isLoadingUpdateDataCashFlow } = useUpdateCashFlowForm();
  const { mutateAsync: updateDataGoods, isPending: isLoadingUpdateDataGoods } = useEditGoodForm();
  const { mutate: mutateDeleteDataCashFlow, isPending: isLoadingDeleteDataCashFlow } = useDeleteDataCashFlow(
    refetchCashFlowData,
    refetchGoodsData,
    close
  );

  const handleSubmit = async (values: ICashFlowUpdate) => {
    const id = initialValues.id;
    if (!id) {
      console.error("ID tidak ditemukan");
      showNotification({ title: "Error", message: "ID cash flow tidak ditemukan!", color: "red" });
      return;
    }
    const cleanedGoods = debouncedGoods?.map(({ id, ...rest }) => (id.trim() === "" ? rest : { id, ...rest }));
    try {
      const results = await Promise.allSettled([updateDataCashFlow({ id, values }), updateDataGoods(cleanedGoods)]);

      const cashFlowResult = results[0];
      const goodsResult = results[1];

      if (cashFlowResult.status === "rejected" || goodsResult.status === "rejected") {
        console.error("Gagal memperbarui data:", results);
        showNotification({
          title: "Error",
          message: "Gagal memperbarui data cash flow atau barang",
          color: "red",
        });
        return;
      }
      console.log("Memanggil refetchCashFlowData...");
      refetchCashFlowData(); // Tambahkan await untuk memastikan selesai
      refetchGoodsData();
      console.log("refetchCashFlowData selesai");
      showNotification({
        title: "Sukses",
        message: "Data cash flow dan barang berhasil diperbarui!",
        color: "green",
      });

      close();
    } catch (error) {
      console.error("Error di handleSubmit:", error);
      showNotification({ title: "Error", message: "Terjadi kesalahan saat memproses permintaan", color: "red" });
    }
  };

  const handleDeleteCashFlow = (idToDelete: string) => {
    console.log("Menghapus cashflow dengan ID:", idToDelete);
    mutateDeleteDataCashFlow(idToDelete);
  };

  // console.log("GOODS DATA", goodsData);

  return (
    <>
      <BreathingActionIcon
        onClick={open}
        size="2.5rem"
        icon={<IconEdit size="1.5rem" />}
        gradient="linear-gradient(135deg, #93C5FD, #BFDBFE)"
      />

      <Modal
        opened={opened}
        onClose={close}
        size={"100%"}
        yOffset="100px" // Moves modal down
      >
        <Formik
          initialValues={getInitialValuesCashFlow(initialValues)}
          validationSchema={validationSchemaCashFlowCreate}
          validateOnBlur={false}
          validateOnMount={false}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validateOnChange={true}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            // console.log("VALUES", values);
            console.log("error", errors);

            const [totalPages, setTotalPages] = useState(1);

            useEffect(() => {
              if (goodsData?.data) {
                setDebouncedGoods(goodsData.data);
                setTotalPages(goodsData?.total || 1);
              }
            }, [goodsData]);

            // console.log("DEBOUNCH GOODS", debouncedGoods);

            useEffect(() => {
              const handler = setTimeout(() => {
                const totalCost = debouncedGoods?.reduce((acc, good) => acc + (good.total_cost || 0), 0);
                setFieldValue("cash_out", totalCost);
              }, 300);

              return () => clearTimeout(handler);
            }, [debouncedGoods]);

            const addGoodField = () => {
              const newGood: IGoods = {
                id: "",
                good_name: "",
                status: "tunai",
                quantity: 0,
                unit: "",
                price: 0,
                cash_flow_id: initialValues?.id,
                costs_due: 0,
                total_cost: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              };

              setDebouncedGoods((prevGoods) => {
                // Periksa apakah prevGoods terdefinisi
                if (prevGoods) {
                  return [...prevGoods, newGood];
                } else {
                  // Jika prevGoods undefined, kembalikan array yang berisi newGood
                  return [newGood];
                }
              });
            };

            const deleteGoodField = (goods: IGoods[], index: number) => {
              const updatedGoods = goods.filter((_, i) => i !== index);
              setDebouncedGoods(updatedGoods); // Perbarui state sementara
              // setFieldValue("good", updatedGoods);
            };

            const handleGoodChange = useCallback((index: string | number, field: string, value: any) => {
              setDebouncedGoods((prev) => {
                const newGoods = [...(prev || [])];
                newGoods[index] = { ...newGoods[index], [field]: value };

                // Jika harga atau kuantitas berubah, update total_cost
                if (field === "price" || field === "quantity") {
                  newGoods[index].total_cost = (newGoods[index].quantity || 0) * (newGoods[index].price || 0);
                }

                return newGoods;
              });
            }, []);

            const calculateAccountBalance = (cashIn: number, cashOut: number): number => {
              return cashIn - cashOut;
            };
            const cashIn = values.cash_in || 0;
            const cashOut = values.cash_out || 0;

            const accountBalance = useMemo(() => {
              return calculateAccountBalance(cashIn, cashOut);
            }, [cashIn, cashOut]);

            const sortedCashFlowData = [...cashFlowData].sort(
              (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );

            return (
              <SimpleGrid p={20}>
                <Form>
                  <Group>
                    <Select
                      w={800}
                      label="Pilih Minggu"
                      placeholder="Pilih minggu ke..."
                      value={initialValues.week_number?.toString()} // Pastikan value dalam bentuk string
                      onChange={(selectedValue) => {
                        const selectedItem = sortedCashFlowData.find((item) => item.week_number.toString() === selectedValue);
                        if (selectedItem) setInitialValues({ ...selectedItem });
                      }}
                      data={sortedCashFlowData.slice(0, 10).map((item) => ({
                        value: item.week_number.toString(),
                        label: `📅 Minggu Ke ${item.week_number}`,
                      }))} // Ambil 10 data pertama sebagai default
                      maxDropdownHeight={300}
                      styles={{
                        dropdown: {
                          maxHeight: "200px",
                          overflowY: "auto",
                        },
                      }}
                    />
                    {values?.id && (
                      <Stack mt={24}>
                        <ButtonDeleteWithConfirmation
                          id={values?.id}
                          onDelete={handleDeleteCashFlow}
                          description={`Apakah anda ingin menghapus data minggu ke ${values?.week_number}`}
                          size={2}
                        />
                      </Stack>
                    )}
                  </Group>

                  <Grid>
                    <Grid.Col span={8} mt={40}>
                      <Text size="xl" fw={900}>
                        {`EDIT BUKU KAS UMUM - ${projectName}`}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Stack justify="end" align="end" w="100%">
                        <Grid w={400} mt={40}>
                          <Grid.Col span={6}>
                            <Text size="md">💰 Uang Masuk</Text>
                            <Text size="md">💸 Uang Keluar</Text>
                            <Text size="md" fw={700} c={accountBalance < 0 ? "red" : "green"}>
                              🔹 Uang Tersisa
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={6}>
                            <Text> : Rp {cashIn.toLocaleString()}</Text>
                            <Text> : Rp {cashOut.toLocaleString()}</Text>
                            <Text c={accountBalance < 0 ? "red" : "green"}> : Rp {accountBalance.toLocaleString()}</Text>
                          </Grid.Col>
                        </Grid>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                  <Flex p={20} justify={"space-between"}></Flex>
                  <Group>
                    <InputWrapper
                      required
                      error={touched.week_number && errors.week_number ? errors.week_number : undefined}
                    ></InputWrapper>
                    <InputWrapper required error={touched.cash_in && errors.cash_in ? errors.cash_in : undefined}>
                      <TextInput
                        w={400}
                        label={"Uang Masuk"}
                        placeholder="Masukan Uang Masuk"
                        value={values.cash_in ? `Rp. ${values.cash_in.toLocaleString("id-ID")}` : ""}
                        onChange={(event) => {
                          const numericValue = Number(event.target.value.replace(/\D/g, "")); // Hanya angka
                          setFieldValue("cash_in", isNaN(numericValue) ? 0 : numericValue);
                        }}
                      />
                    </InputWrapper>
                  </Group>
                  <Divider mt={20} />

                  <FormGoods
                    goodsData={debouncedGoods}
                    debouncedGoods={debouncedGoods}
                    addGoodField={addGoodField}
                    handleGoodChange={handleGoodChange}
                    deleteGoodField={deleteGoodField}
                    totalPages={totalPages}
                    page={page} // Kirim page
                    setPage={setPage} // Kirim setPage
                  />

                  <Stack justify="flex-start" align="start">
                    <Text
                      size="md"
                      fw={500}
                      c="blue"
                      ta="center"
                      mt="md"
                      variant="gradient"
                      gradient={{ from: "blue", to: "cyan", deg: 90 }}
                    >
                      Total Pengeluaran{" "}
                      {values?.cash_out
                        ? `Rp. ${values.cash_out.toLocaleString("id-ID", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                        : "Rp. 0,00"}
                    </Text>
                  </Stack>

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="blue"
                      disabled={isLoadingUpdateDataCashFlow || isLoadingUpdateDataGoods || !debouncedGoods?.length}
                      loading={isLoadingUpdateDataCashFlow || isLoadingUpdateDataGoods}
                    >
                      Ubah
                    </Button>
                  </Group>
                </Form>
              </SimpleGrid>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default EditCashFlowReportModal;
