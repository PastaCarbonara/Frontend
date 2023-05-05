import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';
import imageService from './ImageService';
import { cookieHelper } from '../helpers/CookieHelper';

async function fetchGroups() {
    const access_token = cookieHelper.getCookie('access_token');
    try {
        const response = await fetch(`${API_URL}/me/groups`, {
            headers: {
                Authorization: `bearer ${access_token}`,
            },
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function createGroup({ name, image }: { name: string; image: File }) {
    const access_token = cookieHelper.getCookie('access_token');
    try {
        const files = await imageService.uploadImages({ images: [image] });
        const response = await fetch(`${API_URL}/groups`, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${access_token}`,
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
    const access_token = cookieHelper.getCookie('access_token');
    try {
        const response = await fetch(`${API_URL}/groups/${groupId}`, {
            headers: {
                Authorization: `bearer ${access_token}`,
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
