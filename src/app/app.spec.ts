import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    });
  });

  it('affiche le menu avec ses 3 liens', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const liens = fixture.nativeElement.querySelectorAll('app-header nav a');
    expect(liens.length).toBe(3);
  });
});
