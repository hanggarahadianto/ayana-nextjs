"use client";

import { Card, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { getProjectStatusDateWithColor } from "@/helper/formatStatusPorject";

interface ProjectCardAdminProps {
  project: IProjectItem;
  onDelete: (id: string) => void;
}

const ProjectCardAdmin = ({ project, onDelete }: ProjectCardAdminProps) => {
  const { text, sisaWaktu, color } = getProjectStatusDateWithColor(project.project_start, project.project_time);

  return (
    <Card
      key={project.id}
      style={{
        background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
        backdropFilter: "blur(8px)",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        transform: "scale(1)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Link href={`/admin/sidebar/project/${project.id}`} passHref style={{ textDecoration: "none" }}>
        <Stack>
          <Stack align="start" gap="md">
            <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
              {project.project_name}
            </Text>

            <Text mt={-12} fw={500} size="sm" style={{ color: "#ffffff" }}>
              {project.project_leader}
            </Text>

            <Text mt={-12} fw={500} style={{ color: "#ffffff" }}>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(project.total_cost || 0)}
            </Text>
          </Stack>

          <Stack>
            <Text fw={200} size="sm" style={{ color: "#ffffff" }}>
              {formatDateIndonesia(project.project_start)} - {formatDateIndonesia(project.project_end)}
            </Text>

            <Group justify="space-between" align="start" style={{ borderRadius: 8 }}>
              <Stack gap={2} style={{ minHeight: 48 }}>
                <Text fw={600} c={color}>
                  {text}
                </Text>
                <Text size="xs" fw={300} c="red" style={{ visibility: color === "green" ? "visible" : "hidden", marginTop: -4 }}>
                  {color === "green" ? sisaWaktu : "placeholder"}
                </Text>
              </Stack>

              <ButtonDeleteWithConfirmation
                id={project.id}
                onDelete={onDelete}
                description={`Apakah anda ingin menghapus proyek ${project?.project_name} ?`}
                size={2.5}
              />
            </Group>
          </Stack>
        </Stack>
      </Link>
    </Card>
  );
};

export default ProjectCardAdmin;
