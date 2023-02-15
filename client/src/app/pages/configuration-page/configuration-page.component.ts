import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

type Game = {
    title: string;
    difficulty: string;
    image: string;
};

const GAMES_LIST: Game[] = [
    {
        title: 'Jeu 1',
        difficulty: 'Facile',
        image: 'https://www.jardiner-malin.fr/wp-content/uploads/2015/02/tilleul-arbre.jpg',
    },
    {
        title: 'Jeu 2',
        difficulty: 'Moyen',
        image: 'https://www.jardiner-malin.fr/wp-content/uploads/2015/02/tilleul-arbre.jpg',
    },
    {
        title: 'Jeu 3',
        difficulty: 'Facile',
        image: 'https://www.jardiner-malin.fr/wp-content/uploads/2015/02/tilleul-arbre.jpg',
    },
    {
        title: 'Jeu 4',
        difficulty: 'Difficile',
        image: 'https://www.jardiner-malin.fr/wp-content/uploads/2015/02/tilleul-arbre.jpg',
    },
    {
        title: 'Jeu 5',
        difficulty: 'Facile',
        image: 'https://www.jardiner-malin.fr/wp-content/uploads/2015/02/tilleul-arbre.jpg',
    },
];

const display = 4;

@Component({
    selector: 'app-configuration-page',
    templateUrl: './configuration-page.component.html',
    styleUrls: ['./configuration-page.component.scss'],
})
export class ConfigurationPageComponent {
    @ViewChild('popUpWindow') popUpWindow: ElementRef<HTMLDivElement>;
    games = GAMES_LIST;
    hasprevious: boolean = false;
    hasnext: boolean = true;
    firstgame: number = 0;
    lastgame: number = display;
    marge: number = display;
    gamesDisplayed = this.games.slice(this.firstgame, this.lastgame);

    constructor(private router: Router) {}

    goToHomePage(): void {
        this.router.navigate(['/home']);
    }
    goToCreationPage(): void {
        this.router.navigate(['/gameCreation']);
    }
    next(): void {
        this.gamesDisplayed = this.games.slice(this.lastgame, this.lastgame + this.marge);
        this.firstgame = this.lastgame;
        this.lastgame = this.lastgame + this.marge;
        this.hasprevious = true;

        if (this.lastgame >= this.games.length) {
            this.hasnext = false;
        }
    }

    previous(): void {
        this.gamesDisplayed = this.games.slice(this.firstgame - this.marge, this.firstgame);
        this.lastgame = this.firstgame;
        this.firstgame = this.firstgame - this.marge;
        this.hasnext = true;

        if (this.firstgame === 0) {
            this.hasprevious = false;
        }
    }

    goToConstants() {
        this.popUpWindow.nativeElement.style.display = 'block';
    }

    onClosingPopUp(): void {
        this.popUpWindow.nativeElement.style.display = 'none';
    }
}
