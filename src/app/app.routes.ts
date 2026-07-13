import { Routes } from '@angular/router';
import { HomeComponent } from './modules/word-collection/home/home.component';
import { AddWordComponent } from './modules/word-collection/add-word/add-word.component';
import { EditWordComponent } from './modules/word-collection/edit-word/edit-word.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add-word', component: AddWordComponent },
    { path: 'edit-word/:id', component: EditWordComponent }, // Assuming you have an EditWordComponent for editing words
];
    