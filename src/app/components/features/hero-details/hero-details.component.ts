import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '@interfaces/hero.interface';
import { HeroStore } from '@store/hero-store.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss'
})
export class HeroDetailsComponent {  
  private route = inject(ActivatedRoute);
  private heroStore = inject(HeroStore);

  public hero$ = this.heroStore.selectedHero$;

  ngOnInit():void{
    this.route.paramMap.pipe(
      switchMap(params => {
        const heroId = Number(params.get('id'));
        this.heroStore.searchHeroesById(heroId);
        return this.hero$;
      })
    ).subscribe();
  }

  loadHeroDetail(heroId: number): void {  
    this.heroStore.patchState({ selectedHero: null });  
    this.heroStore.searchHeroesById(heroId);
  }
}
