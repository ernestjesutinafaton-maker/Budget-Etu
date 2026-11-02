import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  it('pointe vers les bonnes pages', async () => {
    TestBed.configureTestingModule({ imports: [Header], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();

    const hrefs = [...fixture.nativeElement.querySelectorAll('a')].map((a: HTMLAnchorElement) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toEqual(['/depenses', '/depenses/nouvelle', '/stats']);
  });
});
