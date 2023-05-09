import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useFlowers = () => {
  const { data, error, isLoading } = useSwr('/api/flowers', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useFlowers;
