import { APIAxiosInstance } from "@/lib";

interface GetDataCustomerParams {
  page?: number;
  limit?: number;
}

export const getDataCustomer = async ({ page = 1, limit = 10 }: GetDataCustomerParams) => {
  const params = new URLSearchParams({});

  params.append("page", String(page));
  params.append("limit", String(limit));

  const url = `customer/get?${params.toString()}`;
  // console.log("URL request:", url);

  const response = await APIAxiosInstance.get(url);
  return response.data as ICustomerResponse;
};
