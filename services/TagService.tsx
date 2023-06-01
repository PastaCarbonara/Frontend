import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';
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
async function fetchAllTags() {
    try {
        const response = await fetch(`${API_URL}/tags`);
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}
const tagService = {
    useAllTags,
    fetchAllTags,
};

export default tagService;
