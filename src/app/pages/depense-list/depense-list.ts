import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { DepensesService } from '../../core/depenses.service';
import { DepenseCard } from '../../shared/depense-card/depense-card';
import { CATEGORIES } from '../../shared/depense';
import { totalDepenses } from '../../shared/calculs';

@Component({
  imports: [DepenseCard, CurrencyPipe],
  selector: 'app-depense-list',
  templateUrl: './depense-list.html',
  styleUrl: './depense-list.css',
})
export class DepenseList {
  protected depenseService = inject(DepensesService);
  protected categoriesList = CATEGORIES;

  protected mois = signal('2026-10');
  protected categorie = signal(''); // '' = toutes
  protected recherche = signal('');

  // Mois + catégorie + recherche texte dans un seul computed
  protected depensesFiltrees = computed(() => {
    const texte = this.recherche().trim().toLowerCase();
    return this.depenseService
      .depensesTriees()
      .filter((d) => d.date.startsWith(this.mois()))
      .filter((d) => this.categorie() === '' || d.categorie === this.categorie())
      .filter((d) => d.libelle.toLowerCase().includes(texte));
  });

  protected total = computed(() => totalDepenses(this.depensesFiltrees()));
}
