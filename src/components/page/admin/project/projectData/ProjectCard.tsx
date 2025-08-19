"use client";

import { Card, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { projectStatusOptions } from "@/constants/dictionary";

interface ProjectCardAdminProps {
  project: IProjectItem;
  isLoading: boolean;
  handleDeleteProject: (id: string) => void;
}

const ProjectCardAdmin = ({ project, isLoading, handleDeleteProject }: ProjectCardAdminProps) => {
  // Ambil label sesuai status
  const statusOption = projectStatusOptions.find((opt) => opt.value === project.project_status);
  const statusLabel = project.status_text || statusOption?.label || "Tidak diketahui";

  const ribbonBg = `var(--mantine-color-${project.color}-6)`;

  // console.log("project", project);

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
        overflow: "hidden",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Ribbon status */}
      <div
        aria-label={`Status proyek: ${statusLabel}`}
        style={{
          position: "absolute",
          top: "14px",
          right: "-42px",
          transform: "rotate(45deg)",
          background: ribbonBg,
          color: "white",
          padding: "6px 44px",
          fontSize: "12px",
          fontWeight: 800,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          pointerEvents: "none",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "160px",
          textAlign: "center",
        }}
      >
        {statusLabel}
      </div>

      <Stack>
        <Link href={`/admin/sidebar/project/${project.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Stack align="start" gap="md">
            <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
              {project?.project_name}
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
        </Link>

        <Stack>
          <Text fw={200} size="sm" style={{ color: "#ffffff" }}>
            {formatDateIndonesia(project.project_start ?? "")} - {formatDateIndonesia(project.project_end ?? "")}
          </Text>

          {/*  */}
          <Group justify="space-between" align="start" style={{ borderRadius: 8 }}>
            <Stack gap={2} style={{ minHeight: 48 }}>
              <Text fw={600} c={project.color}>
                {project.status_text || statusLabel}
              </Text>

              {project.finish_status && (
                <Text size="xs" fw={300} c={project.is_on_time ? "green" : "red"} mt={-4}>
                  {project.finish_status}
                </Text>
              )}
            </Stack>
            {/*  */}

            {/* Tombol delete */}
            <ButtonDeleteWithConfirmation
              isLoading={isLoading}
              onDelete={() => handleDeleteProject(project?.id)}
              description={`Apakah anda ingin menghapus proyek ${project.project_name} ?`}
              size={2.5}
            />
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProjectCardAdmin;
