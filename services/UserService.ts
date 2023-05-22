import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';
import { cookieHelper } from '../helpers/CookieHelper';

const access_token = cookieHelper.getCookie('access_token');

async function fetchMe() {
    try {
        const response = await fetch(`${API_URL}/me`, {
            headers: {
                Authorization: `bearer ${access_token}`,
            },
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function fetchFilters() {
    try {
        const response = await fetch(`${API_URL}/me/filters`, {
            headers: {
                Authorization: `bearer ${access_token}`,
            },
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function addFilter(tags: any) {
    try {
        const response = await fetch(`${API_URL}/me/filters`, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tags: tags,
            }),
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function deleteFilter(tagId: number) {
    try {
        console.log(tagId);
        const response = await fetch(`${API_URL}/me/filters?id=${tagId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `bearer ${access_token}`,
            },
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

const userService = {
    fetchMe,
    fetchFilters,
    addFilter,
    deleteFilter,
};

export default userService;
