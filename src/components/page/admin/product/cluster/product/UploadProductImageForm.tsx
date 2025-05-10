// components/UploadImageField.tsx
import React, { useState } from "react";
import { Button, Group, Text, Card, Image } from "@mantine/core"; // Import tambahan Card dan Image
import ButtonAdd from "@/components/common/button/buttonAdd"; // Import ButtonAdd
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

interface UploadImageFieldProps {
  onFilesChange: (files: File[]) => void;
}

const UploadImageField: React.FC<UploadImageFieldProps> = ({ onFilesChange }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Handle file change, menambahkan file baru ke dalam array selectedFiles
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files); // Mengonversi objek FileList menjadi array
      const newFiles = [...selectedFiles, ...fileArray]; // Menambahkan gambar baru ke array
      setSelectedFiles(newFiles);
      onFilesChange(newFiles); // Mengirim array gambar terbaru ke parent
    }
  };

  return (
    <div>
      {/* Label untuk upload gambar */}
      <Group justify="flex-end">
        <Text size="md" fw={200}>
          Upload Gambar
        </Text>

        {/* ButtonAdd untuk memicu klik pada input file */}
        <ButtonAdd onClick={() => document.getElementById("fileInput")?.click()} size="3.5rem" />
      </Group>

      <SimpleGridGlobal cols={1} mt={"40px"} h={"260px"}>
        {/* Input file yang tersembunyi */}
        <input
          type="file"
          accept="image/*"
          multiple
          id="fileInput"
          style={{ display: "none" }} // Menyembunyikan input file
          onChange={handleFileChange}
        />

        {/* Menampilkan gambar yang dipilih */}
        {selectedFiles.length > 0 && (
          <div>
            <h4>Preview Gambar:</h4>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {selectedFiles.map((file, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                  {/* Menampilkan label "Thumbnail" di luar card */}
                  <Text size="sm" fw={500} mb="5px">
                    {index === 0 ? "Thumbnail" : `Gambar ke ${index + 1}`}
                  </Text>
                  <Card
                    style={{
                      width: "120px",
                      height: "120px", // Ukuran tetap untuk card
                      marginBottom: "10px",
                      padding: "0",
                      overflow: "hidden",
                    }}
                    padding="lg"
                    shadow="sm"
                    radius="md"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // Gambar akan menyesuaikan dengan ukuran card
                        borderRadius: "8px",
                      }}
                    />
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
