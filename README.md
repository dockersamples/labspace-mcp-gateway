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
