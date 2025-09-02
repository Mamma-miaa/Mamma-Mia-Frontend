import React from "react";
import type { Preview } from "@storybook/react-vite";
import globalStyles from "../src/styles/globalStyles";
import { Global } from "@emotion/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Global styles={globalStyles} />
        <Story />
      </>
    ),
  ],
};

export default preview;
