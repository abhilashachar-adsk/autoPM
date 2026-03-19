import { QueryClient } from '@tanstack/react-query';

const queryClientService = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000
    }
  }
});

export default queryClientService;
