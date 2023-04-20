import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';
import imageService from './ImageService';

async function fetchGroups() {
    try {
        const response = await fetch(`${API_URL}/groups`, {
            headers: {
                Authorization:
                    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MTk4MjQzOH0.IHbi5lZI-FBCCxN-8eoL5tz7Oct8gRNF5kEknDqvgx0',
            },
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function createGroup({ name, image }: { name: string; image: File }) {
    try {
        const files = await imageService.uploadImages({ images: [image] });
        const response = await fetch(`${API_URL}/groups`, {
            method: 'POST',
            headers: {
                Authorization:
                    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MTk4MjQzOH0.IHbi5lZI-FBCCxN-8eoL5tz7Oct8gRNF5kEknDqvgx0',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                filename: files[0].filename,
            }),
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
    createGroup,
    fetchGroupInfo,
};

export default groupService;
