import React from 'react';
import ItsAMatch from '../components/ItsAMatch';

export default function MatchScreen({ route }: { route: any }) {
    const { recipe } = route.params;
    return <ItsAMatch matchedRecipe={recipe} />;
}
