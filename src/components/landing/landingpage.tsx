import React from "react";
import {
  AspectRatio,
  Container,
  Flex,
  Grid,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";

const demoProps = {
  mt: 0,
};

const imageSize = { height: 400, width: 500 };

const LandingPage = () => {
  return (
    <div>
      <Container {...demoProps} fluid h="215vh" bg="#25492c">
        <AspectRatio ratio={1080 / 1080} maw={1800} mx="auto">
          <Image
            className="rounded-tl-3xl"
            src="/images/new-in.jpg"
            height={600}
            width={900}
            alt=""
          />
        </AspectRatio>
        <Grid>
          <Grid.Col span={6}>
            <Stack p={40} ml={200}>
              <Image
                className="rounded-tl-3xl"
                src="/images/sublanding.png"
                height={300}
                width={300}
                alt=""
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack mt={140}>
              <Text
                size="xl"
                fw={900}
                c="darksalmon"
                style={{ fontFamily: "Lora", fontSize: "5rem" }}
              >
                LIVABLE CITY
              </Text>

              <Text
                mt={-40}
                fw={900}
                style={{ fontFamily: "Lora", fontSize: "2rem" }}
                variant="gradient"
                gradient={{ from: "white", to: "white", deg: 90 }}
              >
                Inside The City
              </Text>
              <Text
                size="xl"
                fw={300}
                variant="gradient"
                gradient={{ from: "white", to: "white", deg: 90 }}
              >
                True to our name, all we know do revolve around one simple,
                profound mission: To make your dream home a reality. This is to
                appreciate you hustlers, dreamers, and visionaries. Who dare to
                take responsibly the biggest leap of faith in life; to decide on
                a home of your own
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
        <Stack justify="center" align="center" mt={100}>
          <Text
            variant="gradient"
            gradient={{ from: "white", to: "cyan", deg: 90 }}
            style={{ fontFamily: "Lora", fontSize: "6rem" }}
          >
            Why Ayana
          </Text>
        </Stack>
      </Container>
      <SimpleGrid
        // mt={140}
        cols={1}
        style={{ backgroundColor: "#ece6dc" }}
        h="60vh"
        spacing="lg"
      >
        <Flex align="center" justify="center" mt={-340}>
          <Grid p="md">
            <Grid.Col span={12}>
              <Stack align="start">
                <Image
                  src="/images/home-card.jpg"
                  alt="STYLISH AFFORDABLE HOUSING"
                  height={imageSize.height}
                  width={imageSize.width}
                  style={{ borderRadius: "15px" }}
                />
                <Text
                  size="xl"
                  fw={900}
                  style={{ fontFamily: "Lora", color: "#af8967" }}
                >
                  STYLISH AFFORDABLE HOUSING
                </Text>

                <Text size="md" style={{ fontFamily: "Lora" }}>
                  Ayana presents affordable housing for you, fellow first
                  homeowner
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
          <Grid p="md">
            <Grid.Col span={12}>
              <Stack align="start">
                <Image
                  src="/images/school.jpg"
                  alt="INTEGRATED ECOSYSTEM"
                  height={imageSize.height}
                  width={imageSize.width}
                  style={{ borderRadius: "15px" }}
                />
                <Text
                  style={{ fontFamily: "Lora", color: "#af8967" }}
                  size="xl"
                  fw={900}
                >
                  INTEGRATED ECOSYSTEM
                </Text>
                <Text size="md" style={{ fontFamily: "Lora" }}>
                  Enjoy the integrated ecosystem for a more effective and
                  efficient life
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
          <Grid p="md">
            <Grid.Col span={12}>
              <Stack align="start">
                <Image
                  src="/images/happy.jpg"
                  alt="PLACE TO LIVE AND GROW"
                  height={imageSize.height}
                  width={imageSize.width}
                  style={{ borderRadius: "15px" }}
                />
                <Text
                  size="xl"
                  fw={900}
                  style={{ fontFamily: "Lora", color: "#af8967" }}
                >
                  PLACE TO LIVE AND GROW
                </Text>
                <Text size="md" style={{ fontFamily: "Lora" }}>
                  Plan your life for decases ahead with Cendana
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Flex>
        {/* </Group> */}
      </SimpleGrid>
    </div>
  );
};

export default LandingPage;
