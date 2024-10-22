import { TestBed } from '@angular/core/testing';
import { ComponentStore } from '@ngrx/component-store';
import { HeroStore } from './hero-store.service';
import { HeroService } from '@services/hero.service';
import { Observable, of, throwError } from 'rxjs';
import { LoadingService } from '@services/loading.service';
import { Hero } from '@interfaces/hero.interface';

const MockHeroes = [
  { id: 1, name: 'Superman' },
  { id: 2, name: 'Batman' }
]

class MockHeroService {
  getAllHeroes(): Observable<Hero[]> {
    const result = MockHeroes
    return of(result); // Devuelve un array vacío como respuesta mock
  }

  searchHeroesByName(name: string, heroes: Hero[]): Observable<Hero[]> {    
    const filteredHeroes = heroes.filter(hero =>
      hero.name.toLowerCase().includes(name.toLowerCase())
    );
    const result = name.trim().length === 0 ? heroes : filteredHeroes;
    
    return of(result);
  };

  searchHeroesById(id: number, heroes: Hero[]): Observable<Hero | undefined> {
    const result = heroes.find(hero => hero.id === id)
    return of(result);
  }

  addHero(hero: Hero, heroes: Hero[]): Observable<Hero[]> {    
    const lastId = heroes.reduce((maxId, hero) => Math.max(maxId, hero.id), 0);
    hero.id  = lastId + 1;

    const result = [...heroes, hero]
    return of(result);
  }

  updateHero(updatedHero: Hero, heroes: Hero[]): Observable<Hero[]> {
    const index = heroes.findIndex(hero => hero.id === updatedHero.id);   
    
    if (index !== -1) {
      const updatedHeroes = [
        ...heroes.slice(0, index),
        updatedHero,
        ...heroes.slice(index + 1)
      ];
      return of( updatedHeroes );
    }
    return of( heroes );
  }

  deleteHero(id: number, heroes: Hero[]): Observable<Hero[]> {
    const result = heroes.filter((hero) => hero.id !== id);
    return of(result);
  }  
}

class MockLoadingService {
  hide() {}
}

describe('HeroStore', () => {
  let heroStore: HeroStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroStore,
        { provide: HeroService, useClass: MockHeroService },
        { provide: LoadingService, useClass: MockLoadingService },
      ],
    });

    heroStore = TestBed.inject(HeroStore);
  });

  it('should load heroes', () => {
    heroStore.loadHeroes();

    heroStore.heroes$.subscribe((heroes) => {
      expect(heroes).toEqual(MockHeroes); // Verifica que los héroes cargados son correctos
    });
  });

  it('should add a hero', () => {
    const newHero = { id: 0, name: 'New Hero' };
    
    heroStore.addHero(newHero);

    heroStore.heroes$.subscribe((heroes) => {
      expect(heroes).toContain(newHero); // Verifica que el héroe se haya agregado
    });
  });

  it('should update a hero', () => {
    const existingHero = { id: 1, name: 'Existing Hero' };
    heroStore.addHero(existingHero); // Primero, agregamos el héroe

    const updatedHero = { ...existingHero, name: 'Updated Hero' };
    heroStore.updateHero(updatedHero);

    heroStore.heroes$.subscribe((heroes) => {
      expect(heroes).toContain(updatedHero); // Verifica que el héroe actualizado esté presente
    });
  });

  it('should delete a hero', () => {
    const heroToDelete = { id: 3, name: 'Hero to Delete' };
    heroStore.addHero(heroToDelete); // Primero, agregamos el héroe

    heroStore.deleteHero(heroToDelete.id);

    heroStore.heroes$.subscribe((heroes) => {
      expect(heroes).not.toContain(heroToDelete); // Verifica que el héroe haya sido eliminado
    });
  });

  it('should search hero by ID', () => {
    heroStore.searchHeroesById(1);

    heroStore.selectedHero$.subscribe((hero) => {
      expect(hero).toEqual({ id: 1, name: 'Superman' }); // Verifica que se haya buscado el héroe correctamente
    });
  });

  it('should search heroes by name', () => {
    heroStore.searchHeroesByName('Batman');

    heroStore.filteredHeroes$.subscribe((heroes) => {
      expect(heroes).toEqual([{ id: 2, name: 'Batman' }]); // Verifica que la búsqueda devuelva los héroes correctos
    });
  });

  // Puedes agregar más pruebas para otros efectos aquí
});

