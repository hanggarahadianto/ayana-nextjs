import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import AdminProjectPageComponent from "@/components/page/admin/project/ProjectAdminComponent";
import { getDataProject } from "@/api/project/getDataProject";

export default async function AdminProjectPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getProjectData"],
    queryFn: getDataProject,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminProjectPageComponent />
    </HydrationBoundary>
  );
}
