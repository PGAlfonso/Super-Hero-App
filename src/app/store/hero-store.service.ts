import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HeroService } from '@services/hero.service';
import { Hero, HeroState } from '@interfaces/hero.interface';
import { switchMap, tap, withLatestFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroStore extends ComponentStore<HeroState> {

  constructor(private heroService: HeroService) { 
    super({ heroes: [], selectedHero: null, filteredHeroes:[]});
    this.loadHeroes();
  }

  readonly heroes$ = this.select(state => state.heroes.sort((a, b) => a.name.localeCompare(b.name)));
  readonly filteredHeroes$ = this.select(state => state.filteredHeroes.sort((a, b) => a.name.localeCompare(b.name)));
  readonly selectedHero$ = this.select( state => state.selectedHero);

  readonly loadHeroes = this.effect((trigger$) => 
    trigger$.pipe(
      switchMap(() => 
        this.heroService.getAllHeroes().pipe(
          tap({
            next: (heroes) => this.patchState({ heroes }),
            error: (error) =>  console.error('Error al cargar heroes', error)
          })
        )
      )      
    )
  );

  readonly addHero = this.effect<Hero>(
    (hero$) => hero$.pipe(
      withLatestFrom(this.heroes$),
      switchMap(([newHero, heroes]) =>
        this.heroService.addHero(newHero, heroes).pipe(
          tap({
            next: (heroes) => this.patchState({ heroes: heroes }),
            error: (error) => console.error('Error al agregar heroe', error)
          })
        ) 
      )
    )
  );

  readonly updateHero = this.effect<Hero>(
    (hero$) => hero$.pipe(
      withLatestFrom(this.heroes$),
      switchMap(([selectedHero, heroes]) =>
        this.heroService.updateHero(selectedHero, heroes).pipe(
          tap({
            next: ({heroes, updatedHero}) => this.patchState({ heroes: heroes, selectedHero: updatedHero}),
            error: (error) => console.error('Error al actualizar heroe', error)
          })
        ),
      )
    )
  );    

  readonly deleteHero = this.effect<number>(
    (id$) => id$.pipe(
      withLatestFrom(this.heroes$),
      switchMap(([id, heroes]) =>
        this.heroService.deleteHero(id, heroes).pipe(
          tap({
            next: (heroes) => this.patchState({ heroes: heroes }),
            error: (error) => console.error('Error al eliminar heroe', error)
          })
        )
      )
    )
  );
  
  readonly searchHeroesById = this.effect<number>(
    (id$) => id$.pipe(
      withLatestFrom(this.heroes$),
      switchMap(([id, heroes]) => 
        this.heroService.searchHeroesById(id, heroes)
        .pipe(
          tap({
            next: (selectedHero) => this.patchState({ selectedHero: selectedHero }),
            error: (error) => console.error('Error al buscar heroe', error)
          })
        )
      )
    )
  );  

  readonly searchHeroesByName = this.effect<string>(
    (name$) => name$.pipe(
      withLatestFrom(this.heroes$),
      switchMap(([name, heroes]) => 
        this.heroService.searchHeroesByName(name, heroes)
        .pipe(
          tap({
            next: (filteredHeroes) => this.patchState({ filteredHeroes }),
            error: (error) => console.error('Error al buscar heroe', error)
          })
        )
      )
    )
  );
}
