import React, { useEffect, useState } from "react";
import { Group, Text, Card, Image, ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

interface ExistingImage {
  id: string;
  url: string;
}

interface UpdateImageFieldProps {
  onFilesChange: (files: File[]) => void;
  onKeepIdsChange: (ids: string[]) => void;
  existingImages?: ExistingImage[];
}

const UpdateImageField: React.FC<UpdateImageFieldProps> = ({ onFilesChange, onKeepIdsChange, existingImages = [] }) => {
  //   console.log("existing image", existingImages);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [keepImageIds, setKeepImageIds] = useState<string[]>([]);

  //   console.log("selected di component", selectedFiles);
  //   console.log("keep di com[ponent", keepImageIds);

  useEffect(() => {
    if (Array.isArray(existingImages) && existingImages.length > 0) {
      const newIds = existingImages.map((img) => img.id);
      setKeepImageIds(newIds);
      onKeepIdsChange(newIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingImages]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);

    onFilesChange(newFiles);
  };

  const renderImages = () => {
    const filteredExistingImages = (existingImages ?? []).filter((img) => keepImageIds.includes(img.id));
    // console.log("Filtered existing images:", filteredExistingImages);

    // Buat array gabungan dengan info id untuk setiap gambar
    const images = [
      ...filteredExistingImages.map((img) => ({ id: img.id, src: img.url, isExisting: true })),
      ...selectedFiles.map((file, idx) => ({ id: `new-${idx}`, src: URL.createObjectURL(file), isExisting: false })),
    ];

    return images.map((img) => (
      <div key={img.id} style={{ position: "relative", textAlign: "center" }}>
        <Text size="sm" fw={500} mb="5px">
          {img.isExisting ? "Thumbnail" : `Gambar baru`}
        </Text>
        <Card
          style={{
            width: 120,
            height: 120,
            marginBottom: 10,
            padding: 0,
            overflow: "hidden",
            position: "relative",
          }}
          padding="lg"
          shadow="sm"
          radius="md"
        >
          <Image
            src={img.src}
            alt={`image-${img.id}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 8,
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
              cursor: "pointer",
            }}
            onClick={() => handleDeleteImage(img.id, img.isExisting)}
          >
            <IconX size="1rem" />
          </ActionIcon>
        </Card>
      </div>
    ));
  };

  const handleDeleteImage = (id: string, isExisting: boolean) => {
    if (isExisting) {
      // hapus dari keepImageIds berdasar id
      const updatedIds = keepImageIds.filter((keepId) => keepId !== id);
      console.log("Removing existing image ID:", id);
      setKeepImageIds(updatedIds);
      onKeepIdsChange(updatedIds);
    } else {
      // hapus dari selectedFiles berdasar id (id berupa 'new-idx'), ambil idx-nya
      const index = Number(id.split("-")[1]);
      if (!isNaN(index)) {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        console.log("Removing new selected file index:", index);
        setSelectedFiles(updatedFiles);
        onFilesChange(updatedFiles);
      }
    }
  };

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

        {(selectedFiles.length > 0 || keepImageIds.length > 0) && (
          <div>
            <h4>Preview Gambar:</h4>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{renderImages()}</div>
          </div>
        )}
      </SimpleGridGlobal>
    </div>
  );
};

export default UpdateImageField;
