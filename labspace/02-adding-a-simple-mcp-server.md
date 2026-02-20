# Running a simple MCP Server

The **[DuckDuckGo MCP server](https://hub.docker.com/mcp/server/duckduckgo/overview)** is a great MCP server that is very easy to use.

Specifically, it provides two tools:

1. **fetch_content** - fetch and parse content from a webpage URL
2. **search** - search DuckDuckGo and return formatted results

With these tools, you could create agents that can perform online searches, do basic research, and more!


## Starting a MCP Gateway to use DuckDuckGo

1. Create a `compose.yaml` file with the following contents:

    ```yaml save-as=compose.yaml
    services:
      mcp-gateway:
        image: docker/mcp-gateway
        command:
          - --servers=duckduckgo
          - --transport=streaming
        ports:
          - 8811:8811
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock
    ```

    To explain the flags:

    - `--servers=duckduckgo` - configure the MCP Gateway to use the duckduckgo server from the Docker MCP Catalog
    - `--transport=streaming` - configure the MCP Gateway to use the [Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http)
    - `/var/run/docker.sock:/var/run/docker.sock` - mount the Docker socket, which is required to actually launch the DuckDuckGo MCP server


2. Start the gateway using Docker Compose:

    ```bash terminal-id=compose
    docker compose up
    ```

    In the log output, you should see output similar to the following:

    ```plaintext no-copy-button
    gateway-1  | - Reading configuration...
    gateway-1  |   - Reading catalog from [https://desktop.docker.com/mcp/catalog/v2/catalog.yaml]
    gateway-1  | - Configuration read in 198.760708ms
    gateway-1  | - Those servers are enabled: duckduckgo
    gateway-1  | - Listing MCP tools...
    ...
    ...
    gateway-1  | - Using images:
    gateway-1  |   - mcp/duckduckgo@sha256:68eb20db6109f5c312a695fc5ec3386ad15d93ffb765a0b4eb1baf4328dec14f
    gateway-1  | > Images pulled in 37.201917ms
    gateway-1  | - Verifying images [mcp/duckduckgo]
    gateway-1  | > Images verified in 887.355875ms
    gateway-1  | > Initialized in 1.640829209s
    gateway-1  | > Start streaming server on port 8811
    ```

    That's it! The MCP Gateway is up and running!



## Using the MCP Inspector

The [MCP Inspector](https://github.com/modelcontextprotocol/inspector) is a great tool to directly interact with MCP servers, including the MCP Gateway.

1. Start the MCP Inspector by using the following `npx` command:

    ```bash terminal-id=inspector
    npx --yes @modelcontextprotocol/inspector
    ```

2. Once it finishes, open the MCP Inspector running at :tabLink[http://localhost:6274]{href="http://localhost:6274" title="MCP Inspector"}.

3. Configure the MCP Inspector to connect to a MCP server with the following configuration:

    - **Transport Type:** Streamable HTTP (you configured this in the Compose file)
    - **URL:** http://localhost:8811

    Click **Connect** when you're done!

4. Select the **Tools** tab and then click the **List Tools** button. 

    You should see both the `fetch_content` and `search` tools appear.

5. Select the **search** tool by clicking on it.

    This will open a form to fill out the required parameters.

6. In the _query_ field, type in "Docker MCP Gateway".

7. Click the **Run Tool** button.

    After a brief time, you should see your search results!

While running the `search` tool, the Docker MCP Gateway started a DuckDuckGo container, delegated the running of the tool to it, got the results, stopped the container, and sent the results back to the inspector.



## Next steps

While this was a simple MCP server, not all are as straight forward. Many require some sort of authentication or configuration.

In the next step, you'll add the GitHub MCP server to explore this.