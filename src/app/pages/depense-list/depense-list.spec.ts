import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { DepenseList } from './depense-list';

describe('DepenseList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DepenseList],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it("n'affiche que les dépenses du mois choisi", async () => {
    const fixture = TestBed.createComponent(DepenseList);
    fixture.detectChanges(); // lance la requête sans attendre sa réponse

    // On répond nous-mêmes à la requête GET, sans json-server
    TestBed.inject(HttpTestingController)
      .expectOne('http://localhost:3000/depenses')
      .flush([
        { id: '1', libelle: 'Loyer', montant: 420, date: '2026-09-05', categorie: 'Logement' },
        { id: '9', libelle: 'Marché', montant: 21.8, date: '2026-10-11', categorie: 'Alimentation' },
      ]);
    await fixture.whenStable();

    const cartes = fixture.nativeElement.querySelectorAll('app-depense-card');
    expect(cartes.length).toBe(1);
    expect(cartes[0].textContent).toContain('Marché');
  });
});
