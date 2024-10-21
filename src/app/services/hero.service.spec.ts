import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { provideHttpClient } from '@angular/common/http';
import { Hero } from '@interfaces/hero.interface';


describe('HeroService -- Real HTTP Request', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ HeroService, provideHttpClient()]
    });
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch real heroes from the API', (done) => {
    service.getAllHeroes().subscribe((heroes) => {
      expect(heroes).toBeTruthy(); //validar que la respuesta no este vacia
      expect(heroes.length).toBeGreaterThan(0); // verifica que haya almenos un heroe
      done(); // prueba finalizada
    })
  });

// Mock data for hero testing
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

  it('should search heroes by name', (done) => {
    service.searchHeroesByName('man', mockHeroes).subscribe((filteredHeroes) => {
      expect(filteredHeroes.length).toBe(2); // Superman and Batman
      done();
    });
  });

  it('should return all heroes when name is empty', (done) => {
    service.searchHeroesByName('', mockHeroes).subscribe((filteredHeroes) => {
      expect(filteredHeroes.length).toBe(2); // All heroes
      done();
    });
  });

  it('should find hero by id', (done) => {
    service.searchHeroesById(1, mockHeroes).subscribe((hero) => {
      expect(hero).toBeTruthy();
      expect(hero?.name).toBe('Superman');
      done();
    });
  });

  it('should return undefined for non-existing hero by id', (done) => {
    service.searchHeroesById(999, mockHeroes).subscribe((hero) => {
      expect(hero).toBeUndefined();
      done();
    });
  });

  it('should add a hero', (done) => {
    const newHero: Hero = mockHeroes[0];
    service.addHero(newHero, mockHeroes).subscribe((updatedHeroes) => {
      expect(updatedHeroes.length).toBe(3); // Adding one new hero
      expect(updatedHeroes[2].name).toBe('Superman');
      done();
    });
  });

  it('should update a hero', (done) => {
    const updatedHero: Hero = mockHeroes[0];
    service.updateHero(updatedHero, mockHeroes).subscribe((updatedHeroes) => {
      expect(updatedHeroes[0].powerStats?.power).toBe(100); // Check if the power has been updated
      done();
    });
  });

});