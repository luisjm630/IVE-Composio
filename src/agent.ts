// agent.ts — Claude Agents SDK + Composio

import { query } from "@anthropic-ai/claude-agent-sdk";
import { Composio } from "@composio/core";

const composio = new Composio();
const userId = "user_sj2r0j";

// Create a tool router session
const session = await composio.create(userId);

// Query Claude with MCP tools
const stream = await query({
  prompt: "Check QuickBooks and find my most sold item in 2026. Look at sales data for the year 2026 and identify which item or product had the highest total quantity sold.",
  options: {
    permissionMode: "bypassPermissions",
    mcpServers: {
      composio: session.mcp,
    },
  },
});

for await (const event of stream) {
  if (event.type === "result" && event.subtype === "success") {
    process.stdout.write(event.result);
  }
}
