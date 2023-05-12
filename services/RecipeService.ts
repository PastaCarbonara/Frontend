import useSWR from 'swr';
import { fetcher } from './Fetcher';

function useRecipes() {
    const { data, error, isLoading } = useSWR('/recipes', fetcher);
    return {
        recipes: data,
        isLoading,
        isError: error,
    };
}

function useRecipe(id: number) {
    const { data, error, isLoading } = useSWR(
        id ? `/recipes/${id}` : null,
        fetcher
    );
    return {
        recipe: data,
        isLoading,
        isError: error,
    };
}

const recipeService = {
    useRecipes,
    useRecipe,
};

export default recipeService;
