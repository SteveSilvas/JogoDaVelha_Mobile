import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { Player } from '../@types/Player'
import Colors from '../utils/Colors'

interface BoardHeaderProps {
    player: Player
}
const BoardHeader: React.FC<BoardHeaderProps> = ({ player }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Jogo da Velha</Text>
            <Text style={styles.headerSubtitle}>Vez do {player}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        display: "flex",
        backgroundColor: Colors.primary1
    },
    headerTitle: {
        fontSize: 30,
        textAlign: "center"
    },
    headerSubtitle: {
        fontSize: 15,
        color: "#000",
        textAlign: "center"
    },
});

export default BoardHeader;