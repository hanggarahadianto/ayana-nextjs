import React, { useEffect } from "react";
import { Modal, Stack, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";

import BreathingActionIcon from "@/lib/button/buttonAction";
import EditProductForm from "./FormEditProduct";
import FormEditInfo from "./FormEditInfo";

interface EditProductModalProps {
  initialProductData: IProductUpdate | undefined;
  initialInfoData: IInfoCreate | undefined;
  refetchProductData: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ initialProductData, initialInfoData, refetchProductData }) => {
  const [opened, { open, close }] = useDisclosure(false);

  console.log("INITIAL INFO DATA", initialInfoData);

  useEffect(() => {
    if (initialProductData) {
      // Optional: perform actions when initialData changes
    }
  }, [initialProductData]);

  return (
    <>
      <Stack>
        <BreathingActionIcon
          onClick={open}
          size="2.5rem"
          icon={<IconEdit size="1rem" />}
          gradient="linear-gradient(135deg, #93C5FD, #BFDBFE)"
        />
      </Stack>

      <Modal opened={opened} onClose={close} size="60rem" yOffset="100px">
        <Tabs defaultValue="edit-product">
          <Tabs.List>
            <Tabs.Tab value="edit-product">Edit Product</Tabs.Tab>
            <Tabs.Tab value="edit-info">Edit Info</Tabs.Tab>
            <Tabs.Tab value="upload-gambar">Upload Gambar</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="edit-product" pt="md">
            <EditProductForm initialData={initialProductData} refetchProductData={refetchProductData} />
          </Tabs.Panel>

          <Tabs.Panel value="edit-info" pt="md">
            <FormEditInfo initialData={initialInfoData || undefined} />
          </Tabs.Panel>

          {/* <Tabs.Panel value="upload-gambar" pt="md">
            <UploadGambar />
          </Tabs.Panel> */}
        </Tabs>
      </Modal>
    </>
  );
};

export default EditProductModal;
