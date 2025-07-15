import { useState } from "react";
import { Button, FileInput, Title, Text, Card, Stack, rem, Flex } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useUploadPresence } from "@/api/employee/uploadPresence";

export default function UploadPresence() {
  const [file, setFile] = useState<File | null>(null);

  const { mutate: uploadPresence, isPending: isUploading } = useUploadPresence(() => {
    setFile(null);
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 800, margin: "0 auto" }}>
      <Stack gap="md">
        <Title order={3} c="green.8">
          Upload Presensi Excel
        </Title>

        <Text size="sm" c="dimmed">
          Pastikan file berformat <strong>.xlsx</strong> dan sesuai dengan template sistem.
        </Text>

        <Flex direction={{ base: "column", sm: "row" }} gap="md" justify="space-between" align="flex-end" wrap="wrap">
          <FileInput
            label="Pilih File Presensi"
            w={200}
            placeholder="Presensi.xlsx"
            value={file}
            onChange={setFile}
            accept=".xlsx"
            clearable
            radius="md"
            withAsterisk
            style={{ flex: 1, minWidth: "250px" }}
          />

          <Button
            onClick={() => file && uploadPresence(file)}
            loading={isUploading}
            disabled={!file}
            leftSection={<IconUpload size={18} />}
            radius="md"
            color="green"
            style={{ width: rem(130) }}
          >
            Upload
          </Button>
        </Flex>
      </Stack>
    </Card>
  );
}
