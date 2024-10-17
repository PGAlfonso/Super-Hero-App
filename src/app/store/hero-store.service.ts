import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HeroService } from '../services/hero.service';
import { Hero, HeroState } from '../interfaces/hero.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroStore extends ComponentStore<HeroState> {

  constructor(private heroService: HeroService) { 
    super({ heroes: [] });
  }

  readonly loadHeroes = this.effect(() => 
    this.heroService.getAllHeroes().pipe(
      tap(heroes => this.setState({ heroes }))
    )
  );


}
