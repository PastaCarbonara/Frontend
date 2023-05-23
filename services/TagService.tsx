import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';

async function fetchAllTags() {
    try {
        const response = await fetch(`${API_URL}/tags`);
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}
const tagService = {
    fetchAllTags,
};

export default tagService;
