import { Text, View } from 'react-native';
import tw from '../lib/tailwind';
import React, { Fragment } from 'react';
import Separator from './Separator';

export default function CheckBoxComponent({
    label,
    checkState,
    functionality,
}: {
    label: string;
    checkState: boolean;
    functionality: any;
}) {
    function flipCheckState() {
        checkState = !checkState;
        console.log(checkState);
    }
    return (
        <Fragment>
            <View style={tw`flex-row w-full`}>
                <Text style={tw`flex-grow`}>{label}</Text>
                <input
                    type="checkbox"
                    style={tw.style('bg-blue-100', {
                        accentColor: '#4338CA',
                    })}
                    onClick={flipCheckState}
                    onChange={functionality}
                    defaultChecked={checkState}
                />
            </View>
            <Separator />
        </Fragment>
    );
}
