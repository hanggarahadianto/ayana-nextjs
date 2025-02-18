import { GetServerSidePropsContext } from "next";

export const checkAuthRedirect = (context: GetServerSidePropsContext) => {
  // Check if token exists in cookies before page render
  if (context.req.cookies.token) {
    return {
      redirect: {
        destination: "/internal/sidebar/product",
        permanent: false,
      },
    };
  }
  return null; // No redirect needed
};
