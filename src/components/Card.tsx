import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CardType } from '../@types/CardType';
import { Player } from '../@types/Player';
import Colors from '../utils/Colors';

interface CardProps {
    id: number;
    player: Player;
    onClick: (cardId: number) => Player;
}

const Card: React.FC<CardProps> = ({ id, player, onClick }) => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [playerLocal, setPlayerLocal] = useState<Player>(player);

    useEffect(() => {
        setPlayerLocal(player ?? "");
        if (player == "") {
            setDisabled(false);
        }
    }, [player]);

    const onClickLocal = (): void => {
        setDisabled(true);
        setPlayerLocal(onClick(id));
    }

    return (
        <TouchableOpacity
            disabled={disabled}
            style={styles.cardContainer}
            activeOpacity={0.8}
            onPress={onClickLocal}>
            <Text
                style={styles.cardText}
            >{playerLocal}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Colors.primary3,
        height: 100,
        width: 100,
        margin: 5,
        display: 'flex',
        justifyContent: "center"
    },
    cardText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 30
    }
});

export default Card;