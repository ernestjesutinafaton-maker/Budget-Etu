import { HttpClient, httpResource } from '@angular/common/http';
import { computed, effect, inject, Service, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Depense } from '../shared/depense';

export const API = 'http://localhost:3000';
const CLE_BUDGET = 'budgetMensuel';

@Service()
export class DepensesService {
  private http = inject(HttpClient);

  // GET /depenses, exposé sous forme de signals (isLoading, error, value...)
  depenses = httpResource<Depense[]>(() => `${API}/depenses`);

  // Copie triée de la plus récente à la plus ancienne (sort() modifie le tableau d'origine)
  depensesTriees = computed(() => {
    const liste = this.depenses.hasValue() ? this.depenses.value() : [];
    return [...liste].sort((a, b) => b.date.localeCompare(a.date));
  });

  budgetMensuel = signal(lireBudget());

  constructor() {
    // Bonus : chaque changement du budget est recopié dans localStorage
    effect(() => localStorage.setItem(CLE_BUDGET, String(this.budgetMensuel())));
  }

  async ajouter(depense: Omit<Depense, 'id'>) {
    await firstValueFrom(this.http.post<Depense>(`${API}/depenses`, depense));
    this.depenses.reload();
  }

  async modifier(id: string, depense: Omit<Depense, 'id'>) {
    await firstValueFrom(this.http.patch<Depense>(`${API}/depenses/${id}`, depense));
    this.depenses.reload();
  }

  async supprimer(id: string) {
    await firstValueFrom(this.http.delete(`${API}/depenses/${id}`));
    this.depenses.reload();
  }
}

function lireBudget(): number {
  const sauvegarde = Number(localStorage.getItem(CLE_BUDGET));
  return sauvegarde > 0 ? sauvegarde : 700;
}
