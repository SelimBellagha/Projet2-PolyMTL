import { Injectable } from '@angular/core';
import { AddedScoreResult } from '@app/interfaces/added-score-result';
import { GameHistory } from '@app/interfaces/game-history';
import { GameData, TopScore } from '@app/interfaces/game.interface';
import { Game } from '@app/pages/selection-page-component/selection-page-component.component';
import { firstValueFrom } from 'rxjs';
import { CommunicationService } from './communication.service';
import { SocketClientService } from './socket-client-service.service';

@Injectable({
    providedIn: 'root',
})
export class DisplayGameService {
    game: GameData;
    games: Game[] = [];
    history: GameHistory[] = [];
    tempGames: GameData[] = [];
    gameId: string;
    isScoreAdded: boolean = false;
    newScorePosition: string = 'temp';
    constructor(private comm: CommunicationService, private socketService: SocketClientService) {}

    loadGame(gameId: string) {
        return this.comm.getGameById(`${gameId}`).subscribe((game: GameData) => (this.game = game));
    }

    async loadAllGames() {
        const source = this.comm.getAllGames();
        this.tempGames = await firstValueFrom(source);
        await this.convertAllGames();
    }

    deleteAllGames() {
        for (const game of this.tempGames) {
            this.comm.deleteGame(game.id);
        }
    }

    resetAllScores() {
        for (const game of this.tempGames) {
            this.comm.resetGameScores(game.id);
        }
    }

    checkPlayerScore(newScore: TopScore) {
        this.comm.addScore(newScore).subscribe((response: AddedScoreResult) => {
            this.sendGlobalMessage(newScore, response);
        });
    }

    sendGlobalMessage(newScore: TopScore, response: AddedScoreResult) {
        this.isScoreAdded = response.isAdded;
        this.newScorePosition = response.positionIndex;
        newScore.position = response.positionIndex;
        this.socketService.send('globalMessage', newScore);
    }

    addHistory(newHistory: GameHistory) {
        this.comm.addNewGameHistory(newHistory);
    }

    convertDifficulty(game: GameData) {
        if (game.isDifficult) {
            return 'difficile';
        } else {
            return 'facile';
        }
    }

    deleteGameHistory() {
        this.comm.deleteGameHistory();
    }

    async getHistory() {
        const source = this.comm.getGameHistory();
        this.history = await firstValueFrom(source);
    }

    async updateLobbyAvailability() {
        for (const game of this.games) {
            game.playerInGame = await this.getPlayersInGame(game.id);
        }
    }

    async convertAllGames() {
        const tempArray: Game[] = [];
        for (const game of this.tempGames) {
            const playersInGame = await this.getPlayersInGame(game.id);
            const gameInformation: Game = {
                id: game.id,
                title: game.name,
                difficulty: this.convertDifficulty(game),
                image: game.originalImage,
                playerInGame: playersInGame,
            };
            tempArray.push(gameInformation);
        }
        this.games = tempArray;
    }

    setGameId(id: string) {
        this.gameId = id;
    }

    async getPlayersInGame(gameId: string): Promise<string> {
        return new Promise<string>((resolve) => {
            this.socketService.send('checkPlayersInGame', { gameId });
            this.socketService.on('playersInGame', (data: { playersNumber: string }) => {
                resolve(data.playersNumber);
            });
        });
    }
}
