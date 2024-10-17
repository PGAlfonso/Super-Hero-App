import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { provideHttpClient } from '@angular/common/http';


describe('HeroService -- Real HTTP Request', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ HeroService, provideHttpClient()]
    });
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch real heroes from the API', (done) => {
    service.getAllHeroes().subscribe((heroes) => {
      expect(heroes).toBeTruthy(); //validar que la respuesta no este vacia
      expect(heroes.length).toBeGreaterThan(0); // verifica que haya almenos un heroe
      done(); // prueba finalizada
    })
  });
});
