import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';
import imageService from './ImageService';
import { cookieHelper } from '../helpers/CookieHelper';
import useSWR from 'swr';
import { fetcher } from './Fetcher';

function useGroups() {
    const { data, error, isLoading } = useSWR('/me/groups', fetcher);
    return {
        groups: data,
        isLoading,
        isError: error,
    };
}

function useGroup(groupId: string | undefined) {
    const { data, error, isLoading } = useSWR(
        groupId ? `/groups/${groupId}` : null,
        fetcher
    );
    return {
        group: data,
        isLoading,
        isError: error,
    };
}

function useGroupPreview(groupId: string | undefined) {
    const { data, error, isLoading } = useSWR(
        groupId ? `/groups/${groupId}/preview` : null,
        fetcher
    );
    return {
        group: data,
        isLoading,
        isError: error,
    };
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

async function acceptInvite(groupId: string) {
    const access_token = cookieHelper.getCookie('access_token');
    try {
        const response = await fetch(`${API_URL}/groups/${groupId}/join`, {
            method: 'POST',
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
    useGroup,
    useGroups,
    useGroupPreview,
    createGroup,
    acceptInvite,
};

export default groupService;
