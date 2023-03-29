import { StyleSheet, View, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Line from './Line';
import { Player } from '../@types/Player';
import Colors from '../utils/Colors';
import Board from '../@types/Board';
import BoardHeader from './BoardHeader';
import Button from './Button';
import ScoreBoard from './ScoreBoard';

const Tabuleiro = () => {
    const [jogadorAtual, setjogadorAtual] = useState<Player>('O');

    const boardEmpty: Board = {
        linha0: ["", "", ""],
        linha1: ["", "", ""],
        linha2: ["", "", ""],
    };

    const [tabuleiro, setTabuleiro] = useState<Board>(boardEmpty);

    const [round, setRound] = useState<number>(0);
    const [score, setScore] = useState<Player>("");

    useEffect(() => {
        if (round === 10) {
            console.log("velha" + round);
            setScore('V');
        }
    }, [round]);

    useEffect(() => {
        if (verificaGanhador()) {
            setScore(jogadorAtual);
        } else {
            setRound(round + 1);
            changePlayer(jogadorAtual);
        };
    }, [tabuleiro]);

    useEffect(() => {
        if (score != "") {
            onClickRestart();
        }
    }, [score]);

    const verificaGanhador = (): boolean => {
        console.log(tabuleiro);
        let vencido: boolean = false;
        if (verifyHorizontal()) {
            console.log(`O Jogador venceu na horizontal`);
            vencido = true;
        }
        else if (verifyVertical()) {
            console.log(`O Jogador venceu na vertical`);
            vencido = true;
        }
        else if (verifyDiagonal()) {
            console.log(`O Jogador venceu na diagonal`);
            vencido = true;
        }

        return vencido;
    }

    const verifyHorizontal = (): boolean => {
        const linha0Match: boolean = tabuleiro.linha0[0] !== "" && isEqualsElements(tabuleiro.linha0);
        const linha1Match: boolean = tabuleiro.linha1[0] !== "" && tabuleiro.linha1.every((element) => element === tabuleiro.linha1[0]);
        const linha2Match: boolean = tabuleiro.linha2[0] !== "" && tabuleiro.linha2.every((element) => element === tabuleiro.linha2[0]);
        return linha0Match || linha1Match || linha2Match;
    }

    const isEqualsElements = (arr: string[]): boolean => {
        return arr.every((element) => element === arr[0]);
    }

    const verifyVertical = (): boolean => {
        if (tabuleiro.linha0[0] == "" &&
            tabuleiro.linha0[1] == "" &&
            tabuleiro.linha0[2] == "") {
            console.log("linha 0 vazia");
            return false
        };

        for (let i = 0; i < 3; i++) {
            if (tabuleiro.linha0[i] != "" && tabuleiro.linha0[i] === tabuleiro.linha1[i]
                && tabuleiro.linha0[i] === tabuleiro.linha2[i]) {
                return true;
            }
        }

        return false;
    }

    const verifyDiagonal = (): boolean => {
        const diagonalAMatch: boolean = tabuleiro.linha0[0] != ""
            && tabuleiro.linha0[0] === tabuleiro.linha1[1]
            && tabuleiro.linha0[0] === tabuleiro.linha2[2];

        const diagonalBMatch: boolean = tabuleiro.linha0[2] != ""
            && tabuleiro.linha0[2] === tabuleiro.linha1[1]
            && tabuleiro.linha0[2] === tabuleiro.linha2[0];

        return diagonalAMatch || diagonalBMatch;
    }

    const changePlayer = (playerAtual: Player): void => {
        const newPlayer = playerAtual === 'O' ? 'X' : 'O';
        setjogadorAtual(newPlayer)
    }

    const onClickHandle = (CardId: number): Player => {
        updateTabuleiro(CardId);
        return jogadorAtual;
    }

    const updateTabuleiro = (cardId: number): void => {
        let linha: string[];
        if (cardId < 3) {
            linha = tabuleiro.linha0;

            linha[cardId] = jogadorAtual ?? "";

            setTabuleiro((prev: any) => {
                return {
                    ...prev,
                    linha0: linha
                }
            });
        }
        else if (cardId > 2 && cardId < 13) {
            linha = tabuleiro.linha1;

            linha[getUnidade(cardId)] = jogadorAtual ?? "";
            setTabuleiro((prev: any) => {
                return {
                    ...prev,
                    linha1: linha
                }
            });
        }
        else {
            linha = tabuleiro.linha2;

            linha[getUnidade(cardId)] = jogadorAtual ?? "";
            setTabuleiro((prev: any) => {
                return {
                    ...prev,
                    linha2: linha
                }
            });
        }
    }

    const getUnidade = (dezena: number): number => {
        return dezena % 10;
    }

    const onClickRestart = (): void => {
        setRound(0);
        setTabuleiro(boardEmpty);
    }

    const renderRow0 = (): JSX.Element[] => {
        let elements: JSX.Element[] = [];
        tabuleiro.linha0.map((element: Player, i: number) => {
            elements.push(
                <Card
                    key={i}
                    id={i}
                    onClick={onClickHandle}
                    player={element}
                />
            );
        });

        return elements;
    }

    const renderRow1 = (): JSX.Element[] => {
        let elements: JSX.Element[] = [];
        tabuleiro.linha1.map((element: Player, i: number) => {
            elements.push(
                <Card
                    key={10 + i}
                    id={10 + i}
                    onClick={onClickHandle}
                    player={element}
                />
            );
        });

        return elements;
    }

    const renderRow2 = (): JSX.Element[] => {
        let elements: JSX.Element[] = [];
        tabuleiro.linha2.map((element: Player, i: number) => {
            elements.push(
                <Card
                    key={20 + i}
                    id={20 + i}
                    onClick={onClickHandle}
                    player={element}
                />
            );
        });

        return elements;
    }

    const renderGame = (): JSX.Element | undefined => {
        return score == "" ? (
            <>
                <View style={{ padding: 20, width: "100%" }}>
                    <BoardHeader player={jogadorAtual} />
                </View>
                <View>
                    <Line>
                        {renderRow0()}
                    </Line>

                    <Line>
                        {renderRow1()}
                    </Line>

                    <Line>
                        {renderRow2()}
                    </Line>
                </View>
                <View>
                    <Button
                        buttonStyle={styles.buttonContainer}
                        titleStyle={styles.buttonTitle}
                        title='Restart'
                        onClick={onClickRestart}
                    />
                </View>
            </>
        ) : undefined;
    }

    return (
        <SafeAreaView style={styles.root}>
            <ScoreBoard
                player={score}
                visible={score != ""}
                onBackClick={() => setScore("")} />
            {renderGame()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: Colors.primary0
    },
    buttonContainer: {
        backgroundColor: Colors.primary3,
        width: 200,
        padding: 10,
        borderRadius: 6
    },
    buttonTitle: {
        color: Colors.primary0,
        fontSize: 20,
        textAlign: 'center'
    }
});

export default Tabuleiro;