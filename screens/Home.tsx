import React, {useEffect, useState} from 'react';
import Card from "../components/Card";

export default function Home() {
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        fetch('http://localhost:8000/api/v1/recipes/')
            .then((res) => res.json())
            .then((json) => setData(json))
    }, [])
    return (
        <Card recipe={data[0]}/>
    );
}