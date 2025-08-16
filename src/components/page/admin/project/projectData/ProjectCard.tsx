"use client";

import { Card, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { getProjectStatusDateWithColor } from "@/helper/formatStatusPorject";
import { projectStatusColors, projectStatusOptions } from "@/constants/dictionary";

interface ProjectCardAdminProps {
  project: IProjectItem;
  isLoading: boolean;
  handleDeleteProject: (id: string) => void;
}

const ProjectCardAdmin = ({ project, isLoading, handleDeleteProject }: ProjectCardAdminProps) => {
  const {
    text,
    sisaWaktu,
    color: progressColor,
  } = getProjectStatusDateWithColor(project.project_start ? project.project_start.toString() : "", String(project.project_time ?? ""));

  const normalizeStatus = (s?: string) => (s || "").toLowerCase().trim();

  // --- Map status -> label & color (pakai dictionary) ---
  const statusValue = normalizeStatus(project.project_status);
  const statusOption = projectStatusOptions.find((o) => o.value === statusValue);
  const statusLabel = statusOption?.label ?? (project.project_status || "");
  const statusColorName = projectStatusColors[statusValue] ?? "gray";

  const ribbonBg = `var(--mantine-color-${statusColorName}-6)`;

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
      {/* Ribbon status mirip label SALE */}
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
            {/* Hanya nama project yang jadi link */}
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

          <Group justify="space-between" align="start" style={{ borderRadius: 8 }}>
            <Stack gap={2} style={{ minHeight: 48 }}>
              <Text fw={600} c={progressColor}>
                {text}
              </Text>
              <Text
                size="xs"
                fw={300}
                c="red"
                style={{
                  visibility: progressColor === "green" ? "visible" : "hidden",
                  marginTop: -4,
                }}
              >
                {progressColor === "green" ? sisaWaktu : "placeholder"}
              </Text>
            </Stack>

            {/* Tombol delete aman, tidak ikut ke link */}
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
