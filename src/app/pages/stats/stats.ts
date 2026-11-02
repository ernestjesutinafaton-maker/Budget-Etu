import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { DepensesService } from '../../core/depenses.service';
import { CATEGORIES } from '../../shared/depense';
import { moisCourant, totalDepenses, totalParCategorie } from '../../shared/calculs';

@Component({
  imports: [CurrencyPipe, DecimalPipe],
  selector: 'app-stats',
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats {
  protected svc = inject(DepensesService);
  protected mois = moisCourant();

  protected depensesDuMois = computed(() =>
    this.svc.depensesTriees().filter((d) => d.date.startsWith(this.mois)),
  );

  protected totalMois = computed(() => totalDepenses(this.depensesDuMois()));
  protected reste = computed(() => this.svc.budgetMensuel() - this.totalMois());
  protected depasse = computed(() => this.reste() < 0);

  // Part du budget consommée, plafonnée à 100 % pour la largeur de la barre
  protected pourcentage = computed(() => {
    const budget = this.svc.budgetMensuel();
    return budget > 0 ? Math.min(100, (this.totalMois() / budget) * 100) : 100;
  });

  protected totaux = computed(() => totalParCategorie(this.depensesDuMois()));

  protected parCategorie = computed(() =>
    CATEGORIES.map((categorie) => ({ categorie, montant: this.totaux()[categorie] ?? 0 })),
  );

  protected categoriePlusCouteuse = computed(() => {
    const triees = [...this.parCategorie()].sort((a, b) => b.montant - a.montant);
    return triees[0]?.montant > 0 ? triees[0].categorie : null;
  });

  protected changerBudget(valeur: number) {
    if (valeur >= 0) this.svc.budgetMensuel.set(valeur);
  }
}
