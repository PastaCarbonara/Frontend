import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import tw from '../lib/tailwind';

export default function TextInputWithLabel({
    label,
    onInputChange,
    ...inputProps
}: TextInputProps & {
    label: string;
    onInputChange: (name: string) => void;
}) {
    const [wordCount, setWordCount] = React.useState(() =>
        inputProps.defaultValue != undefined
            ? inputProps.defaultValue.length
            : 0
    );
    return (
        <View style={tw`h-8 flex-1 w-full`}>
            <Text style={tw`text-text_primary`}>{label}</Text>
            <View style={tw`border-b flex-row items-center gap-2`}>
                <TextInput
                    onChange={(e) => {
                        setWordCount(e.nativeEvent.text.length);
                        onInputChange(e.nativeEvent?.text);
                    }}
                    {...inputProps}
                />
                <Text
                    style={tw.style(
                        `${
                            wordCount === inputProps?.maxLength
                                ? 'text-red-500'
                                : 'text-text_primary'
                        }`
                    )}
                >
                    {wordCount}
                </Text>
            </View>
        </View>
    );
}
