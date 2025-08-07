import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  createEnvironmentTool,
  CreateEnvironmentToolParams,
} from './createEnvironment';
import {
  listEnvironmentsTool,
  ListEnvironmentsToolParams,
} from './listEnvironments';
import {
  deleteEnvironmentTool,
  DeleteEnvironmentToolParams,
} from './deleteEnvironment';

export function registerEnvironmentTools(server: McpServer) {
  server.tool(
    'create_environment',
    'Create a new environment',
    CreateEnvironmentToolParams.shape,
    createEnvironmentTool,
  );

  server.tool(
    'list_environments',
    'List all environments in a space',
    ListEnvironmentsToolParams.shape,
    listEnvironmentsTool,
  );

  server.tool(
    'delete_environment',
    'Delete an environment',
    DeleteEnvironmentToolParams.shape,
    deleteEnvironmentTool,
  );
}
