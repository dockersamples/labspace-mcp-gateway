# Using a Custom MCP Server

The examples so far have relied on using the MCP Servers provided in [Docker's MCP Catalog](https://hub.docker.com/mcp/). What if you wanted to make your own MCP server? This section will show you how.

## 📋 Overview

The following steps outline the process to use your own MCP server with the MCP Gateway:

1. Write the code for your MCP server
2. Create a custom catalog
3. Configure the MCP Gateway to use your custom catalog

The process isn't difficult, but let's try it out!



## 👩‍💻 Build the MCP server

This Labspace already contains the code for a MCP server for you to use, which provides a simple `get_current_time` tool. Feel free to look at the :fileLink[`src/index.js`]{path="src/index.js"} to look at the server implementation.

1. Build the MCP server by running the following command:

    ```console
    docker build -t time-mcp-server .
    ```

2. Validate the server by opening the :tabLink[MCP Inspector]{href="http://localhost:6274" title="MCP Inspector"} and connect with the following config:

    - **Transport Type:** STDIO
    - **Command:** `docker`
    - **Arguments:** `run --rm -i time-mcp-server`

4. If you list the available tools, you should see a tool named `get_current_time`. Feel free to invoke the time by providing an IANA timezone (such as `America/New_York`).



## 🔨 Create and use a custom catalog

The MCP Gateway uses a _catalog_ to list the available servers. The default catalog is Docker's MCP Catalog. If you want to use your own servers, you only need to create your own catalog.

1. Create a file named `compose.custom-mcp.yaml` with a config object that will provide a catalog definition:

    ```yaml save-as=compose.custom-mcp.yaml
    configs:
      mcp-catalog:
        content: |
          registry:
            time:
              description: A MCP server that provides the ability to get the current time
              title: Time
              type: server
              image: time-mcp-server
              network: none
    ```

    > [!TIP]
    > You are also welcome to define this as a separate file and inject it into the container as a bind mount, Kubernetes `ConfigMap`, or any other method.
    >
    > The Compose file approach here simply makes it easier to do everything using a single file.

2. Add the MCP Gateway service, injecting the catalog config into the container, and instructing the MCP Gateway which catalog to use:

    ```yaml
    services:
      mcp-gateway:
        image: docker/mcp-gateway
        command:
          - --transport=streaming
          - --catalog=/etc/mcp/catalog.yaml
          - --enable-all-servers
        ports:
          - 8811:8811
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock
        configs:
          - source: mcp-catalog
            target: /etc/mcp/catalog.yaml
    ```

3. Start the new stack:

    ```bash terminal-id=custom-mcp
    docker compose -f compose.custom-mcp.yaml up
    ```

4. Using the :tabLink[MCP Inspector]{href="http://localhost:6274" title="MCP Inspector"}, connect to the gateway (streaming at http://localhost:8811) and validate you see the tool provided by the custom MCP server.

It works!



## Additional notes

The MCP server you just used is a STDIO server and doesn't use any credentials. However, your custom MCP servers may need other configuration.

### Using a custom streaming MCP server

If your MCP server is using the Streamable HTTP transport, configure the server as another service in your Compose stack and configure the catalog to connect to a remote endpoint.

The snippet below includes a `streaming-mcp-server` that uses the `my-mcp-server` container image. Assuming it runs on port 8080, the catalog will connect to the server using an endpoint of `http://streaming-mcp-server:8080` (using the service name as the hostname).

```yaml
services:
  mcp-gateway:
    # No changes here

  streaming-mcp-server:
    image: my-mcp-server

configs:
  mcp-catalog:
    content: |
      registry:
        time:
          description: A description about the MCP server
          title: A title
          type: remote
          remote:
            transport_type: streamable-http
            url: http://streaming-mcp-server:8080
```