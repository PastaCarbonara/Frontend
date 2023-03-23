import React, {useEffect, useState} from 'react';
import Recipe from "../components/Recipe";

export default function Home({route}) {
    const {id} = route.params;
    const [recipeData, setRecipeData] = useState<Object[]>([]);

    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:8000/api/v1/recipes/${id}`),
        ]).then(([resRecipe]) => Promise.all([resRecipe.json()]))
            .then(([resRecipeData]) => {
                setRecipeData(resRecipeData);
            })
    }, [])
    console.log(recipeData);
    return (
        <Recipe recipeInfo={recipeData}/>
    );
}