import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';

async function fetchGroups() {
    try {
        const response = await fetch(`${API_URL}/groups`, {
            headers: {
                Authorization:
                    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MTkwMTUzOH0.qbes8LYWmm1tW-gnOjcwLejYUITN_vt4oNUjnRtsjHE',
                'Content-Type': 'application/json',
            },
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

const groupService = {
    fetchGroups,
};

export default groupService;
