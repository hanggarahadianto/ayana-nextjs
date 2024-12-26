"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  AspectRatio,
  Container,
  Grid,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import ProductCard from "@/src/components/product/ProductCard";
import Image from "next/image";
import ProductsPage from "../product/page";

const demoProps = {
  mt: 100,
};

const LandingPage = () => {
  return (
    <>
      <Container {...demoProps} fluid h="45rem">
        <AspectRatio ratio={1080 / 1080} maw={1800} mx="auto">
          <Image
            className="rounded-tl-3xl"
            src="/images/image1.jpg"
            height={600}
            width={600}
            alt=""
          />
        </AspectRatio>
        <SimpleGrid cols={1}></SimpleGrid>
      </Container>
    </>
  );
};

export default LandingPage;
