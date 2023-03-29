import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface ButtonProps {
    title: string;
    onClick: () => void;
    buttonStyle?: object,
    titleStyle?: object
}

const Button: React.FC<ButtonProps> = ({
    title,
    onClick,
    buttonStyle,
    titleStyle
}) => {
    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onClick}
        >
            <Text style={titleStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button