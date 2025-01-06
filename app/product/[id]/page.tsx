"use client";

import Image from "next/image";
import React, { FC, use } from "react";

import { getDataProductDetail } from "@/src/api/products/getDataProductDetail";
import { useQuery } from "@tanstack/react-query";

interface HomeProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailPage: FC<HomeProps> = ({ params }) => {
  const unwrappedParams = use(params);
  //   console.log(unwrappedParams.id);
  //   console.log("hallo");

  const productId = unwrappedParams.id;
  console.log(productId);

  const {
    data: productDataDetail,
    isLoading: isLoadingGetProductData,
    refetch: refetchProductData,
  } = useQuery({
    queryKey: ["getProducDetailtData"],
    queryFn: () => getDataProductDetail(unwrappedParams.id),
    // enabled: !!token,
    refetchOnWindowFocus: false,
  });

  const queryClient = new QueryClient();

  return (
    <div>halo</div>

    // <div>
    //   <Image
    //     className="w-full hidden lg:block h-44 object-cover transition-transform duration-300 transform hover:scale-110"
    //     src={productDataDetail?.image}
    //     height="1000"
    //     width="1000"
    //     alt="logo"
    //   />

    //   <div className="lg:flex justify-center content-center bg-red-50 px-4 py-4 ">
    //     <section className="mt-10 w-full lg:px-12 lg:py-8 bg-slate-100 mr-16  rounded-lg shadow-2xl">
    //       <div className="border-b-2 border-b-gray-200 py-8 px-4">
    //         <div className={roboto.className}>
    //           <p className="text-4xl font-bold black">
    //             {productDataDetail.title}
    //           </p>
    //           <p className="font-semibold text-base text-black mt-1">
    //             {productDataDetail.address}
    //           </p>
    //         </div>
    //       </div>

    //       <div className="px-4 py-2">
    //         <Image
    //           className="w-full object-cover h-96 rounded-lg "
    //           src={productDataDetail.image}
    //           height="1000"
    //           width="1000"
    //           alt="logo"
    //         />
    //       </div>

    //       <div className="py-4 px-4">
    //         <div className="flex gap-x-12">
    //           <div className="flex gap-2">
    //             {/* <BedIcon className="text-black" /> */}
    //             <p className="font-semibold text-black">
    //               {productDataDetail.bedroom}
    //             </p>
    //           </div>
    //           <div className="flex gap-2">
    //             {/* <BathIcon className="text-black" /> */}
    //             <p className="font-semibold text-black">
    //               {productDataDetail.bathroom}
    //             </p>
    //           </div>
    //           <div className="flex gap-2">
    //             {/* <SquareGanttIcon className="text-black" /> */}
    //             <p className="font-semibold text-black">
    //               {productDataDetail.square}
    //             </p>
    //           </div>
    //         </div>
    //         <div className="py-10">
    //           <p>{productDataDetail.content}</p>
    //         </div>
    //       </div>
    //     </section>

    //     {/* ---------------------------------------------------- */}
    //     <section className="lg:w-96 w-full bg-slate-100 mt-10 shadow-2xl lg:mr-8">
    //       <div className="px-8 py-4 flex justify-center">
    //         <div className="border-b-gray-200 px-4 py-2 border-b-2 w-full flex content-center justify-center ">
    //           <p className="font-semibold">Make Reservation</p>
    //         </div>
    //       </div>
    //       <div className="flex justify-between px-4 py-4">
    //         <div className="bg-green-200"></div>
    //         {/* ------------------------- */}
    //         {/* <RequestForm params={params} /> */}

    //         {/* ------------------------- */}
    //       </div>

    //       <div className="border-b-gray-200 px-4 py-2 border-b-2 w-full flex content-center justify-center ">
    //         <p className="font-semibold">Call Our Marketing Team</p>
    //       </div>
    //       {/* <MarketingSpot /> */}
    //     </section>
    //   </div>
    // </div>
  );
};

export default ProductDetailPage;
