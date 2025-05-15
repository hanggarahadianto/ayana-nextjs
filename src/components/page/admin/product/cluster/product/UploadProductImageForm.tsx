import React, { useEffect, useState } from "react";
import { Button, Group, Text, Card, Image, ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

interface UpdateImageFieldProps {
  onFilesChange: (files: File[]) => void;
  existingImages?: string[]; // URL
  onDeleteExistingImage?: (url: string) => void; // callback ke parent
}

const UpdateImageField: React.FC<UpdateImageFieldProps> = ({ onFilesChange, existingImages = [], onDeleteExistingImage }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);

  useEffect(() => {
    setExistingImageUrls(existingImages);
  }, [existingImages]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newFiles = [...selectedFiles, ...fileArray];
      setSelectedFiles(newFiles);
      onFilesChange(newFiles);
    }
  };

  const handleDeleteImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      const deletedUrl = existingImageUrls[index];
      const updated = existingImageUrls.filter((_, i) => i !== index);
      setExistingImageUrls(updated);
      onDeleteExistingImage?.(deletedUrl);
    } else {
      const updated = selectedFiles.filter((_, i) => i !== index - existingImageUrls.length);
      setSelectedFiles(updated);
      onFilesChange(updated);
    }
  };

  const combinedImages = [
    ...existingImageUrls.map((url) => ({ src: url, isExisting: true })),
    ...selectedFiles.map((file) => ({
      src: URL.createObjectURL(file),
      isExisting: false,
    })),
  ];

  return (
    <div>
      <Group justify="space-between">
        <Text size="md">Upload Gambar</Text>
        <ButtonAdd onClick={() => document.getElementById("fileInput")?.click()} size="3.5rem" />
      </Group>

      <SimpleGridGlobal cols={1} mt="40px" h="auto">
        <input type="file" accept="image/*" multiple id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />

        {combinedImages.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <h4>Preview Gambar:</h4>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {combinedImages.map((img, index) => (
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
                      src={img.src}
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
                      onClick={() => handleDeleteImage(index, img.isExisting)}
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
