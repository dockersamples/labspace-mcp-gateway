# Connecting the MCP Gateway to your app

Now that you've learned some of the basics of configuring MCP servers, you're ready to connect it to your application.

> [!NOTE]
> The method to connect MCP servers will vary on the language and framework you're using. Therefore, be sure to check out the documentation for the framework you're using.



## Using the MCP Gateway

By using environment variables, it allows your application to be easily reconfigured to point to a MCP server running at a different location.

### LangChain

The following Python snippet will create a MCP Client and get the tools using [LangChain's SDK](https://docs.langchain.com/oss/python/langchain/mcp#model-context-protocol-mcp).

It uses the `MCP_GATEWAY_URL` environment variable, defaulting to http://localhost:8811 if the variable isn't set.

```python
import os
from langchain_mcp_adapters.client import MultiServerMCPClient

client = MultiServerMCPClient(
    {
        "mcp-gateway": {
            "transport": "streamable_http",
            "url": os.environ.get('MCP_GATEWAY_URL', "http://localhost:8811")
        }
    }
)

tools = await client.get_tools()
```

### CrewAI

The following snippet shows how to configure a MCP client using the CrewAI agentic framework:

```python
import os
from crewai import Agent
from crewai_tools import MCPServerAdapter

server_params = {
    "url": os.environ.get('MCP_GATEWAY_URL', "http://localhost:8811"),
    "transport": "streamable-http"
}

with MCPServerAdapter(server_params, connect_timeout=60) as mcp_tools:
    print(f"Available tools: {[tool.name for tool in mcp_tools]}")

    my_agent = Agent(
        role="MCP Tool User",
        goal="Utilize tools from an MCP server.",
        backstory="I can connect to MCP servers and use their tools.",
        tools=mcp_tools, # Pass the loaded tools to your agent
        reasoning=True,
        verbose=True
    )
```

### Spring AI

The following `application.yml` settings will connect to the server using [Spring AI's MCP Server Boot Starters](https://docs.spring.io/spring-ai/reference/1.1-SNAPSHOT/api/mcp/mcp-streamable-http-server-boot-starter-docs.html), leveraging the `MCP_GATEWAY_URL` environment variable:

```yaml
spring:
    mcp:
      client:
        streamable-http:
          connections:
            mcp-gateway:
              url: ${MCP_GATEWAY_URL:http://localhost:8811}
```

### Mastra

The following Typescript code will configure a MCP client using the [Mastra.ai](https://mastra.ai/en/docs/tools-mcp/mcp-overview) agentic framework:

```typescript
import { MCPClient } from "@mastra/mcp";
 
export const mcpClient = new MCPClient({
  id: "test-mcp-client",
  servers: {
    mcpGateway: {
      url: process.env.MCP_GATEWAY_URL || "http://localhost:8811",
    },
  }
});
```



## 💡 Additional notes

Before closing a note, there are a few extra notes on running the MCP Gateway.

### If your app is running in a container...

- **Do not** to publish the ports of the MCP Gateway. Instead, use the container-to-container networking for communication, increasing your application's security posture.
- Configure the app to connect using a hostname of the service (see the `MCP_GATEWAY_URL` environment variable below)

```yaml no-copy-button
services:
  gateway:
    image: docker/mcp-gateway
    command:
      - --servers=duckduckgo
      - --servers=github-official
      - --transport=streaming
      - --tools=fetch_content,search,get_pull_request,get_pull_request_diff,get_pull_request_files,get_issue,get_issue_comments
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

  app:
    image: your-app
    environment:
      MCP_GATEWAY_URL: http://gateway:8811
```

