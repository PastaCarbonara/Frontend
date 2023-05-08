import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Dropdown({
    options,
    height,
}: {
    options: string[];
    height?: number;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    return (
        <View style={tw`relative items-center`}>
            <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                style={tw.style(
                    height ? `h-[${height}px]` : 'h-8',
                    'flex-row items-center justify-between w-40 px-4'
                )}
            >
                <Text style={tw`text-gray-500`}>{selectedOption}</Text>
                <MaterialCommunityIcons
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color="black"
                />
            </TouchableOpacity>
            {isOpen && (
                <View
                    style={tw`absolute top-10 right-0 w-40 bg-white rounded-lg shadow-lg`}
                >
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => {
                                setSelectedOption(option);
                                setIsOpen(false);
                            }}
                            style={tw`flex-row items-center justify-between w-full h-10 px-4`}
                        >
                            <Text style={tw`text-gray-500`}>{option}</Text>
                            {option === selectedOption && (
                                <MaterialCommunityIcons
                                    name="check"
                                    size={24}
                                    color="black"
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}
