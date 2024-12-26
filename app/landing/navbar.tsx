"use client";
import React from "react";
import {
  Paper,
  Text,
  Group,
  Button,
  Divider,
  Avatar,
  ScrollArea,
  useMantineTheme,
  Flex,
  SimpleGrid,
  Grid,
} from "@mantine/core";
// import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const theme = useMantineTheme();

  return (
    <Paper p="md" h={10}>
      <SimpleGrid bg="yellow" h={80}>
        <Flex justify={"space-between"}>
          <Avatar src="/images/ayana.png" size={80} radius="md" />

          {/* <Divider
            style={{
              margin: `${theme.spacing.md}px 0`,
            }}
          /> */}
          {/* <ScrollArea style={{ height: "calc(100vh - 200px)" }}> */}
          <Group justify="justify-end">
            {/* <Flex> */}
            <Button
              // component={Link}
              // to="/"
              variant="subtle"
              color="dark"
            >
              Home
            </Button>
            <Button
              // component={Link}
              // to="/about"
              variant="subtle"
              color="dark"
            >
              About
            </Button>
            <Button
              // component={Link}
              // to="/services"
              variant="subtle"
              color="dark"
            >
              Services
            </Button>
            <Button
              // component={Link}
              // to="/contact"
              variant="subtle"
              color="dark"
            >
              Contact
            </Button>
            {/* </Flex> */}
          </Group>
          {/* </ScrollArea> */}
        </Flex>
      </SimpleGrid>
    </Paper>
  );
};

export default NavbarComponent;
