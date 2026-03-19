export const MOCK_DOMAINS = [
  {
    domain_id: 425,
    domain_name: 'srda_workflow_test',
    domain_description: 'srda_workflow_test',
    team_id: 'ae99183a-37e0-4c28-bf29-ff51000ca477',
    tenant_key: 'tenant-W0WeTW',
    domain_tags: {},
    config: {
      data_classification: 'Confidential - Internal'
    },
    created_by: 'shenj3',
    created_at: '2025-06-07T00:17:15.609284',
    updated_by: 'shenj3',
    updated_at: '2025-06-07T00:17:15.609287',
    request_status: [
      {
        id: 187,
        request_id: 175,
        resource: 'HIVE',
        status: 'COMPLETE',
        created_at: '2025-06-07T00:17:18.870637',
        created_by: 'shenj3',
        updated_at: '2025-06-07T00:40:15.784565'
      }
    ]
  },
  {
    domain_id: 417,
    domain_name: 'test_mod_v2_adp',
    domain_description: 'testing Mod2 for DFS API',
    team_id: 'ae99183a-37e0-4c28-bf29-ff51000ca477',
    tenant_key: 'tenant-W0WeTW',
    domain_tags: {},
    config: {
      data_classification: 'Confidential - Internal'
    },
    created_by: 'jains2',
    created_at: '2025-05-28T15:09:19.463321',
    updated_by: 'jains2',
    updated_at: '2025-05-28T15:09:19.463326',
    request_status: [
      {
        id: 177,
        request_id: 166,
        resource: 'HIVE',
        status: 'COMPLETE',
        created_at: '2025-05-28T15:09:19.987538',
        created_by: 'jains2',
        updated_at: '2025-05-28T15:48:07.696331'
      }
    ]
  }
];

export const MOCK_DOMAIN_RESOURCES = {
  domain_name: 'srda_workflow_test',
  resources: {
    SNOWFLAKE: null,
    HIVE: {
      database: {
        dev: [
          {
            name: 'srda_workflow_test_internal_optimized',
            location:
              's3a://autodesk-adpcdl-524152542340-c-uw2-internal-srda-workflow-test/optimized'
          },
          {
            name: 'srda_workflow_test_internal_private',
            location:
              's3a://autodesk-adpcdl-524152542340-c-uw2-internal-srda-workflow-test/private'
          },
          {
            name: 'srda_workflow_test_raw_ingest',
            location:
              's3a://autodesk-adpcdl-524152542340-c-uw2-raw-srda-workflow-test/ingest'
          },
          {
            name: 'srda_workflow_test_export_ingest',
            location:
              's3a://autodesk-adpcdl-524152542340-c-uw2-export-srda-workflow-test/ingest'
          },
          {
            name: 'srda_workflow_test_internal_interm',
            location:
              's3a://autodesk-adpcdl-524152542340-c-uw2-internal-srda-workflow-test/interm'
          },
          {
            name: 'srda_workflow_test_internal_public_latest',
            location:
              's3a://autodesk-adpcdl-524152542340-c-uw2-internal-srda-workflow-test/public-latest'
          },
          {
            name: 'srda_workflow_test_internal_public',
            location:
              's3a://autodesk-adpcdl-524152542340-c-uw2-internal-srda-workflow-test/public'
          }
        ],
        stg: [
          {
            name: 'srda_workflow_test_internal_optimized',
            location:
              's3a://autodesk-adpcdl-656127184117-s-ue1-internal-srda-workflow-test/optimized'
          },
          {
            name: 'srda_workflow_test_internal_private',
            location:
              's3a://autodesk-adpcdl-656127184117-s-ue1-internal-srda-workflow-test/private'
          },
          {
            name: 'srda_workflow_test_raw_ingest',
            location:
              's3a://autodesk-adpcdl-656127184117-s-ue1-raw-srda-workflow-test/ingest'
          },
          {
            name: 'srda_workflow_test_export_ingest',
            location:
              's3a://autodesk-adpcdl-656127184117-s-ue1-export-srda-workflow-test/ingest'
          },
          {
            name: 'srda_workflow_test_internal_interm',
            location:
              's3a://autodesk-adpcdl-656127184117-s-ue1-internal-srda-workflow-test/interm'
          },
          {
            name: 'srda_workflow_test_internal_public_latest',
            location:
              's3a://autodesk-adpcdl-656127184117-s-ue1-internal-srda-workflow-test/public-latest'
          },
          {
            name: 'srda_workflow_test_internal_public',
            location:
              's3a://autodesk-adpcdl-656127184117-s-ue1-internal-srda-workflow-test/public'
          }
        ],
        prd: [
          {
            name: 'srda_workflow_test_raw_ingest_uat',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-raw-srda-workflow-test/ingest-uat'
          },
          {
            name: 'srda_workflow_test_export_ingest_uat',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-export-srda-workflow-test/ingest-uat'
          },
          {
            name: 'srda_workflow_test_internal_private_uat',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-internal-srda-workflow-test/private-uat'
          },
          {
            name: 'srda_workflow_test_internal_optimized',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-internal-srda-workflow-test/optimized'
          },
          {
            name: 'srda_workflow_test_internal_public_latest_uat',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-internal-srda-workflow-test/public-latest-uat'
          },
          {
            name: 'srda_workflow_test_internal_public_uat',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-internal-srda-workflow-test/public-uat'
          },
          {
            name: 'srda_workflow_test_internal_interm_uat',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-internal-srda-workflow-test/interm-uat'
          },
          {
            name: 'srda_workflow_test_internal_private',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-internal-srda-workflow-test/private'
          },
          {
            name: 'srda_workflow_test_raw_ingest',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-raw-srda-workflow-test/ingest'
          },
          {
            name: 'srda_workflow_test_export_ingest',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-export-srda-workflow-test/ingest'
          },
          {
            name: 'srda_workflow_test_internal_optimized_uat',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-internal-srda-workflow-test/optimized-uat'
          },
          {
            name: 'srda_workflow_test_internal_interm',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-internal-srda-workflow-test/interm'
          },
          {
            name: 'srda_workflow_test_internal_public_latest',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-internal-srda-workflow-test/public-latest'
          },
          {
            name: 'srda_workflow_test_internal_public',
            location:
              's3a://autodesk-adpcdl-965535024567-p-ue1-internal-srda-workflow-test/public'
          }
        ]
      }
    }
  }
};
