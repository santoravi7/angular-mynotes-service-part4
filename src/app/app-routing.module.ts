import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MynotesComponent }   from './mynotes/mynotes.component';

import { NotesDescComponent }  from './notes-desc/notes-desc.component';

const routes: Routes = [
  { path: '', component: MynotesComponent},
  { path: 'detail/:id', component: NotesDescComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}