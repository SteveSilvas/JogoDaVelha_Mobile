import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';

interface LineProps {
    children: any
}

const Line: React.FC<LineProps> = ({children}) => {
    return (
        <View style={{ display: "flex", flexDirection: "row", padding: 10, backgroundColor: "black", flexWrap:"wrap" }}>
            {children}
        </View>
    );
}


export default Line;
