import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Player } from '../@types/Player';
import Button from './Button';
import Colors from '../utils/Colors';

interface ScoreProps {
    visible: boolean;
    player: Player;
    onBackClick: () => void
}
const ScoreBoard: React.FC<ScoreProps> = ({
    visible,
    player,
    onBackClick
}) => {

    const winnerMessage = (): boolean | JSX.Element => {
        const winner = player === 'O' || player === 'X'
        return winner && <Text style={styles.message}>Parabéns o {player} venceu</Text>
    }

    const oldMessage = (): boolean | JSX.Element => {
        return player === 'V' && <Text style={styles.message}>Deu VELHA!</Text>
    }
    
    return visible ? (
        <View style={styles.card}>
            {winnerMessage()}
            {oldMessage()}
            <Button
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                title='Voltar'
                onClick={onBackClick}
            />
        </View>
    ) : <></>
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.primary0,
        borderWidth: 2,
        borderColor: Colors.primary4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        height: 300,
        marginTop: 10
    },
    message: {
        color: "black"
    },
    button: {
        marginTop: 50,
        width: 200,
        backgroundColor: Colors.primary2,
    },
    buttonTitle: {
        textAlign: "center",

    }
})

export default ScoreBoard