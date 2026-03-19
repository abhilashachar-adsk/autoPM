export interface Domain {
  domain_id: number;
  domain_name: string;
  domain_description: string;
  team_id: string;
  tenant_key: string;
  domain_tags?: Record<string, unknown>;
  config?: {
    data_classification?: string;
  };
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  request_status?: Array<{
    id: number;
    request_id: number;
    resource: string;
    status: string;
    created_at: string;
    created_by: string;
    updated_at: string;
  }>;
}

export interface DomainResource {
  domain_name: string;
  resources: {
    SNOWFLAKE?: {
      schema?: {
        dev?: string[];
        stg?: string[];
        prd?: string[];
      };
      limited_schema?: {
        dev?: string[];
        stg?: string[];
        prd?: string[];
      };
    } | null;
    HIVE?: {
      database?: {
        dev?: Array<{ name: string; location: string }>;
        stg?: Array<{ name: string; location: string }>;
        prd?: Array<{ name: string; location: string }>;
      };
    } | null;
  };
}

/**
 * @deprecated Use CreateDomainWorkflowInput for the new workflow-service
 */
export interface CreateDomainRequest {
  workflow_type: string;
  started_by: {
    id: string;
    email: string;
    username: string;
  };
  team: {
    id: string;
  };
  workspaceType: string;
  domainDataClassification: string;
  domainDescription: string;
  domainName: string;
}

/**
 * Input parameters for creating a domain via the new workflow-service
 * Used with CreateDomainAndResourceWorkflow
 */
export interface CreateDomainWorkflowInput {
  domainName: string;
  domainDescription: string;
  workspaceType: string;
  domainDataClassification: string;
  teamId: string;
  teamName: string;
  tenantKey: string;
  createdBy: string;
}

export interface CreateDomainResponse {
  success: boolean;
  message: string;
  data?: {
    id?: string;
  };
}
