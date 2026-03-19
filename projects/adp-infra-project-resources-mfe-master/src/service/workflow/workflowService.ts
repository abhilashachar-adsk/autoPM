import workflowClient, { workflowApiRoutes } from 'service/workflowClient';
import { getLogger } from 'utils';
import type { CreateDomainWorkflowInput } from 'types/domain';
import {
  DATA_CLASS_REQUEST_MAP,
  WORKFLOW_WORKSPACE_TYPE_MAP
} from '../../utils/constants';

const logger = getLogger('workflowService');

// ============================================================================
// Types
// ============================================================================

export interface WorkflowExecutionRequest {
  workflowName: string;
  taskQueue?: string;
  arguments: unknown[];
}

export interface WorkflowExecutionResponse {
  workflowId: string;
  runId: string;
  workflowType: string;
  status: string;
  startedAt: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Input parameters for the CreateDomainAndResourceWorkflow
 * Based on the workflow-service DomainAndResourceWorkflowInput dataclass
 */
export interface CreateDomainAndResourceWorkflowInput {
  domain_name: string;
  workspace_type: string;
  domain_data_classification: string;
  team_id: string;
  team_name: string;
  tenant_key: string;
  created_by: string;
  spindle_workflow_id?: string | null;
  has_amp_project?: boolean;
  domain_description?: string | null;
  is_dry_run_for_resources?: boolean;
  domain_tags?: Record<string, string>;
  access_type?: string;
}

export interface CreateDomainWorkflowResponse {
  success: boolean;
  message: string;
  data?: {
    workflowId?: string;
    runId?: string;
  };
}

// ============================================================================
// Constants
// ============================================================================

const WS_WORKFLOW_TYPE_CREATE_DOMAIN = 'CreateDomainAndResourceWorkflow';

// ============================================================================
// Internal helpers
// ============================================================================

/**
 * Transforms the frontend form input to the workflow-service API format
 */
const transformToWorkflowInput = (
  input: CreateDomainWorkflowInput
): CreateDomainAndResourceWorkflowInput => ({
  domain_name: input.domainName,
  domain_description: input.domainDescription,
  workspace_type:
    WORKFLOW_WORKSPACE_TYPE_MAP[
      input.workspaceType as keyof typeof WORKFLOW_WORKSPACE_TYPE_MAP
    ] || input.workspaceType,
  domain_data_classification:
    DATA_CLASS_REQUEST_MAP[
      input.domainDataClassification as keyof typeof DATA_CLASS_REQUEST_MAP
    ] || input.domainDataClassification,
  team_id: input.teamId,
  team_name: input.teamName,
  tenant_key: input.tenantKey,
  created_by: input.createdBy,
  is_dry_run_for_resources: false,
  has_amp_project: false,
  access_type: 'Admin'
});

// ============================================================================
// Service functions
// ============================================================================

/**
 * Posts a workflow execution request to the workflow service
 *
 * @param workflowExecutionRequest The workflow execution request
 * @returns The workflow execution response
 */
export const executeWorkflow = async (
  workflowExecutionRequest: WorkflowExecutionRequest
) =>
  workflowClient.post<WorkflowExecutionResponse>(
    workflowApiRoutes.executeWorkflow,
    workflowExecutionRequest
  );

/**
 * Creates a new domain by starting the CreateDomainAndResourceWorkflow
 *
 * @param input The domain creation input from the frontend form
 * @returns Response indicating success or failure
 */
export const createDomain = async (
  input: CreateDomainWorkflowInput
): Promise<CreateDomainWorkflowResponse> => {
  try {
    const workflowInput = transformToWorkflowInput(input);
    const workflowRequest: WorkflowExecutionRequest = {
      workflowName: WS_WORKFLOW_TYPE_CREATE_DOMAIN,
      arguments: [workflowInput]
    };

    const response = await executeWorkflow(workflowRequest);

    return {
      success: response.status === 200 || response.status === 201,
      message: 'You have successfully submitted your request.',
      data: {
        workflowId: response.data.workflowId,
        runId: response.data.runId
      }
    };
  } catch (error) {
    logger.debug({ error }, 'Failed to create domain via workflow-service');
    throw error;
  }
};
