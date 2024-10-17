import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private baseUrl = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`

  constructor(private http: HttpClient) { }

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseUrl);
  }
}
