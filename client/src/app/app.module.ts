import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayAreaComponent } from '@app/components/play-area/play-area.component';
import { SidebarComponent } from '@app/components/sidebar/sidebar.component';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { AppMaterialModule } from '@app/modules/material.module';
import { AppComponent } from '@app/pages/app/app.component';
import { GamePageComponent } from '@app/pages/game-page/game-page.component';
import { MainPageComponent } from '@app/pages/main-page/main-page.component';
import { MaterialPageComponent } from '@app/pages/material-page/material-page.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { CheatComponent } from './components/cheat/cheat.component';
import { JeuxComponent } from './components/jeux/jeux/jeux.component';
import { JoinBarComponent } from './components/join-bar/join-bar.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { GameCreationPageComponent } from './pages/game-creation-page/game-creation-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { OneVsOnePageComponent } from './pages/one-vs-one-page/one-vs-one-page.component';
import { SalleAttenteComponent } from './pages/salle-attente/salle-attente.component';
import { SelectionPageComponentComponent } from './pages/selection-page-component/selection-page-component.component';
import { SoloViewPageComponent } from './pages/solo-view-page/solo-view-page.component';
import { ModeIndiceComponent } from './components/mode-indice/mode-indice.component';

/**
 * Main module that is used in main.ts.
 * All automatically generated components will appear in this module.
 * Please do not move this module in the module folder.
 * Otherwise Angular Cli will not know in which module to put new component
 */
@NgModule({
    declarations: [
        AppComponent,
        GamePageComponent,
        MainPageComponent,
        MaterialPageComponent,
        PlayAreaComponent,
        SidebarComponent,
        ConfigurationPageComponent,
        GameCreationPageComponent,
        SoloViewPageComponent,
        SelectionPageComponentComponent,
        JeuxComponent,
        LoginPageComponent,
        CheatComponent,
        OneVsOnePageComponent,
        SalleAttenteComponent,
        JoinBarComponent,
        ChatBoxComponent,
        ModeIndiceComponent,
    ],
    imports: [AppMaterialModule, AppRoutingModule, BrowserAnimationsModule, BrowserModule, FormsModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
