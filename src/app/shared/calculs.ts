import { Categorie, Depense } from './depense';

// Fonctions pures : faciles à tester et réutilisées par la liste et les stats

export function totalDepenses(depenses: Depense[]): number {
  return depenses.reduce((acc, d) => acc + d.montant, 0);
}

export function totalParCategorie(depenses: Depense[]): Partial<Record<Categorie, number>> {
  const totaux: Partial<Record<Categorie, number>> = {};
  for (const d of depenses) {
    totaux[d.categorie] = (totaux[d.categorie] ?? 0) + d.montant;
  }
  return totaux;
}

// Mois courant au format 'AAAA-MM', comme <input type="month">
export function moisCourant(): string {
  return new Date().toISOString().slice(0, 7);
}
