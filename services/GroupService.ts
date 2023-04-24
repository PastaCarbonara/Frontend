import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';
import imageService from './ImageService';

async function fetchGroups() {
    try {
        const response = await fetch(`${API_URL}/groups`, {
            headers: {
                Authorization:
                    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MjM3NzQ4MX0.6APlMn2F8e5iNR_DYUitJ4ajl8QR1LS0p5fAbWGcUW0',
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
                    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MjM3NzQ4MX0.6APlMn2F8e5iNR_DYUitJ4ajl8QR1LS0p5fAbWGcUW0',
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
    try {
        const response = await fetch(`${API_URL}/groups/${groupId}`, {
            headers: {
                authorization:
                    'Bearer ' +
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MjM3NzQ4MX0.6APlMn2F8e5iNR_DYUitJ4ajl8QR1LS0p5fAbWGcUW0',
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
