import React, { useState } from "react";
import { Group, Text, Card, Image, ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

interface UpdateImageFieldProps {
  onFilesChange: (files: File[]) => void;
}

const UpdateImageField: React.FC<UpdateImageFieldProps> = ({ onFilesChange }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const MAX_FILE_SIZE = 2.5 * 1024 * 1024; // 2.5 MB

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const oversizedFiles: string[] = [];

    const validFiles = fileArray.filter((file) => {
      const isValid = file.size <= MAX_FILE_SIZE;
      if (!isValid) oversizedFiles.push(file.name);
      return isValid;
    });

    if (oversizedFiles.length > 0) {
      showNotification({
        title: "Error",
        message: `File melebihi 2.5 MB: ${oversizedFiles.join(", ")}`,
        color: "red",
      });
    }

    const newFiles = [...selectedFiles, ...validFiles];
    setSelectedFiles(newFiles);
    onFilesChange(newFiles);

    // Reset input agar bisa unggah file yang sama lagi
    event.target.value = "";
  };

  const handleDeleteImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div>
      <Group justify="space-between">
        <Text size="md">Upload Gambar</Text>
        <ButtonAdd onClick={() => document.getElementById("fileInput")?.click()} size="3.5rem" />
      </Group>

      <SimpleGridGlobal cols={1} mt="40px" h="auto">
        <input type="file" accept="image/*" multiple id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />

        {selectedFiles.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <h4>Preview Gambar:</h4>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {selectedFiles.map((file, index) => (
                <div key={index} style={{ position: "relative", textAlign: "center" }}>
                  <Text size="sm" fw={500} mb="5px">
                    {index === 0 ? "Thumbnail" : `Gambar ke-${index + 1}`}
                  </Text>
                  <Card
                    style={{
                      width: "120px",
                      height: "120px",
                      padding: 0,
                      overflow: "hidden",
                      position: "relative",
                    }}
                    shadow="sm"
                    radius="md"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`image-${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <ActionIcon
                      variant="filled"
                      color="red"
                      radius="xl"
                      size="lg"
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        zIndex: 2,
                      }}
                      onClick={() => handleDeleteImage(index)}
                    >
                      <IconX size="1rem" />
                    </ActionIcon>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </SimpleGridGlobal>
    </div>
  );
};

export default UpdateImageField;
