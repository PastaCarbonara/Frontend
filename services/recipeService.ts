async function fetchRecipes() {
    try {
        const response = await fetch('http://localhost:8000/api/v1/recipes', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            //todo actually handle status
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error(`Error fetching data: ${error}`)
    }
}

const recipeService = {
    fetchRecipes
};

export default recipeService;