async function fetchRecipes() {
    try {
        const response = await fetch('http://localhost:8000/api/v1/recipes', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function fetchRecipeInfo(id: number) {
    try {
        const response = await fetch(
            `http://localhost:8000/api/v1/recipes/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
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

const recipeService = {
    fetchRecipes,
    fetchRecipeInfo,
};

export default recipeService;
