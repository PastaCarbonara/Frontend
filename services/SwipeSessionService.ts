import { API_URL } from '@env';

async function createSwipeSession({
    sessionDate,
    groupId,
}: {
    sessionDate: string;
    groupId: string;
}) {
    try {
        const response = await fetch(`${API_URL}/swipe_sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2ODExNjQxNDR9.I5rugH3lfgCfCjtRkx82HC2J6RqXO97DQZIV-b-7jGk',
            },
            body: JSON.stringify({
                sessionDate: sessionDate,
                group_id: groupId,
            }),
        });
        return response.json();
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

const swipeSessionService = {
    createSwipeSession,
};

export default swipeSessionService;
