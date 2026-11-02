import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { DepenseAjout } from './depense-ajout';

describe('DepenseAjout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DepenseAjout],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('désactive « Enregistrer » tant que le formulaire est vide', async () => {
    const fixture = TestBed.createComponent(DepenseAjout);
    // pas de whenStable : la requête GET du service ne recevra jamais de réponse ici
    fixture.detectChanges();

    const bouton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type=submit]');
    expect(bouton.disabled).toBe(true);
  });
});
