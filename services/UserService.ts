import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';
import { cookieHelper } from '../helpers/CookieHelper';
import { fetcher } from './Fetcher';
import useSWR from 'swr';
import imageService from './ImageService';

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

async function deleteMe() {
    const access_token = cookieHelper.getCookie('access_token');
    try {
        const response = await fetch(`${API_URL}/me`, {
            method: 'DELETE',
            headers: {
                Authorization: `bearer ${access_token}`,
            },
        });
        cookieHelper.deleteAllCookies();
        // const responsible = HttpErrorHandling.responseChecker(response); <-- causes code to break, no clue why
        return response;
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function updateUser(username: string, image?: File | string | null) {
    const access_token = cookieHelper.getCookie('access_token');
    try {
        let files;
        if (image) {
            if (typeof image === 'string') {
                files = [{ filename: image }];
            } else if (image) {
                files = await imageService.uploadImages({ images: [image] });
            }
        }
        let response;
        if (files != null) {
            response = await fetch(`${API_URL}/me`, {
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
        } else {
            response = await fetch(`${API_URL}/me`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${access_token}`,
                },
                body: JSON.stringify({
                    display_name: username,
                }),
            });
        }
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

function useFilters() {
    const { data, error, isLoading } = useSWR(`/me/filters`, fetcher);
    return {
        filters: data,
        isLoadingFilters: isLoading,
        isError: error,
    };
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
        const response = await fetch(`${API_URL}/me/filters/${tagId}`, {
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
    useFilters,
    addFilter,
    deleteFilter,
    updateUser,
    deleteMe,
};

export default userService;
