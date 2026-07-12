import { Routes } from '@angular/router';
import { HomeComponent } from './modules/word-collection/home/home.component';
import { AddWordComponent } from './modules/word-collection/add-word/add-word.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add-word', component: AddWordComponent }
];
