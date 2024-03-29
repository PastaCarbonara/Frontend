import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Group } from '../../types';

export default function Dropdown({
    options,
    height,
    onChange,
    initialOption,
}: {
    options: Group[];
    height?: number;
    onChange: (option: Group) => void;
    initialOption?: any;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(initialOption);
    const [optionsList, setOptionsList] = useState(options);
    useEffect(() => {
        setSelectedOption(initialOption);
        setOptionsList(options);
    }, [initialOption, options]);
    return (
        <View style={tw`relative items-center`}>
            <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                style={tw.style(
                    height ? `h-[${height}px]` : 'h-8',
                    'flex-row items-center justify-between w-40 px-4'
                )}
            >
                <Text style={tw`text-gray-500`}>{selectedOption?.name}</Text>
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
                    {optionsList.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            onPress={() => {
                                setSelectedOption(option);
                                onChange(option);
                                setIsOpen(false);
                            }}
                            style={tw`flex-row items-center justify-between w-full h-10 px-4`}
                        >
                            <Text style={tw`text-gray-500`}>{option.name}</Text>
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
