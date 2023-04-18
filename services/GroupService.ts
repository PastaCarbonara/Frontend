import { API_URL } from '@env';

async function fetchGroups() {
    try {
        const response = await fetch(`${API_URL}/groups`);
        return responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function fetchGroupInfo(groupId: string) {
    console.log('fetching group info');
    try {
        const response = await fetch(`${API_URL}/groups/${groupId}`, {
            headers: {
                authorization:
                    'Bearer ' +
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2ODE3NDUzOTV9.2rcOZtaECRzc8yBcHPqTF6sLSx4cfU9mo5cC7K1CtI8',
            },
        });
        return responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

function responseChecker(response: Response): Promise<any> {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

const groupService = {
    fetchGroups,
    fetchGroupInfo,
};

export default groupService;
