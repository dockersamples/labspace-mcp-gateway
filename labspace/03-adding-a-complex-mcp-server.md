# Adding a complex MCP server

The **[GitHub MCP server](https://hub.docker.com/mcp/server/github-official/overview)** is a great MCP server that provides the ability to create issues, add comments, list repositories, and more.

In fact, there are (as of the time of writing this) [93 tools](https://hub.docker.com/mcp/server/github-official/tools) provided through this MCP server.

In order to perform operations though, many of them require a Personal Access Token.

To provide this, you will use [Docker Compose secrets](https://docs.docker.com/compose/how-tos/use-secrets/), which the MCP Gateway will safely and securely inject into the MCP server container.


## 🔐 Defining the secret

1. Create a [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). It is up to you whether you use the classic or fine-grained and how many permissions you grant it.

2. Create a `.env` file with the following contents:

    ```dotenv save-as=.env
    github.personal_access_token=YOUR_TOKEN_HERE
    ```

    Replace `YOUR_TOKEN_HERE` with your Personal Access Token.

2. Update your `compose.yaml` to define the secret by placing this configuration at the bottom of the file:

    ```yaml
    secrets:
      github-credential:
        file: .env
    ```

3. Update the `mcp-gateway` service in the `compose.yaml` to inject the secret:

    ```yaml
    services:
      mcp-gateway:
        ...
        secrets:
          - github-credential
    ```

4. Update the `command` for the `mcp-gateway` service to tell the MCP Gateway where to find the secrets:

    ```yaml
    services:
      mcp-gateway:
        ...
        command:
          - --servers=duckduckgo
          - --transport=streaming
          - --servers=github-official
          - --secrets=/run/secrets/github-credential
    ```

5. Run `docker compose up` to apply the changes:

    ```bash terminal-id=compose2
    docker compose up -d
    ```



## ✅ Validating with the MCP Inspector

With the MCP Gateway now running with the GitHub Official MCP server, you should be able to see a significant increase in the available tools.

1. Open the MCP Inspector at :tabLink[http://localhost:6274]{href="http://localhost:6274" title="MCP Inspector"}.

2. Since the MCP Gateway had to restart, click the **Connect** button to reconnect.

3. Click on the **Tools** tab and then the **List Tools** button to view all of the available tools.

4. Scroll to find the `get_me` tool, which will provide details about the authenticated user. 

5. Click the `Run Tool` to execute the tool. You should see output about your user account. If it fails, ensure your Personal Access Token is configured correctly.



## Next steps

You now have two MCP servers configured, but over 100 tools! Each tool consumes tokens and context when being sent to the LLM. This slows down every request, increases costs, and can even confuse many models.

In the next section, you'll learn how to filter the tools the MCP Gateway exposes.
