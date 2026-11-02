import { Component, inject, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { API, DepensesService } from '../../core/depenses.service';
import { Depense } from '../../shared/depense';
import { BadgeCategorie } from '../../shared/badge-categorie/badge-categorie';

@Component({
  imports: [CurrencyPipe, DatePipe, RouterLink, BadgeCategorie],
  selector: 'app-depense-detail',
  templateUrl: './depense-detail.html',
  styleUrl: './depense-detail.css',
})
export class DepenseDetail {
  private svc = inject(DepensesService);
  private router = inject(Router);

  // Rempli par le router grâce à withComponentInputBinding()
  id = input.required<string>();

  // Relancé automatiquement si id() change
  protected depense = httpResource<Depense>(() => `${API}/depenses/${this.id()}`);

  protected async supprimer() {
    if (!confirm('Supprimer cette dépense ?')) return;
    await this.svc.supprimer(this.id());
    await this.router.navigate(['/depenses']);
  }
}
