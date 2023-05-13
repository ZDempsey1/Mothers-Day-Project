// import useSwr from 'swr'

// import fetcher from '@/libs/fetcher';

// const useCurrentUser = () => {
//   const { data, error, isLoading, mutate } = useSwr('/api/current', fetcher);
//   return {
//     data,
//     error,
//     isLoading,
//     mutate,
//   }
// };

// export default useCurrentUser;
import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useCurrentUser = () => {
  const { data, error } = useSWR('/api/current', fetcher);

  const isLoading = !data && !error;
  const status = isLoading ? 'loading' : error ? 'error' : 'success';

  return {
    data,
    error,
    isLoading,
    status,
  };
};

export default useCurrentUser;
