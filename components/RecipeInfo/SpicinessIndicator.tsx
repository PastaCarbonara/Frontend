import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import tw from '../../lib/tailwind';

export default function SpicinessIndicator({
    spiciness,
}: {
    spiciness: number;
}) {
    const chilis = [];
    for (let i = 0; i < spiciness; i++) {
        chilis.push(
            <MaterialCommunityIcons
                key={i}
                name="chili-mild"
                size={24}
                style={tw.style(i === spiciness - 1 ? '-mr-2' : '-mr-3')}
            />
        );
    }
    return <>{chilis}</>;
}
