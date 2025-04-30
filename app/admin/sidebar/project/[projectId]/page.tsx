import AdminProjectDetailComponent from "@/components/page/admin/project/projectDetail/AdminProjectDetailComponent";

export default async function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  return <AdminProjectDetailComponent projectId={params.projectId} />;
}
