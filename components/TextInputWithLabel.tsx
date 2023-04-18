import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import tw from '../lib/tailwind';

export default function TextInputWithLabel({
    label,
    ...inputProps
}: TextInputProps & {
    label: string;
}) {
    const [wordCount, setWordCount] = React.useState(0);
    return (
        <View>
            <Text style={tw`text-gray-500`}>{label}</Text>
            <View style={tw`border-b flex-row items-center gap-2`}>
                <TextInput
                    {...inputProps}
                    onChange={(e) => {
                        setWordCount(e.nativeEvent.text.length);
                    }}
                />
                <Text
                    style={tw.style(`${wordCount === 100 && 'text-red-500'}`)}
                >
                    {wordCount}
                </Text>
            </View>
        </View>
    );
}
