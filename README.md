Contentful MCP Remote Server
============================

This repository hosts an Express.js server designed to expose the Contentful MCP tools as a remote endpoint. It allows the Contentful MCP Desktop application to connect to and utilize the `mcp-tools` functionality via an HTTP API, rather than running them locally.

🚀 Getting Started (Remote Server)
----------------------------------

These instructions will get your remote MCP server up and running.

### Prerequisites

*   Node.js (LTS version recommended)

*   npm or Yarn


### Installation

1.  **Clone the repository:**

        git clone [your-repository-url]
        cd [your-repository-name]


2.  **Install dependencies:**

        npm install
        # or
        yarn install



### Running the Server

To start the Express.js server:

    npm start
    # or
    yarn start


The server will typically run on `http://localhost:3000` (or another port if configured) and expose the MCP endpoint at `/mcp`. Ensure this server is accessible from where you're running the Contentful MCP Desktop application (e.g., if deploying to a cloud service, make sure the URL is public).

🔌 Connecting to the Contentful MCP Desktop App
-----------------------------------------------

To connect your Contentful MCP Desktop application to this remote server, you'll need to configure it to use `mcp-remote` globally and then point it to your server's endpoint.

### 1\. Install `mcp-remote` globally

First, ensure you have `mcp-remote` installed globally on your machine. This command-line tool acts as a bridge between the desktop app and your remote server.

    npm install -g mcp-remote
    # or
    yarn global add mcp-remote


### 2\. Configure Claude Desktop for Remote Server

Open your Claude Desktop application's configuration file. This file is usually located in your user's application data directory. Add the following JSON snippet to the `mcpServers` section:

    {
      "mcpServers": {
        "contentful_mcp_server": {
          "command": "npx",
          "args": [
            "mcp-remote",
            "https://example.com/mcp"
          ]
        }
      }
    }


**Important:** Replace `https://example.com/mcp` with the actual URL where your Express.js server's `/mcp` endpoint is accessible.

After saving the configuration, restart the Claude Desktop application. You should now see "contentful\_mcp\_server" available as an option for running MCP commands.

### 3\. Verify MCP Connection (Optional)

You can verify that your MCP server is correctly exposed and accessible by using the `@modelcontextprotocol/inspector` tool.

    npx @modelcontextprotocol/inspector


This command will attempt to connect to the configured MCP servers and report their status, helping you confirm that your remote or local server is properly recognized.

💻 Running MCP Tools Locally (Alternative Setup)
------------------------------------------------

If you prefer to run the Contentful MCP tools directly on your local machine without the remote server, you can follow these instructions.

### 1\. Clone and Run the Base Repository

1.  **Clone the original Contentful MCP Server repository:**

        git clone https://github.com/applydigital/contentful-express-mcp-server
        cd contentful-express-mcp-server


2.  **Install dependencies:**

        npm install
        # or
        yarn install


3.  **Start the local MCP server:**

        npm dev
        # or
        yarn dev


    This will typically start the MCP server on `http://localhost:3000`.


### 2\. Configure Claude Desktop for Local Server

Open your Claude Desktop application's configuration file. Add the following JSON snippet to the `mcpServers` section to connect to your locally running instance:

    {
      "mcpServers": {
        "contentful_mcp_local": {
          "command": "npx",
          "args": [
            "mcp-server",
            "http://localhost:3000"
          ]
        }
      }
    }


After saving the configuration, restart the Claude Desktop application. You should now see "contentful\_mcp\_local" available as an option for running MCP commands, which will execute directly against your local `mcp-server` instance.

💡 Considerations
-----------------

*   **Security:** If deploying this server publicly, ensure you implement appropriate security measures (e.g., API keys, authentication, rate limiting) to protect your endpoint.

*   **Scalability:** For high-volume usage, consider deploying this server on a scalable platform (like Google Cloud Run, AWS Lambda, or similar serverless offerings) to handle concurrent requests efficiently.

*   **Error Handling:** Enhance the server's error handling to provide more informative responses in case of issues with `mcp-tools` execution.

*   **Logging:** Implement robust logging to monitor server activity and troubleshoot problems.

*   **`mcp-tools` Dependency:** This server assumes that the necessary `mcp-tools` are available and correctly configured within its environment. Ensure that the `mcp-tools` package is a dependency of this Express.js project.

*   **Network Latency:** Running MCP tools remotely introduces network latency. For very frequent or performance-critical operations, a local setup might still be preferable.
