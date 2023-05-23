import { Text, View } from 'react-native';
import tw from '../lib/tailwind';
import React, { Fragment } from 'react';
import Separator from './Separator';

export default function CheckBoxComponent({
    label,
    checkState,
    onChange,
}: {
    label: string;
    checkState: boolean;
    onChange: () => any;
}) {
    function flipCheckState() {
        checkState = !checkState;
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
                    onChange={onChange}
                    defaultChecked={checkState}
                />
            </View>
            <Separator />
        </Fragment>
    );
}
