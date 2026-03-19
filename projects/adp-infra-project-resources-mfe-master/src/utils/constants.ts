// Domain creation workflow constants
export const DOMAIN_WORKFLOW_TYPE = 'new_domain';

// Data Lake workspace type (HIVE only - no Snowflake)
export const HIVE = 'HIVE';

export const WORKFLOW_WORKSPACE_TYPE_MAP = {
  HIVE: 'Hive'
};

export const DOMAIN_WORKSPACE_OPTIONS_MAP = {
  HIVE: 'Data Lake'
};

// Data classification keys
export const DATA_CLASSIFICATION = {
  INTERNAL: 'Confidential - Internal',
  RESTRICTED: 'Confidential - Restricted',
  NEED_TO_KNOW: 'Confidential - Need to Know',
  NEED_TO_KNOW_TWL: 'Confidential - Need to Know TWL'
} as const;

// Data classification API enum values
export const DATA_CLASSIFICATION_API = {
  INTERNAL: 'CONFIDENTIAL_INTERNAL',
  RESTRICTED: 'CONFIDENTIAL_RESTRICTED',
  NEED_TO_KNOW: 'CONFIDENTIAL_NEED_TO_KNOW',
  NEED_TO_KNOW_TWL: 'CONFIDENTIAL_NEED_TO_KNOW_TWL'
} as const;

// Data classification display descriptions
export const DATA_CLASS_OPTIONS_MAP = {
  [DATA_CLASSIFICATION.INTERNAL]:
    'Confidential – Internal use Only (General purpose, non-sensitive)',
  [DATA_CLASSIFICATION.NEED_TO_KNOW]:
    'Confidential – Need to Know (Business Use Cases, Need to know basis)',
  [DATA_CLASSIFICATION.RESTRICTED]:
    'Confidential – Restricted (PII, Security, Medical, Legal)'
};

// Data classification to API request mapping
export const DATA_CLASS_REQUEST_MAP = {
  [DATA_CLASSIFICATION.INTERNAL]: DATA_CLASSIFICATION_API.INTERNAL,
  [DATA_CLASSIFICATION.RESTRICTED]: DATA_CLASSIFICATION_API.RESTRICTED,
  [DATA_CLASSIFICATION.NEED_TO_KNOW]: DATA_CLASSIFICATION_API.NEED_TO_KNOW,
  [DATA_CLASSIFICATION.NEED_TO_KNOW_TWL]:
    DATA_CLASSIFICATION_API.NEED_TO_KNOW_TWL
};
