import { createTheme, MantineTheme } from "@mantine/core";

const theme = createTheme({
  // ... other theme settings ...
  other: {
    textStyles: {
      A1: {
        fontSize: "3xl",
        fontWeight: 700,
        fontFamily: `
          Poppins,
          ui-sans-serif,
          system-ui,
          sans-serif,
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji"
        `,
        styles: {
          root: {
            marginTop: 20,
          },
        },
      },
    },
  },
});

export default theme;
