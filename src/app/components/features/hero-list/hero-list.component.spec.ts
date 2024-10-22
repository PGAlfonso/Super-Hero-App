import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroStore } from '@store/hero-store.service';
import { Hero } from '@interfaces/hero.interface';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroStoreSpy: jasmine.SpyObj<HeroStore>;

  const heroesSubject = new BehaviorSubject<Hero[]>([]);
  const filteredHeroesSubject = new BehaviorSubject<Hero[]>([]);

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HeroStore', [
      'addHero',
      'updateHero',
      'deleteHero',
    ], {
      heroes$: heroesSubject.asObservable(),
      filteredHeroes$: filteredHeroesSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [HeroListComponent, FontAwesomeModule],
      providers: [
        { provide: HeroStore, useValue: spy },
      ],
    }).compileComponents();

    heroStoreSpy = TestBed.inject(HeroStore) as jasmine.SpyObj<HeroStore>;
    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load all heroes on init', () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Spider-Man', },
      { id: 2, name: 'Iron Man', },
    ];
    
    heroesSubject.next(mockHeroes);
    fixture.detectChanges();
  
    expect(component.heroes.length).toBe(2);
    expect(component.heroes[0].name).toBe('Spider-Man');
  });
  

  it('should toggle drawer visibility', () => {
    component.toggleDrawer();
    expect(component.showDrawer).toBeTrue();
  
    component.toggleDrawer();
    expect(component.showDrawer).toBeFalse();
  });

  it('should add new hero if id is 0', () => {
    const newHero: Hero = { id: 0, name: 'Hulk' };
    component.onAddHero(newHero);
    expect(heroStoreSpy.addHero).toHaveBeenCalledWith(newHero);
  });
  
  it('should update existing hero if id is not 0', () => {
    const existingHero: Hero = { id: 1, name: 'Hulk' };
    component.onAddHero(existingHero);
    expect(heroStoreSpy.updateHero).toHaveBeenCalledWith(existingHero);
  });

  it('should set selectedHero and open drawer on edit', () => {
    const heroToEdit: Hero = { id: 1, name: 'Spider-Man' };
    component.onEditHero(heroToEdit);
  
    expect(component.selectedHero).toEqual(heroToEdit);
    expect(component.showDrawer).toBeTrue();
  });
  
  it('should call deleteHero with the correct id', () => {
    const heroToDelete: Hero = { id: 2, name: 'Iron Man' };
    component.onDeleteHero(heroToDelete);
    expect(heroStoreSpy.deleteHero).toHaveBeenCalledWith(2);
  });

  it('should update pagination with filtered heroes', () => {
    const mockFilteredHeroes: Hero[] = [
      { id: 3, name: 'Hulk',  }
    ];
  
    filteredHeroesSubject.next(mockFilteredHeroes);
    fixture.detectChanges();
  
    expect(component.showFiltered).toBeTrue();
    expect(component.filteredHeroes.length).toBe(1);
    expect(component.filteredHeroes[0].name).toBe('Hulk');
  });
  
});

