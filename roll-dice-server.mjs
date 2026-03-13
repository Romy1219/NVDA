import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "roll-dice-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "roll_dice",
      description: "Roll one or more dice. Useful for Week 1 replication exercises.",
      inputSchema: {
        type: "object",
        properties: {
          sides: {
            type: "integer",
            minimum: 2,
            default: 6,
            description: "Number of sides per die"
          },
          count: {
            type: "integer",
            minimum: 1,
            maximum: 20,
            default: 1,
            description: "How many dice to roll"
          }
        },
        additionalProperties: false
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "roll_dice") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const args = request.params.arguments ?? {};
  const sides = Number.isInteger(args.sides) ? args.sides : 6;
  const count = Number.isInteger(args.count) ? args.count : 1;

  const safeSides = Math.max(2, sides);
  const safeCount = Math.min(20, Math.max(1, count));
  const rolls = Array.from({ length: safeCount }, () => Math.floor(Math.random() * safeSides) + 1);
  const total = rolls.reduce((sum, value) => sum + value, 0);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          sides: safeSides,
          count: safeCount,
          rolls,
          total
        }, null, 2)
      }
    ]
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
