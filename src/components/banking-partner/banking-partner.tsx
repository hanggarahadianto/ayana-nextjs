import {
  Container,
  Text,
  Group,
  Select,
  Card,
  Image,
  SimpleGrid,
  Grid,
  GridCol,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";

const banks = [
  { id: 1, name: "BRI", logo: "/images/bri-logo.jpg" },
  { id: 2, name: "Bank BTN", logo: "/images/btn-logo.png" },
  { id: 3, name: "BTN Syariah", logo: "/images/btns-logo.jpg" },
  { id: 4, name: "Mandiri", logo: "/images/mandiri-logo.jpg" },
  { id: 5, name: "BSI", logo: "/images/bsi-logo.jpg" },
];

export function BankingPartnerComponent() {
  return (
    <SimpleGrid cols={1} py="xl" bg={"#ece6dc"}>
      <Grid>
        <GridCol span={8}>
          <Group p={120}>
            <div>
              <Text fw={900} size="xl" mb="xs">
                Our Banking Partner
              </Text>
              <Text
                c="orange"
                fw={700}
                size="xl"
                style={{ lineHeight: 1.2, fontSize: "3rem" }}
              >
                FIND THE FINANCIAL SOLUTION THAT SUITS YOU
              </Text>
            </div>
          </Group>
        </GridCol>
        <GridCol span={4} p={80} mt={80}>
          <Text
            fw={600}
            size="sm"
            style={{ maxWidth: 900, textAlign: "right", fontSize: "1rem" }}
          >
            Make your dream home possible with Cendana Home’s wide selection of
            partnership installments.
          </Text>
        </GridCol>
      </Grid>

      <Carousel
        slideSize="20%"
        slideGap="xl"
        withIndicators
        loop
        mb={80}
        p={40}
      >
        {banks.map((bank) => (
          <Carousel.Slide key={bank.id}>
            <Card shadow="sm" p="md" radius="md" withBorder>
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
