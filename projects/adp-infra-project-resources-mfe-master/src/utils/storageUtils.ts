export const getStatusStyles = (status: string) => {
  switch (status) {
    case 'COMPLETE':
      return {
        border: '1px solid #51EB9D',
        background: '#2BFF9366'
      };
    case 'IN_PROGRESS':
      return {
        border: '1px solid #38ABDF',
        background: '#59CBFF80'
      };
    case 'ERROR':
      return {
        border: '1px solid #FB7174',
        background: '#FFAFB0CC'
      };
    case 'UNKNOWN':
      return {
        border: '1px solid #BDBDBD',
        background: '#F5F5F5'
      };
    default:
      return {
        border: '1px solid #9E9E9E',
        background: '#E0E0E0'
      };
  }
};

export const getResourceTypeLabel = (resource: string) => {
  switch (resource) {
    case 'HIVE':
      return 'Data Lake';
    case 'SNOWFLAKE':
      return 'Snowflake';
    default:
      return resource;
  }
};
