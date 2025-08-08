import { formatCurrency } from "@/helper/formatCurrency";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { Badge, Group } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { houseSaleStatuses, paymentMethods } from "@/constants/dictionary";

export const columnsBaseCompany = (openEditModal: (row: ICompanyItem) => void, handleDeleteDataCustomer: (id: string) => void) => [
  { key: "name", title: "Nama", width: 200, minWidth: 200 },
  { key: "address", title: "Alamat", width: 200, minWidth: 200 },
  { key: "phone", title: "Nomor Telepon", width: 100, minWidth: 100 },

  //   {
  //     key: "home.title",
  //     title: "Produk",
  //     width: 260,
  //     minWidth: 260,
  //     render: (row: ICompanyItem) => row.home?.title ?? "-",
  //   },

  //   {
  //     key: "home.type",
  //     title: "Tipe",
  //     width: 90,
  //     minWidth: 90,
  //     render: (row: ICustomerItem) => row.home?.type ?? "-",
  //   },
  //   {
  //     key: "product_unit",
  //     title: "Unit",
  //     width: 90,
  //     minWidth: 90,
  //     render: (row: ICustomerItem) => row.product_unit ?? "-",
  //   },
  //   {
  //     key: "date_inputed",
  //     title: "Tanggal Transaksi",
  //     width: 160,
  //     minWidth: 160,
  //     render: (item: { date_inputed: string | Date }) => formatDateIndonesia(item.date_inputed),
  //   },

  //   {
  //     key: "payment_method",
  //     title: "Metode Pembayaran",
  //     width: 100,
  //     minWidth: 100,
  //     render: (row: ICustomerItem) => {
  //       // console.log("row", row);
  //       const method = paymentMethods.find((opt) => opt.value === row.payment_method);
  //       return method?.label ?? "-";
  //     },
  //   },

  //   {
  //     key: "marketer.name",
  //     title: "Marketing",
  //     width: 180,
  //     minWidth: 180,
  //     render: (row: ICustomerItem) => row.marketer?.name ?? "-",
  //   },
  //   {
  //     key: "aksi",
  //     title: "Aksi",
  //     width: 100,
  //     minWidth: 100,
  //     render: (row: ICustomerItem) => (
  //       <Group gap="lg">
  //         <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="1rem" />} size={"2.2rem"} />
  //         <ButtonDeleteWithConfirmation
  //           isLoading={false}
  //           onDelete={() => handleDeleteDataCustomer(row.id)}
  //           description={`Hapus konsumen ${row.name}?`}
  //           size={2.2}
  //         />
  //       </Group>
  //     ),
  //   },
];
