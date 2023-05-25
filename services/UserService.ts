import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';
import { cookieHelper } from '../helpers/CookieHelper';
import { fetcher } from './Fetcher';
import useSWR from 'swr';
import imageService from './ImageService';
import { UserImage } from '../types';

async function fetchMe() {
    const access_token = cookieHelper.getCookie('access_token');
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

function useMe() {
    const { data, error } = useSWR('/me', fetcher);

    return {
        me: data,
        isLoading: !error && !data,
        isError: error,
    };
}

async function updateUser(
    username: string,
    image?: File | undefined,
    oldImage?: Array<UserImage> | undefined
) {
    const access_token = cookieHelper.getCookie('access_token');
    try {
        let files = oldImage;
        if (image) {
            files = await imageService.uploadImages({ images: [image] });
        }
        if (files != null) {
            const response = await fetch(`${API_URL}/me`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${access_token}`,
                },
                body: JSON.stringify({
                    display_name: username,
                    filename: files[0]?.filename,
                }),
            });
            return HttpErrorHandling.responseChecker(response);
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function fetchFilters() {
    const access_token = cookieHelper.getCookie('access_token');
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
    const access_token = cookieHelper.getCookie('access_token');
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
    const access_token = cookieHelper.getCookie('access_token');
    try {
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
    useMe,
    fetchFilters,
    addFilter,
    deleteFilter,
    updateUser,
};

export default userService;
