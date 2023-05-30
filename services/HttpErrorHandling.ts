function responseChecker(response: Response): Promise<any> {
    if (response.ok) {
        return response.json();
    } else {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

const httpErrorHandling = {
    responseChecker,
};

export default httpErrorHandling;
