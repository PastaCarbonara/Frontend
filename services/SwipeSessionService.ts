import { API_URL } from '@env';

async function createSwipeSession({
    session_date,
    status,
}: {
    session_date: string;
    status: string;
}) {
    try {
        const response = await fetch(`${API_URL}/swipe_sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MTg1NDIzOX0.Uy-fhftnkRQirs3-NIg1G8BznGeHmeqKJ4mt8TuPIsc',
            },
            body: JSON.stringify({
                session_date: session_date,
                status: status,
                // group_id: groupId,
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
