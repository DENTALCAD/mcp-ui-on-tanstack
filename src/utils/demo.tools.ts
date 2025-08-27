import { tool } from "ai";
import { z } from "zod";
import { createUIResource } from "@mcp-ui/server";

import guitars from "../data/example-guitars";

const getGuitars = tool({
  description: "Get all products from the database",
  inputSchema: z.object({}),
  execute: async () => {
    return Promise.resolve(guitars);
  },
});

const recommendGuitar = tool({
  description: "Use this tool to recommend a guitar to the user",
  inputSchema: z.object({
    id: z.string().describe("The id of the guitar to recommend"),
  }),
  execute: async ({ id }) => {
    return createUIResource({
      uri: `ui://my-tool/simpleIframe/${id}`,
      content: {
        type: "externalUrl",
        iframeUrl: `http://localhost:3000/iframe-guitar/${id}`,
      },
      encoding: "text",
    });
  },
});

export default async function getTools() {
  return {
    getGuitars,
    recommendGuitar,
  };
}
