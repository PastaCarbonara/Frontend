import { API_URL } from '@env';
import { SwipeSessionStatus } from '../types';
import { cookieHelper } from '../helpers/CookieHelper';

async function createSwipeSession({
    session_date,
    groupId,
}: {
    session_date: string;
    groupId: string;
}) {
    const access_token = cookieHelper.getCookie('access_token');
    try {
        const response = await fetch(
            `${API_URL}/groups/${groupId}/swipe_sessions`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${access_token}`,
                },
                body: JSON.stringify({
                    session_date: session_date,
                }),
            }
        );
        return response.json();
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function updateSwipeSessionStatus({
    groupId,
    swipeSessionId,
    status,
}: {
    groupId: string;
    swipeSessionId: string;
    status: SwipeSessionStatus;
}) {
    const access_token = cookieHelper.getCookie('access_token');
    try {
        const response = await fetch(
            `${API_URL}/groups/${groupId}/swipe_sessions`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${access_token}`,
                },
                body: JSON.stringify({
                    id: swipeSessionId,
                    status: status,
                }),
            }
        );
        return response.json();
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

const swipeSessionService = {
    createSwipeSession,
    updateSwipeSessionStatus,
};

export default swipeSessionService;
