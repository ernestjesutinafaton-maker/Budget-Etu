import { TestBed } from '@angular/core/testing';
import { BadgeCategorie } from './badge-categorie';

describe('BadgeCategorie', () => {
  it('applique la classe CSS de la catégorie', async () => {
    const fixture = TestBed.createComponent(BadgeCategorie);
    fixture.componentRef.setInput('categorie', 'Études');
    await fixture.whenStable();

    const badge: HTMLElement = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList).toContain('etudes');
    expect(badge.textContent).toContain('Études');
  });
});
