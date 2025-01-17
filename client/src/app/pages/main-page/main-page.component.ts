import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from '@app/services/communication.service';
import { LobbyService } from '@app/services/lobby.service';
import { LoginFormService } from '@app/services/login-form.service';
import { SocketClientService } from '@app/services/socket-client-service.service';
import { Message } from '@common/message';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    readonly title: string = 'LOG2990';
    message: BehaviorSubject<string> = new BehaviorSubject<string>('');

    // eslint-disable-next-line max-params
    constructor(
        private readonly communicationService: CommunicationService,
        private router: Router,
        private socketManager: SocketClientService,
        private loginFormService: LoginFormService,
        private lobbyService: LobbyService,
    ) {}

    ngOnInit(): void {
        if (!this.socketManager.isSocketAlive()) {
            this.socketManager.connect();
        }
        this.loginFormService.setLimitedTimeGame(false);
        this.lobbyService.deleteLobby();
    }

    sendTimeToServer(): void {
        const newTimeMessage: Message = {
            title: 'Hello from the client',
            body: 'Time is : ' + new Date().toString(),
        };
        // Important de ne pas oublier "subscribe" ou l'appel ne sera jamais lancé puisque personne l'observe
        this.communicationService.basicPost(newTimeMessage).subscribe({
            next: (response) => {
                const responseString = `Le serveur a reçu la requête a retourné un code ${response.status} : ${response.statusText}`;
                this.message.next(responseString);
            },
            error: (err: HttpErrorResponse) => {
                const responseString = `Le serveur ne répond pas et a retourné : ${err.message}`;
                this.message.next(responseString);
            },
        });
    }

    getMessagesFromServer(): void {
        this.communicationService
            .basicGet()
            // Cette étape transforme l'objet Message en un seul string
            .pipe(
                map((message: Message) => {
                    return `${message.title} ${message.body}`;
                }),
            )
            .subscribe(this.message);
    }
    goToGameSelection(): void {
        this.router.navigate(['/gameSelection']);
    }

    goToConfiguration(): void {
        this.router.navigate(['/config']);
    }

    goToLimitedTimeGame() {
        this.loginFormService.setLimitedTimeGame(true);
        this.router.navigate(['/limitedTimeType']);
    }
}
