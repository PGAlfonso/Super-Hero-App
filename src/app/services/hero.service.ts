import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private baseUrl = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`;  

  constructor(private http: HttpClient) { }

  //Obtener todos de la api real
  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseUrl);
  }

  //Los demas servicios son solo simulación de un llamado api con un retardo de 500ms
  searchHeroesByName(name: string, heroes: Hero[]): Observable<Hero[]> {    
    const filteredHeroes = heroes.filter(hero =>
      hero.name.toLowerCase().includes(name.toLowerCase())
    );
    
    return of(filteredHeroes).pipe(delay(500));
  };

  searchHeroesById(id: number, heroes: Hero[]): Observable<Hero | undefined> {
    const result = heroes.find(hero => hero.id === id)
    return of(result).pipe(delay(500));
  }

  addHero(hero: Hero, heroes: Hero[]): Observable<Hero[]> {    
    const lastId = heroes[heroes.length - 1].id;
    hero.id  = lastId + 1;

    const result = [...heroes, hero]
    return of(result).pipe(delay(500));
  }

  updateHero(updatedHero: Hero, heroes: Hero[]): Observable<{heroes:Hero[],updatedHero:Hero}> {
    const index = heroes.findIndex(hero => hero.id === updatedHero.id);

    if (index !== -1) {
      heroes[index] = updatedHero;
    } 

    return of({heroes, updatedHero}).pipe(delay(500));
  }

  deleteHero(id: number, heroes: Hero[]): Observable<Hero[]> {
    const result = heroes.filter((hero) => hero.id !== id);
    return of(result).pipe(delay(500));
  }  
}
