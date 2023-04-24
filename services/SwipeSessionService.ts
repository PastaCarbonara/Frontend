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
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MTk5NTM5Nn0.pZ945HAjvk1HH-YzRPzT0o0SL4NNbhwLxjzKJOZtU8g',
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

const swipeSessionService = {
    createSwipeSession,
};

export default swipeSessionService;
