import {
  AspectRatio,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";

const demoProps = {
  mt: 0,
};

export function AboutComponent() {
  return (
    <Container {...demoProps} fluid h="160vh" bg={"#ece6dc"}>
      <AspectRatio ratio={1080 / 1080} maw={1800} mx="auto">
        <Image
          className="rounded-tl-3xl"
          src="/images/company.jpg"
          height={900}
          width={900}
          alt=""
        />
      </AspectRatio>
      <Text
        ml={60}
        mt={-400}
        fw={900}
        c="white"
        style={{ fontFamily: "Lora", fontSize: "9rem" }}
      >
        ARSHAKA
      </Text>
      <Text
        p={60}
        mt={-100}
        fw={900}
        c="white"
        style={{ fontFamily: "Lora", fontSize: "6.5rem" }}
      >
        GRIYA AYANA
      </Text>
      <Grid mt={40}>
        {/* About Us Section */}
        <Grid.Col span={12}>
          <Stack align="center">
            <Card
              w={1500}
              shadow="sm"
              p="lg"
              style={{ background: "rgba(255, 255, 255, 0.9)" }}
            >
              <Stack align="center">
                <Text size="xl">OUR HISTORY</Text>
              </Stack>
              <Text mt="md">
                Pendirian perusahaan pada tanggal 23 Januari 2023 melalui
                Notaris Charenina Dewirani, S.H., M.Kn Seiring dengan
                perkembangan perusahaan, PT. Arshaka Griya Ayana yang terkait
                oleh aturan yang berlaku di wilayah Negara Republik Indonesia
                dan pemerintah Provinsi Jawa Tengah dengan aspek hukum dan
                legalitas sebagai berikut : 1. Akta Pendirian. 2. SK
                KEMENKUMHAM. 3. Akta Perubahan 4. SK KEMENKUMHAM : Charenina
                Dewirani, S.H., M.Kn Tanggal 31 Desember 2013 -3- Tanggal 5
                Januari 2023 : AHU-0001393.AH.01.01.TAHUN 2023 : -6- Tanggal 24
                Februari 2024 : AHU-0002901.AH.01.02.TAHUN 2024
              </Text>
            </Card>
          </Stack>
        </Grid.Col>

        {/* History Section */}
        <Grid.Col span={12}>
          <Card
            shadow="sm"
            p="lg"
            style={{ background: "rgba(255, 255, 255, 0.9)" }}
          >
            <Text size="xl">Our History</Text>
            <Text mt="md">
              Established on January 5, 2023, through Notary Charenina Dewirani,
              S.H., M.Kn, PT Arshaka Griya Ayana adheres to Indonesian
              regulations and legalities.
            </Text>
          </Card>
        </Grid.Col>

        {/* Vision & Mission Section */}
        <Grid.Col span={12}>
          <Card
            shadow="sm"
            p="lg"
            style={{ background: "rgba(255, 255, 255, 0.9)" }}
          >
            <Text size="xl">Vision & Mission</Text>
            <Text mt="md">
              Menjadi Perusahaan terdepan yang memenuhi kebutuhan masyarakat
              serta keuntungan investasi melalui manajemen profesional yang
              fokus terhadap peningkatan kualitas sumber daya manusia
              Memaksimalkan kepuasan masyarakat dengan memberi investasi yang
              layak melalui layanan produk bermutu tinggi, dan jaminan keamanan
              konsumen
            </Text>
            <Text mt="md">
              Konsumen merasa puas terhadap produk dan jasa yang didapatkan dan
              sebanding dengan yang diinvestasikan Menghargai SDM pada unit
              bisnis pada harkatnya sebagai manusia, memberikan dan menciptakan
              peluang guna meningkatkan kesejahteraa dengan menerapkan prinsip
              win-win Rate of return yang diperoleh pemilik sesuai dengan yang
              diharapkan, mendorong pertumbuhan investasi & ekonomi, serta
              menciptakan lapangan kerja baru dan memberikan pemasukan kepada
              pemerintah daerah Jaminan keamanan dengan penerapan Sistem
              Manajemen Mutu yang telah ditetapkan oleh PT.Arshaka Griya Ayana,
              sistem ini selaras dengan persyaratan ISO 9001 : 2000 dan
              perangkat mutu untuk menjamin semua proses yang dilakukanmemi
            </Text>
          </Card>
        </Grid.Col>

        {/* Projects Section */}
        {/* <Grid.Col span={12}>
          <Card
            shadow="sm"
            p="lg"
            style={{ background: "rgba(255, 255, 255, 0.9)" }}
          >
            <Text size="xl">Our Projects</Text>
            <Group mt="md">
              <Card shadow="md" style={{ width: "300px" }}>
                <Card.Section>
                  <Image src="/ayana_bumi.jpg" alt="Ayana Bumi" height={160} />
                </Card.Section>
                <Text mt="md">Perumahan Ayana Bumi Wirasana</Text>
                <Text size="sm">Starting from IDR 178,000,000</Text>
              </Card>

              <Card shadow="md" style={{ width: "300px" }}>
                <Card.Section>
                  <Image
                    src="/griya_ayana.jpg"
                    alt="Griya Ayana"
                    height={160}
                  />
                </Card.Section>
                <Text mt="md">Perumahan Griya Ayana Wirasana</Text>
                <Text size="sm">Starting from IDR 240,000,000</Text>
              </Card>
            </Group>
          </Card>
        </Grid.Col> */}

        {/* Contact Us Section */}
      </Grid>
    </Container>
  );
}
