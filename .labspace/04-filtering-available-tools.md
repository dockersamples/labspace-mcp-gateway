# Filtering Tools

The configuration you have for your MCP Gateway currently exposes almost 100 tools, which is a lot!

Every tool description includes details on when to use the tool, available parameters, and sometimes examples on how to use it.

These descriptions must be processed on every request, making your AI apps slower, more costly, and potentially less accurate (lots of tools can confuse models).

## Updating the MCP Gateway configuration

Fortunately, the MCP Gateway makes it easy to filter the tools it exposes.

1. Identify the names of the tools you want to expose from each MCP server.

    For this lab, you will expose both tools from the DuckDuckGo server and a few tools related to pull requests and issues.

    The list will include `fetch_content`, `search`, `get_pull_request`, `get_pull_request_diff`, and `get_pull_request_files`, `get_issue`, and `get_issue_comments`.

2. Update the `compose.yaml` file to include the list of tools with the `--tools` flag:


    ```yaml
    services:
      mcp-gateway:
        command:
          ...
          - --tools=fetch_content,search,get_pull_request,get_pull_request_diff,get_pull_request_files,get_issue,get_issue_comments
    ```


3. Restart the gateway to apply the tool filtering:

    ```bash terminal-id=compose2
    docker compose up -d
    ```



## Validating the tool filtering

1. Open the MCP Inspector (http://localhost:6274)

2. Reconnect to the server and list the tools

3. Validate you see only seven tools now.

4. Get the details for a pull request by running the `get_pull_request` tool with the following configuration:

    - **Tool:** `get_pull_request`
    - **owner:** `docker`
    - **pullNumber:** 99
    - **repo:** welcome-to-docker

    If successful, you should a PR with a title of `Update Dockerfile`.
