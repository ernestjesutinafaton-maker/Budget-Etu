import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DepenseCard } from './depense-card';

describe('DepenseCard', () => {
  beforeEach(() => {
    registerLocaleData(localeFr);
    TestBed.configureTestingModule({
      imports: [DepenseCard],
      providers: [provideRouter([]), { provide: LOCALE_ID, useValue: 'fr' }],
    });
  });

  it('affiche le libellé, le montant, la date et un lien vers le détail', async () => {
    const fixture = TestBed.createComponent(DepenseCard);
    fixture.componentRef.setInput('depense', {
      id: '4',
      libelle: 'Cinéma',
      montant: 9.5,
      date: '2026-09-14',
      categorie: 'Loisirs',
    });
    await fixture.whenStable();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h3')?.textContent).toContain('Cinéma');
    expect(el.querySelector('.montant')?.textContent).toContain('9,50');
    expect(el.querySelector('.date')?.textContent).toContain('14/09/2026');
    expect(el.querySelector('a')?.getAttribute('href')).toBe('/depenses/4');
  });
});
