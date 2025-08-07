import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerContextTools } from './context/register';
import { registerEntriesTools } from './entries/register';
import { registerContentTypesTools } from './types/register';
import { registerEnvironmentTools } from './environments/register';
import { registerAssetTools } from './assets/register';
import { registerSpaceTools } from './spaces/register';
import { registerTagsTools } from './tags/register';
import { registerAiActionsTools } from './ai-actions/register';

export function registerAllTools(server: McpServer) {
  registerContextTools(server);
  registerEntriesTools(server);
  registerContentTypesTools(server);
  registerEnvironmentTools(server);
  registerAssetTools(server);
  registerSpaceTools(server);
  registerTagsTools(server);
  registerAiActionsTools(server);
}
