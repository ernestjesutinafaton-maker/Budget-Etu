import { Depense } from './depense';
import { totalDepenses, totalParCategorie } from './calculs';

const OCTOBRE: Depense[] = [
  { id: '7', libelle: 'Loyer', montant: 420, date: '2026-10-05', categorie: 'Logement' },
  { id: '8', libelle: 'Pass Navigo', montant: 43.4, date: '2026-10-06', categorie: 'Transport' },
  { id: '9', libelle: 'Marché', montant: 21.8, date: '2026-10-11', categorie: 'Alimentation' },
  { id: '10', libelle: "Livre d'algorithmique", montant: 34.9, date: '2026-10-13', categorie: 'Études' },
  { id: '11', libelle: 'Concert', montant: 28, date: '2026-10-18', categorie: 'Loisirs' },
  { id: '12', libelle: 'Courses Lidl', montant: 41.2, date: '2026-10-21', categorie: 'Alimentation' },
];

describe('calculs', () => {
  it("calcule le total d'octobre 2026 : 589,30 €", () => {
    expect(totalDepenses(OCTOBRE)).toBeCloseTo(589.3, 2);
  });

  it('renvoie 0 pour une liste vide', () => {
    expect(totalDepenses([])).toBe(0);
  });

  it('additionne les montants par catégorie', () => {
    const totaux = totalParCategorie(OCTOBRE);
    expect(totaux.Alimentation).toBeCloseTo(63, 2);
    expect(totaux.Logement).toBe(420);
  });
});
