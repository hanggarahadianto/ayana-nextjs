import { Container, Text, Group, Select, Card, Image, SimpleGrid, Grid, GridCol } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";

const banks = [
  { id: 1, name: "BRI", logo: "/images/bri-logo.jpg" },
  { id: 2, name: "Bank BTN", logo: "/images/btn-logo.png" },
  { id: 3, name: "BTN Syariah", logo: "/images/btns-logo.jpg" },
  { id: 4, name: "Mandiri", logo: "/images/mandiri-logo.jpg" },
  { id: 5, name: "BSI", logo: "/images/bsi-logo.jpg" },
];

export function BankingPartnerComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <SimpleGrid cols={1} py="xl" bg={"#ece6dc"}>
      <Grid>
        <GridCol span={isMobile ? 12 : 8}>
          <Group p={isMobile ? 40 : 120} style={{ textAlign: isMobile ? "center" : "left" }}>
            <div>
              <Text c={"black"} fw={900} size={isMobile ? "lg" : "xl"} mb="xs">
                Our Banking Partner
              </Text>
              <Text
                c="orange"
                fw={700}
                style={{
                  fontSize: isMobile ? "1.8rem" : "3rem",
                  lineHeight: 1.2,
                }}
              >
                FIND THE FINANCIAL SOLUTION THAT SUITS YOU
              </Text>
            </div>
          </Group>
        </GridCol>
        <GridCol span={isMobile ? 12 : 4} p={isMobile ? 20 : 80} mt={isMobile ? 10 : 80}>
          <Text
            c={"black"}
            fw={600}
            size="sm"
            style={{
              maxWidth: 900,
              textAlign: isMobile ? "center" : "right",
              fontSize: isMobile ? "0.9rem" : "1rem",
            }}
          >
            Make your dream home possible with Cendana Home’s wide selection of partnership installments.
          </Text>
        </GridCol>
      </Grid>

      <Carousel slideSize="20%" slideGap="xl" withIndicators loop mb={80} p={40}>
        {banks.map((bank) => (
          <Carousel.Slide key={bank.id}>
            <Card shadow="sm" p="md" radius="md" withBorder bg={"white"}>
              <Image
                src={bank.logo}
                alt={bank.name}
                // height={1000}
                w={1000}
                style={{
                  maxWidth: 400, // Set the maximum width
                  maxHeight: 120, // Set the maximum height
                  objectFit: "contain", // Similar to fit="contain"
                }}
              />
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </SimpleGrid>
  );
}
