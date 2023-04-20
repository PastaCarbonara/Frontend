function responseChecker(response: Response): Promise<any> {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

const httpErrorHandling = {
    responseChecker,
};

export default httpErrorHandling;
