import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HeroStore } from './hero-store.service';
import { HeroService } from '@services/hero.service';
import { of, throwError } from 'rxjs';
import { LoadingService } from '@services/loading.service';
import { Hero } from '@interfaces/hero.interface';

describe('HeroStore', () => {
  let heroStore: HeroStore;
  let heroService: jasmine.SpyObj<HeroService>;
  let loadingService: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', [
      'getAllHeroes',
      'addHero',
      'updateHero',
      'deleteHero',
      'searchHeroesById',
      'searchHeroesByName',
    ]);

    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);

    TestBed.configureTestingModule({
      providers: [
        HeroStore,
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
        provideHttpClient(),
      ],
    });

    heroStore = TestBed.inject(HeroStore);
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
  });

  it('should be created', () => {
    expect(heroStore).toBeTruthy();
  });

  it('should load heroes on initialization', () => {
    const mockHeroes: Hero[] = [{ id: 1, name: 'Superman' }, { id: 2, name: 'Batman' }];
    heroService.getAllHeroes.and.returnValue(of(mockHeroes)); // Simulamos el retorno de la API

    heroStore = TestBed.inject(HeroStore); // Volvemos a inyectar el HeroStore para ejecutar loadHeroes

    // Verifica que los héroes fueron cargados correctamente
    heroStore.heroes$.subscribe(heroes => {
      expect(heroes).toEqual(mockHeroes);
      expect(heroService.getAllHeroes).toHaveBeenCalled(); // Asegúrate de que el servicio fue llamado
    });
  });

  it('should handle error when loading heroes', () => {
    heroService.getAllHeroes.and.returnValue(throwError(() => new Error('Error al cargar héroes')));

    heroStore = TestBed.inject(HeroStore); // Vuelve a inyectar el HeroStore para ejecutar loadHeroes

    // Verifica que se manejó el error correctamente
    heroStore.heroes$.subscribe(heroes => {
      expect(heroes).toEqual([]); // Asegúrate de que la lista de héroes esté vacía en caso de error
    });
  });

  it('should add a hero', (done) => {
    const mockHero: Hero = { id: 1, name: 'Flash' };
    const mockHeroes: Hero[] = [{ id: 3, name: 'Superman' }, { id: 2, name: 'Batman' }];

    heroService.addHero.and.returnValue(of([...mockHeroes, mockHero])); // Simulamos la respuesta de añadir héroe
    heroStore.heroes$.subscribe(() => {
      heroStore.addHero(mockHero);
      expect(heroService.addHero).toHaveBeenCalledWith(mockHero, mockHeroes); // Verifica que el servicio fue llamado correctamente
    });

    heroStore.heroes$.subscribe(heroes => {
      expect(heroes).toEqual([...mockHeroes, mockHero]); // Verifica que el héroe fue añadido
      done();
    });
  });
});

