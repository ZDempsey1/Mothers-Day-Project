import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useFlower = (id?: string) => {
  const { data, error, isLoading } = useSwr(id ? `/api/flowers/${id}` : null, fetcher, {
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

export default useFlower;
