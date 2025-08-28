import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Text, Stack, SimpleGrid, Grid, Divider } from "@mantine/core";
import { Form, Formik } from "formik";
import { showNotification } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import { validationSchemaCashFlowCreate } from "@/utils/validation/cashFlow-validation";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import FormGoods from "./FormGoods";
import { useUpdateCashFlowForm } from "@/api/cash-flow/editDataCashFlow";
import { useEditGoodForm } from "@/api/good/editGoods";
import { useDeleteDataCashFlow } from "@/api/cash-flow/deleteDataCashFlow";
import { useQuery } from "@tanstack/react-query";
import { getDataGoodsByCashFlowId } from "@/api/good/getDataGoodsByCashFlowId";
import { getInitialValuesCashFlow } from "@/utils/initialValues/initialValuesCashFlow";
import LoadingGlobal from "@/styles/loading/loading-global";
import ButtonDeleteWithConfirmation from "@/components/common/button/ButtonDeleteWithConfirmation";

const EditCashFlowReportModal = ({
  projectName,
  refetchCashFlowData,
  cashFlowData = [],
}: {
  projectName: string;
  refetchCashFlowData: () => void;
  cashFlowData?: ICashFlowUpdate[];
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCashFlowWeek, setSelectedCashFlowWeek] = useState<ICashFlowUpdate | null>(null);

  const earliestCashFlow = useMemo(() => {
    return [...(cashFlowData || [])].sort((a, b) => Number(a.week_number) - Number(b.week_number))[0];
  }, [cashFlowData]);

  useEffect(() => {
    if (!selectedCashFlowWeek || !cashFlowData?.some((cf) => cf.id === selectedCashFlowWeek.id)) {
      if (earliestCashFlow) {
        setSelectedCashFlowWeek(earliestCashFlow);
      }
    }
  }, [cashFlowData, selectedCashFlowWeek, earliestCashFlow]);

  const weekOptions = useMemo(() => {
    return cashFlowData.map((item) => ({
      label: `Minggu Ke ${item.week_number}`,
      value: item.week_number,
    }));
  }, [cashFlowData]);

  const handleWeekChange = (weekNumber: string | null, setFieldValue: (field: string, value: any) => void) => {
    const selected = cashFlowData.find((item) => item.week_number === weekNumber);
    if (selected) {
      setSelectedCashFlowWeek(selected);
      setFieldValue("week_number", selected.week_number);
      setFieldValue("cash_in", selected.cash_in);
      setFieldValue("cash_out", selected.cash_out);
    }
  };

  const [page, setPage] = useState(1);

  const {
    data: goodsData,
    isLoading: isLoadingGoodsData,
    refetch: refetchGoodsData,
  } = useQuery({
    queryKey: ["getGoodsData", selectedCashFlowWeek?.id, page],
    queryFn: async () => {
      if (!selectedCashFlowWeek?.id) {
        throw new Error("No Cash Flow ID selected");
      }
      return await getDataGoodsByCashFlowId(selectedCashFlowWeek.id, page, 10000);
    },
    enabled: !!selectedCashFlowWeek?.id,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: updateDataCashFlow, isPending: isLoadingUpdateDataCashFlow } = useUpdateCashFlowForm();
  const { mutateAsync: updateDataGoods, isPending: isLoadingUpdateDataGoods } = useEditGoodForm();
  const { mutate: mutateDeleteDataCashFlow, isPending: isLoadingDeleteDataCashFlow } = useDeleteDataCashFlow(
    refetchCashFlowData,
    refetchGoodsData,
    close
  );

  const handleSubmit = async (values: ICashFlowUpdate) => {
    try {
      const selectedId = selectedCashFlowWeek?.id || earliestCashFlow?.id;
      if (!selectedId) {
        console.error("Tidak ada ID Cash Flow yang tersedia.");
        return;
      }

      updateDataCashFlow(
        { id: selectedId, values },
        {
          onSuccess: async () => {
            const goodsWithCashFlowId = (values.good || []).map((good) => ({
              ...good,
              cash_flow_id: selectedId,
            }));

            await updateDataGoods(goodsWithCashFlowId);
            await refetchGoodsData();
            await refetchCashFlowData();

            showNotification({
              title: "Berhasil",
              message: "Data berhasil diperbarui.",
              color: "green",
            });
            close();
          },
          onError: (error) => {
            console.error("Gagal update cash flow:", error);
            showNotification({
              title: "Gagal",
              message: "Gagal memperbarui data.",
              color: "red",
            });
          },
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteCashFlow = (idToDelete: string) => {
    mutateDeleteDataCashFlow(idToDelete);
  };

  return (
    <>
      <BreathingActionIcon
        onClick={open}
        size="2.5rem"
        icon={<IconPencil size="1.5rem" />}
        gradient="linear-gradient(135deg, #60A5FA, #3B82F6)"
      />
      <Modal opened={opened} onClose={close} size="100%" yOffset="180px">
        <Formik
          validationSchema={validationSchemaCashFlowCreate}
          initialValues={{
            ...getInitialValuesCashFlow(selectedCashFlowWeek || earliestCashFlow),
            good: goodsData?.data || [],
          }}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
        >
          {({ values, errors, touched, setFieldValue }) => {
            // console.log("values", values);
            // console.log("ERROR", errors);
            const calculateCashOut = useCallback(() => {
              return (values.good || []).reduce((acc, good) => acc + (good.total_cost || 0), 0);
            }, [values.good]);

            const accountBalance = useMemo(() => {
              return values.cash_in - calculateCashOut();
            }, [values.cash_in, calculateCashOut]);

            useEffect(() => {
              setFieldValue("cash_out", calculateCashOut());
            }, [values.good, setFieldValue, calculateCashOut]);

            return (
              <SimpleGrid p={20}>
                <LoadingGlobal visible={isLoadingUpdateDataCashFlow || isLoadingUpdateDataGoods} />
                <Form>
                  <Grid>
                    <Grid.Col span={8}>
                      <Text size="xl" fw={900}>
                        {`EDIT BUKU KAS UMUM - ${projectName}`}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Stack justify="end" align="end" w="100%">
                        <Grid w={400}>
                          <Grid.Col span={6}>
                            <Text size="md">💰 Uang Masuk</Text>
                            <Text size="md">💸 Uang Keluar</Text>
                            <Text size="md" fw={700} c={accountBalance < 0 ? "red" : "green"}>
                              🔹 Uang Tersisa
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={6}>
                            <Text>Rp {values.cash_in?.toLocaleString()}</Text>
                            <Text>Rp {values.cash_out.toLocaleString()}</Text>
                            <Text c={accountBalance < 0 ? "red" : "green"}> : Rp {accountBalance.toLocaleString()}</Text>
                          </Grid.Col>
                        </Grid>
                      </Stack>
                    </Grid.Col>
                  </Grid>

                  <Group>
                    <Select
                      label="Minggu Ke"
                      placeholder="Pilih Minggu"
                      value={selectedCashFlowWeek?.week_number || values.week_number}
                      onChange={(value) => handleWeekChange(value, setFieldValue)}
                      data={weekOptions}
                      error={touched.week_number && errors.week_number ? errors.week_number : undefined}
                      required
                    />
                    <TextInput
                      label="Uang Masuk"
                      value={values?.cash_in ? `Rp. ${values?.cash_in.toLocaleString("id-ID")}` : ""}
                      placeholder="Masukan Uang Masuk"
                      onChange={(e) => {
                        const numericValue = Number(e.target.value.replace(/\D/g, ""));
                        setFieldValue("cash_in", isNaN(numericValue) ? 0 : numericValue);
                      }}
                      w={400}
                      error={touched.cash_in && errors.cash_in ? errors.cash_in : undefined}
                    />

                    {values?.id && (
                      <Stack mt={24}>
                        <ButtonDeleteWithConfirmation
                          isLoading={false}
                          onDelete={() => handleDeleteCashFlow(values.id)}
                          description={`Apakah anda ingin menghapus data minggu ke ${values?.week_number}`}
                          size={2.5}
                        />
                      </Stack>
                    )}
                  </Group>

                  <Divider mt={20} />
                  <LoadingGlobal visible={isLoadingGoodsData} />
                  <FormGoods
                    goods={values.good || []}
                    onGoodsChange={(updatedGoods) => setFieldValue("good", updatedGoods)}
                    isCreateMode={false}
                    error={(errors.good as any) || []}
                    touched={(touched.good as any) || []}

                    // limit={limit}
                  />

                  <Stack justify="flex-start" align="start">
                    <Text size="md" fw={500} c="blue" mt="md" variant="gradient" gradient={{ from: "blue", to: "cyan", deg: 90 }}>
                      Total Pengeluaran{" "}
                      {values.cash_out
                        ? `Rp. ${values.cash_out.toLocaleString("id-ID", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                        : "Rp. 0,00"}
                    </Text>
                  </Stack>

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      color="blue"
                      disabled={isLoadingUpdateDataCashFlow || isLoadingUpdateDataGoods}
                      loading={isLoadingUpdateDataCashFlow || isLoadingUpdateDataGoods}
                    >
                      Simpan Perubahan
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
