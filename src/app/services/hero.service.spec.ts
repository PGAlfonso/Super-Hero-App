import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { Hero } from '@interfaces/hero.interface';
import { of } from 'rxjs';

describe('HeroService', () => {
  let service: HeroService;
  let httpTestingController: HttpTestingController;

  const mockHeroes: Hero[] = [
    { id: 1, name: 'Superman',powerStats: { strength: 50, combat: 50 , durability: 50 , intelligence: 50, power:50, speed:50 } },
    { id: 2, name: 'Batman', powerStats: { strength: 80, combat: 80 , durability: 80 , intelligence: 80, power:80, speed:80 } }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), // Proporciona HttpClient sin el módulo deprecado
        provideHttpClientTesting() // Configuración para pruebas
      ]
    });

    service = TestBed.inject(HeroService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve all heroes from the API', () => {
    service.getAllHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpTestingController.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes); // Simula una respuesta de la API
  });

  it('should search heroes by name', (done) => {
    service.searchHeroesByName('perman', mockHeroes).subscribe((heroes) => {
      expect(heroes.length).toBe(1);
      expect(heroes[0].name).toBe('Superman');
      done();
    });
  });

  it('should search heroes by ID', (done) => {
    service.searchHeroesById(1, mockHeroes).subscribe((hero) => {
      expect(hero).toBeTruthy();
      expect(hero?.name).toBe('Superman');
      done();
    });
  });

  it('should add a new hero', (done) => {
    const newHero: Hero = { id: 0, name: 'Wonder Woman', powerStats: { strength: 50, combat: 50 , durability: 50 , intelligence: 50, power:50, speed:50 }};

    service.addHero(newHero, mockHeroes).subscribe((heroes) => {
      expect(heroes.length).toBe(3);
      expect(heroes[2].id).toBe(3); // El ID se incrementa en la función
      expect(heroes[2].name).toBe('Wonder Woman');
      done();
    });
  });

  it('should update an existing hero', (done) => {
    const updatedHero: Hero = { id: 1, name: 'Superman Updated', powerStats: { strength: 90, combat: 90 , durability: 90 , intelligence: 90, power:90, speed:90 } };

    service.updateHero(updatedHero, mockHeroes).subscribe((heroes) => {
      expect(heroes.length).toBe(2);
      expect(heroes[0].name).toBe('Superman Updated');
      done();
    });
  });

  it('should delete a hero by ID', (done) => {
    service.deleteHero(1, mockHeroes).subscribe((heroes) => {
      expect(heroes.length).toBe(1);
      expect(heroes[0].id).toBe(2);
      done();
    });
  });
});
