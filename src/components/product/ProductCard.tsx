import React from "react";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image }) => {
  console.log("id", id);
  return (
    <Card>
      {/* <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader> */}
      <CardBody className="overflow-visible py-2">
        {/* <Image
          height={180}
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        /> */}
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">{}</p>
          <p className=" text-default-400 text-small">{id}</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">{name}</p>
          {/* <p className="text-default-400 text-small">Followers</p> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
