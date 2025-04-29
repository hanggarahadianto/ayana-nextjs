import AdminProjectDetailComponent from "@/components/page/admin/project/projectDetail/AdminProjectDetailComponent";

export default async function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const { projectId } = await params; // Menunggu params untuk tersedia
  return <AdminProjectDetailComponent projectId={projectId} />;
}
