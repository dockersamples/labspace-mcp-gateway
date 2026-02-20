# Labspace - MCP Gateway

This Labspace provides an overview of the [MCP Gateway](https://github.com/docker/mcp-gateway), which provides the ability to run containerized MCP servers safely and securely.

## Learning objectives

This Labspace will teach you the following:

- Learn about the Docker MCP Gateway
- Learn how to run the MCP Gateway with a simple MCP server
- Securely inject secrets into MCP servers
- Filter tools to reduce noise and save tokens
- Learn how to connect the MCP Gateway to your application using popular agentic frameworks

## Launch the Labspace

To launch the Labspace, run the following command:

```bash
docker compose -f oci://dockersamples/labspace-mcp-gateway up -d
```

And then open your browser to http://localhost:3030.

### Using the Docker Desktop extension

If you have the Labspace extension installed (`docker extension install dockersamples/labspace-extension` if not), you can also [click this link](https://open.docker.com/dashboard/extension-tab?extensionId=dockersamples/labspace-extension&location=dockersamples/labspace-mcp-gateway&title=Docker%20MCP%20Gateway) to launch the Labspace.

## Contributing

If you find something wrong or something that needs to be updated, feel free to submit a PR. If you want to make a larger change, feel free to fork the repo into your own repository.

**Important note:** If you fork it, you will need to update the GHA workflow to point to your own Hub repo.

1. Clone this repo

2. Start the Labspace in content development mode:

    ```bash
    # On Mac/Linux
    CONTENT_PATH=$PWD docker compose up --watch

    # On Windows with PowerShell
    $Env:CONTENT_PATH = (Get-Location).Path; docker compose up --watch
    ```

3. Open the Labspace at http://dockerlabs.xyz.

4. Make the necessary changes and validate they appear as you expect in the Labspace

    Be sure to check out the [docs](https://github.com/dockersamples/labspace-infra/tree/main/docs) for additional information and guidelines.
