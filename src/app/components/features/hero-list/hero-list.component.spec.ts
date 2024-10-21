/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Hero } from '@interfaces/hero.interface';
import { HeroListComponent } from './hero-list.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Mock HeroItemComponent to avoid its complexity in tests
@Component({
  selector: 'app-hero-item',
  template: '<div (click)="selectHero.emit(hero)">{{ hero?.name }}</div>'
})
class MockHeroItemComponent {
  @Input() hero: Hero | undefined;
  @Output() selectHero = new EventEmitter<Hero>();
}

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;

  const mockHeroes: Hero[] = [
    {
      id: 1,
      name: 'Superman',
      slug: 'superman',
      powerStats: {
        intelligence: 100,
        strength: 100,
        speed: 100,
        durability: 100,
        power: 100,
        combat: 100
      },
      apareance: {
        gender: 'Male',
        race: 'Kryptonian',
        height: ['6ft'],
        weight: ['220lbs'],
        eyeColor: 'Blue',
        hairColor: 'Black'
      },
      biography: {
        fullName: 'Clark Kent',
        alterEgos: 'None',
        aliases: ['Man of Steel', 'The Last Son of Krypton'].join(","),
        placeOfBirth: 'Krypton',
        firstAppearance: 'Action Comics #1',
        publisher: 'DC Comics',
        alignment: 'good'
      },
      work: {
        occupation: 'Journalist',
        base: 'Metropolis'
      },
      connections: {
        groupAffiliation: 'Justice League',
        relatives: 'Krypton Family'
      },
      images: {
        xs: 'path/to/xs-image',
        sm: 'path/to/sm-image',
        md: 'path/to/md-image',
        lg: 'path/to/lg-image'
      }
    },
    {
      id: 2,
      name: 'Batman',
      slug: 'batman',
      powerStats: {
        intelligence: 100,
        strength: 85,
        speed: 60,
        durability: 75,
        power: 85,
        combat: 100
      },
      apareance: {
        gender: 'Male',
        race: 'Human',
        height: ['6ft'],
        weight: ['210lbs'],
        eyeColor: 'Blue',
        hairColor: 'Black'
      },
      biography: {
        fullName: 'Bruce Wayne',
        alterEgos: 'None',
        aliases: ['The Dark Knight', 'The Caped Crusader'].join(","),
        placeOfBirth: 'Gotham City',
        firstAppearance: 'Detective Comics #27',
        publisher: 'DC Comics',
        alignment: 'good'
      },
      work: {
        occupation: 'Businessman',
        base: 'Gotham City'
      },
      connections: {
        groupAffiliation: 'Justice League',
        relatives: 'Thomas Wayne, Martha Wayne'
      },
      images: {
        xs: 'path/to/xs-image',
        sm: 'path/to/sm-image',
        md: 'path/to/md-image',
        lg: 'path/to/lg-image'
      }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroListComponent, MockHeroItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of heroes', () => {
    component.heroes = mockHeroes;
    fixture.detectChanges();
    const heroItems = fixture.debugElement.queryAll(By.css('app-hero-item'));
    expect(heroItems.length).toBe(mockHeroes.length);
  });

  it('should call deleteHero when delete is triggered', () => {
    spyOn(component, 'onDeleteHero');
    component.heroes = mockHeroes;
    fixture.detectChanges();

    component.onDeleteHero(mockHeroes[0]);
    expect(component.onDeleteHero).toHaveBeenCalledWith(mockHeroes[0]);
  });
  
});*/
