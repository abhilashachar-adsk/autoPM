import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createDomain,
  CreateDomainWorkflowResponse
} from 'service/workflow/workflowService';
import type { CreateDomainWorkflowInput } from 'types/domain';

const useCreateDomain = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateDomainWorkflowResponse,
    Error,
    CreateDomainWorkflowInput
  >({
    mutationFn: createDomain,
    onSuccess: () => {
      // Invalidate domains query to refetch the list after successful creation
      queryClient.invalidateQueries({
        queryKey: ['domains']
      });
    },
    meta: {
      errorMessage: 'Failed to create domain',
      successMessage: undefined
    }
  });
};

export default useCreateDomain;
