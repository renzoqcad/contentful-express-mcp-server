# Deploying Contentful MCP Remote Server to Google Cloud Run

This document provides instructions on how to containerize and deploy your Contentful MCP Remote Server to Google Cloud Run. Google Cloud Run is a managed compute platform that enables you to run stateless containers that are invocable via web requests or Pub/Sub events.

## Prerequisites

Before you begin, ensure you have the following:

* **Google Cloud SDK:** Installed and configured with your Google Cloud project.

* **Docker:** Installed on your local machine.

* **A Google Cloud Project:** With billing enabled and the Cloud Run API enabled.

## Deployment Steps

Follow these steps to deploy your server:

### 1. Containerize Your Application

Navigate to the root directory of your Contentful MCP Remote Server project in your terminal. Build your Docker image using the following command:
```
docker build -t contentful-express-mcp-server .
```

This command builds a Docker image named `contentful-express-mcp-server` based on the `Dockerfile` in your project's root directory.

### 2. Push Docker Image to Google Container Registry

Once your Docker image is built, you need to push it to Google Container Registry (GCR) so that Cloud Run can access it. Ensure you are authenticated with `gcloud`.
```
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/contentful-expressjs-mcp-server
```

**Important:** The project ID `YOUR_PROJECT_ID` in the image tag `gcr.io/YOUR_PROJECT_ID/contentful-expressjs-mcp-server` should match your actual Google Cloud project ID.

### 3. Deploy to Google Cloud Run

After the image is pushed to GCR, you can deploy it to Cloud Run.
```
gcloud run deploy contentful-expressjs-mcp-server
--image gcr.io/YOUR_PROJECT_ID/contentful-expressjs-mcp-server
--platform managed
--region us-central1
--allow-unauthenticated
```

Let's break down the flags:

* `contentful-expressjs-mcp-server`: This is the name of the Cloud Run service that will be created.

* `--image gcr.io/YOUR_PROJECT_ID/contentful-expressjs-mcp-server`: Specifies the Docker image to deploy from GCR.

* `--platform managed`: Indicates that you want to deploy to the fully managed Cloud Run environment.

* `--region us-central1`: Sets the Google Cloud region where your service will be deployed. You can change this to a region closer to your users.

* `--allow-unauthenticated`: Makes the service publicly accessible without requiring authentication. **Use with caution and consider implementing authentication if your server handles sensitive data.**

### 4. Verify Deployment

Once the deployment is complete, the `gcloud run deploy` command will output the URL of your deployed service. You can also find this URL in the Google Cloud Console under Cloud Run services.

You can then use the `npx @modelcontextprotocol/inspector` command (as mentioned in your `README.md`) to verify the connection to this new remote URL. Update your Claude Desktop configuration to point to this new Cloud Run URL.

## Post-Deployment Considerations

* **Custom Domains:** For a production environment, you might want to map a custom domain to your Cloud Run service.

* **Environment Variables:** If your server requires environment variables (e.g., API keys, database connections), configure them in Cloud Run service settings.

* **Scaling:** Cloud Run automatically scales your service up and down based on traffic, but you can configure minimum and maximum instances.

* **Logging and Monitoring:** Utilize Google Cloud's built-in logging (Cloud Logging) and monitoring (Cloud Monitoring) to observe your application's health and performance.
