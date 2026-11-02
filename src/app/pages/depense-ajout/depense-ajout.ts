import { Component, inject, input, linkedSignal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { form, FormField, min, minLength, required, submit, validate } from '@angular/forms/signals';
import { API, DepensesService } from '../../core/depenses.service';
import { Categorie, CATEGORIES, Depense } from '../../shared/depense';

interface DepenseForm {
  libelle: string;
  montant: number | null;
  date: string;
  categorie: Categorie | '';
}

const VIDE: DepenseForm = { libelle: '', montant: null, date: '', categorie: '' };

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-depense-ajout',
  templateUrl: './depense-ajout.html',
  styleUrl: './depense-ajout.css',
})
export class DepenseAjout {
  private svc = inject(DepensesService);
  private router = inject(Router);

  protected categories = CATEGORIES;

  // Présent seulement sur /depenses/:id/modifier (bonus), absent sur /depenses/nouvelle
  id = input<string>();

  // URL undefined => httpResource ne fait aucune requête
  private existante = httpResource<Depense>(() =>
    this.id() ? `${API}/depenses/${this.id()}` : undefined,
  );

  // Vide en ajout, prérempli dès que la dépense à modifier est chargée
  protected modele = linkedSignal<DepenseForm>(() => {
    if (!this.existante.hasValue()) return VIDE;
    const { libelle, montant, date, categorie } = this.existante.value();
    return { libelle, montant, date, categorie };
  });

  protected f = form(this.modele, (s) => {
    required(s.libelle, { message: 'Le libellé est obligatoire' });
    minLength(s.libelle, 2, { message: '2 caractères minimum' });
    required(s.montant, { message: 'Le montant est obligatoire' });
    min(s.montant, 0.01, { message: 'Le montant doit être au moins de 0,01 €' });
    required(s.date, { message: 'La date est obligatoire' });
    // Bonus : maxDate n'accepte que des Date, nos dates sont des chaînes 'AAAA-MM-JJ'
    validate(s.date, ({ value }) =>
      value() > aujourdhui() ? { kind: 'maxDate', message: 'La date ne peut pas être dans le futur' } : null,
    );
    required(s.categorie, { message: 'La catégorie est obligatoire' });
  });

  protected enregistrer(event: Event) {
    event.preventDefault();
    submit(this.f, async () => {
      const depense = this.modele() as Omit<Depense, 'id'>;
      const id = this.id();
      if (id) {
        await this.svc.modifier(id, depense);
      } else {
        await this.svc.ajouter(depense);
      }
      await this.router.navigate(['/depenses']);
    });
  }
}

function aujourdhui(): string {
  return new Date().toISOString().slice(0, 10);
}
