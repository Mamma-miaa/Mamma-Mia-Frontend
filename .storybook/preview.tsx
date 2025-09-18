import React from "react";
import type { Preview } from "@storybook/react-vite";
import globalStyles from "../src/styles/globalStyles";
import { Global } from "@emotion/react";
import Provider from "../src/Provider";

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
      <Provider>
        <Global styles={globalStyles} />
        <Story />
      </Provider>
    ),
  ],
};

export default preview;
