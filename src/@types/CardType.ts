import { Player } from "./Player";

export type CardType = {
    id: number;
    player: Player,
    onClick: (cardId: number) => Player
}
