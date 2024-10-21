import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HeroService } from '@services/hero.service';
import { Hero, HeroState } from '@interfaces/hero.interface';
import { finalize, switchMap, tap, withLatestFrom } from 'rxjs';
import { LoadingService } from '@services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class HeroStore extends ComponentStore<HeroState> {

  constructor(private heroService: HeroService) { 
    super({ heroes: [], selectedHero: null, filteredHeroes: [], isLoading: false, searchValue:"" });
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
      tap(() => this.patchState({ isLoading: true })),
      switchMap(([newHero, heroes]) =>
        this.heroService.addHero(newHero, heroes).pipe(
          tap({
            next: (heroes) => this.patchState({ heroes: heroes, isLoading: false }),
            error: (error) => {
              console.error('Error al agregar heroe', error);
              this.patchState({ isLoading: false });
            }
          }),
          finalize(()=>{
            const loadingService = inject(LoadingService);
            loadingService.hide();
          })
        ) 
      )
    )
  );

  readonly updateHero = this.effect<Hero>(
    (hero$) => hero$.pipe(
      withLatestFrom(this.heroes$),
      tap(() => this.patchState({ isLoading: true })),
      switchMap(([selectedHero, heroes]) =>
        this.heroService.updateHero(selectedHero, heroes).pipe(
          tap({
            next: (heroes) => this.patchState({ heroes: heroes , isLoading: false}),
            error: (error) => {
              console.error('Error al actualizar heroe', error);
              this.patchState({ isLoading: false });
            }
          }),
          finalize(()=>{
            const loadingService = inject(LoadingService);
            loadingService.hide();
          })
        ),
      )
    )
  );    

  readonly deleteHero = this.effect<number>(
    (id$) => id$.pipe(
      withLatestFrom(this.heroes$),
      tap(() => this.patchState({ isLoading: true })),
      switchMap(([id, heroes]) =>
        this.heroService.deleteHero(id, heroes).pipe(
          tap({
            next: (heroes) => this.patchState({ heroes: heroes, isLoading: false }),
            error: (error) => {
              console.error('Error al eliminar heroe', error);
              this.patchState({ isLoading: false });
            }
          }),
          finalize(()=>{
            const loadingService = inject(LoadingService);
            loadingService.hide();
          })
        )
      )
    )
  );
  
  readonly searchHeroesById = this.effect<number>(
    (id$) => id$.pipe(
      withLatestFrom(this.heroes$),
      tap(() => this.patchState({ isLoading: true })),
      switchMap(([id, heroes]) => 
        this.heroService.searchHeroesById(id, heroes)
        .pipe(
          tap({
            next: (selectedHero) => this.patchState({ selectedHero: selectedHero, isLoading: false }),
            error: (error) => {
              console.error('Error al buscar heroe', error);
              this.patchState({ isLoading: false });
            }
          }),
          finalize(()=>{
            const loadingService = inject(LoadingService);
            loadingService.hide();
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
