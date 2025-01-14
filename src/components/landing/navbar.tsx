import { Flex, Stack, Image } from "@mantine/core";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Stack
      mb={-16}
      bg="#beab96"
      p="md"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
    >
      <Flex justify="space-between" align="center">
        <Link href={"/"} passHref>
          <Image
            className="rounded-tl-3xl"
            src="/images/ayana.png"
            height={60}
            width={60}
            alt=""
            style={{ borderRadius: "15px" }}
          />
        </Link>
      </Flex>
    </Stack>
  );
};
