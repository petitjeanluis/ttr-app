import { Injectable } from "@angular/core";

@Injectable({
providedIn: 'root'
})
export class LocalStoreService {

    GAME_ID = 'gameId'
    PLAYER_ID = 'playerId'
    PLAYER_NAME = 'playerName'
    MAX_ID = 1000000
    
    getPlayerId(): number {
        const item = localStorage.getItem(this.PLAYER_ID)

        if (item == null) {
            localStorage.setItem(this.PLAYER_ID, Math.floor(Math.random() * this.MAX_ID).toString())
        }

        return parseInt(localStorage.getItem(this.PLAYER_ID))
    }

    getGameId(): number {
        const item = localStorage.getItem(this.GAME_ID)
        return item != null ? parseInt(localStorage.getItem(this.GAME_ID), 10) : null
    }

    setGameId(id: number) {
        if (id != null) {
            localStorage.setItem(this.GAME_ID, id.toString())
        }
    }

    getPlayerName(): string {
        return localStorage.getItem(this.PLAYER_NAME)
    }

    setPlayerName(playerName: string) {
        if (playerName != null) {
            localStorage.setItem(this.PLAYER_NAME, playerName)
        }
    }

    clearGameId() {
        localStorage.removeItem(this.GAME_ID)
    }
}