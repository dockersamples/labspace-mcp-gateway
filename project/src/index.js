import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
    name: 'demo-server',
    version: '1.0.0'
});

// Add a get current time tool
server.registerTool(
    'get_current_time',
    {
        title: 'Get Current Time Tool',
        description: 'Get the current server time',
        inputSchema: { timezone: z.string().describe('Timezone in IANA format, e.g., America/New_York') },
        outputSchema: { result: z.string() }
    },
    async ({ timezone }) => {
        const currentTime = new Date().toLocaleString('en-US', { timeZone: timezone });
        const output = { result: currentTime };
        return {
            content: [{ type: 'text', text: JSON.stringify(output) }],
            structuredContent: output
        };
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);