import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeroStore } from '@store/hero-store.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let heroStore: jasmine.SpyObj<HeroStore>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const heroStoreSpy = jasmine.createSpyObj('HeroStore', ['searchHeroesByName', 'heroes$']);
    heroStoreSpy.heroes$.and.returnValue(of([])); // Inicialmente no hay héroes

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: HeroStore, useValue: heroStoreSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    heroStore = TestBed.inject(HeroStore) as jasmine.SpyObj<HeroStore>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchHeroesByName when searchHero is called', () => {
    component.searchValue = 'Batman';
    component.searchHero();
    expect(heroStore.searchHeroesByName).toHaveBeenCalledWith('Batman');
  });

  it('should navigate to home when returnHome is called', () => {
    component.returnHome();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should render the search input', () => {
    fixture.detectChanges(); // Asegúrate de que el componente se renderice
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement; // Asumiendo que tienes un input para buscar héroes
    expect(inputElement).toBeTruthy();
  });
});

