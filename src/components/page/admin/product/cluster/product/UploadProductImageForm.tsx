import React, { useEffect, useState } from "react";
import { Button, Group, Text, Card, Image, ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

interface UploadImageFieldProps {
  onFilesChange: (files: File[]) => void;
  existingImages?: string[]; // URL gambar yang sudah ada
}

const UploadImageField: React.FC<UploadImageFieldProps> = ({ onFilesChange, existingImages = [] }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(existingImages);

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
      const updatedExisting = existingImageUrls.filter((_, i) => i !== index);
      setExistingImageUrls(updatedExisting);
      // NOTE: jika ingin kirim info ke parent bahwa existing image dihapus, buat callback khusus
    } else {
      const updatedFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(updatedFiles);
      onFilesChange(updatedFiles);
    }
  };

  const combinedImages = [
    ...existingImageUrls.map((url) => ({ src: url, isExisting: true })),
    ...selectedFiles.map((file) => ({ src: URL.createObjectURL(file), isExisting: false })),
  ];

  return (
    <div>
      <Group justify="flex-end">
        <Text size="md" fw={200}>
          Upload Gambar
        </Text>
        <ButtonAdd onClick={() => document.getElementById("fileInput")?.click()} size="3.5rem" />
      </Group>

      <SimpleGridGlobal cols={1} mt="40px" h="260px">
        <input type="file" accept="image/*" multiple id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />

        {combinedImages.length > 0 && (
          <div>
            <h4>Preview Gambar:</h4>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {combinedImages.map((img, index) => (
                <div key={index} style={{ position: "relative", textAlign: "center" }}>
                  <Text size="sm" fw={500} mb="5px">
                    {index === 0 ? "Thumbnail" : `Gambar ke ${index + 1}`}
                  </Text>
                  <Card
                    style={{
                      width: "120px",
                      height: "120px",
                      marginBottom: "10px",
                      padding: "0",
                      overflow: "hidden",
                      position: "relative",
                    }}
                    padding="lg"
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
                        borderRadius: "8px",
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

export default UploadImageField;
