import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';

async function fetchGroups() {
    try {
        const response = await fetch(`${API_URL}/groups`, {
            headers: {
                Authorization:
                    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MTk3ODc4NH0.OwlmoRDFiIzogOhmADDxh4cvMGymGfc0vZk4UXnC8tQ',
            },
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function fetchGroupInfo(groupId: string) {
    console.log('fetching group info');
    try {
        const response = await fetch(`${API_URL}/groups/${groupId}`, {
            headers: {
                authorization:
                    'Bearer ' +
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MTg5MjM5NX0.mk3ama55j5vXMiGVYlEtlKXmOFXRG3CN-BUD6TdUZlw',
            },
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

const groupService = {
    fetchGroups,
    fetchGroupInfo,
};

export default groupService;
