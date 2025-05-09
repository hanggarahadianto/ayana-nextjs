import React, { useEffect } from "react";
import { Modal, Stack, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";

import BreathingActionIcon from "@/components/common/button/buttonAction";

interface EditProductModalProps {
  initialProductData: IProductUpdate | undefined;

  refetchProductData: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ initialProductData, refetchProductData }) => {
  const [opened, { open, close }] = useDisclosure(false);

  // console.log("INITIAL INFO DATA", initialInfoData);

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
          gradient="linear-gradient(135deg, #60A5FA, #3B82F6)"
        />
      </Stack>

      <Modal opened={opened} onClose={close} size="60rem" yOffset="100px">
        <Tabs defaultValue="edit-product">
          <Tabs.List>
            <Tabs.Tab value="edit-product">Edit Product</Tabs.Tab>
            <Tabs.Tab value="edit-info">Edit Info</Tabs.Tab>
            <Tabs.Tab value="upload-gambar">Upload Gambar</Tabs.Tab>
          </Tabs.List>

          {/* <Tabs.Panel value="edit-product" pt="md">
            <EditProductForm initialData={initialProductData} refetchProductData={refetchProductData} />
          </Tabs.Panel> */}

          {/* <Tabs.Panel value="edit-info" pt="md">
            <FormEditInfo initialData={initialInfoData || undefined} />
          </Tabs.Panel> */}

          {/* <Tabs.Panel value="upload-gambar" pt="md">
            <UploadGambar />
          </Tabs.Panel> */}
        </Tabs>
      </Modal>
    </>
  );
};

export default EditProductModal;
