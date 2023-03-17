import React, {useEffect, useState} from 'react';
import Recipe from "../components/Recipe";

export default function Home({route}:any) {
    const {id} = route.params;
    const [data, setData] = useState<Object[]>([]);
    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/recipes/${id}`)
            .then((res) => res.json())
            .then((json) => setData(json))
    }, [])
    return (
        <Recipe recipeData={data}/>
    );
}
