import { API_URL } from '@env';

async function createSwipeSession({
    session_date,
    groupId,
}: {
    session_date: string;
    groupId: string;
}) {
    try {
        const response = await fetch(
            `${API_URL}/groups/${groupId}/swipe_sessions`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MjExMTc5N30.NpuXtyU_MxnHD-WqQrkfv2uX7Zil8uzY1MQ_FBoBM_M',
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
    status: string;
}) {
    try {
        const response = await fetch(
            `${API_URL}/groups/${groupId}/swipe_sessions`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MjExMTc5N30.NpuXtyU_MxnHD-WqQrkfv2uX7Zil8uzY1MQ_FBoBM_M',
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
