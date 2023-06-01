import useSWR from 'swr';
import { fetcher } from './Fetcher';

function useAllTags() {
    const { data, error, isLoading } = useSWR(`/tags`, fetcher);
    return {
        allTags: data,
        isLoadingTags: isLoading,
        isError: error,
    };
}
const tagService = {
    useAllTags,
};

export default tagService;
