import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-page-introuvable',
  template: `
    <h2>Page introuvable (404)</h2>
    <p>Cette page n'existe pas.</p>
    <a routerLink="/depenses">Retour aux dépenses</a>
  `,
})
export class PageIntrouvable {}
