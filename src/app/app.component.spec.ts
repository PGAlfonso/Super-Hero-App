import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeroStore } from '@store/hero-store.service';
import { Hero } from '@interfaces/hero.interface';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { UppercaseDirective } from '@directives/uppercase.directive';
import { SpinnerComponent } from '@components/common/spinner/spinner.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let heroStoreSpy: jasmine.SpyObj<HeroStore>;
  let routerSpy: jasmine.SpyObj<Router>;

  const heroesSubject = new BehaviorSubject<Hero[]>([]);

  beforeEach(async () => {
    const heroStoreMock = jasmine.createSpyObj('HeroStore', ['searchHeroesByName','select'], {
      heroes$: heroesSubject.asObservable(),
    });

    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AppComponent, FontAwesomeModule, UppercaseDirective, SpinnerComponent],
      providers: [
        { provide: HeroStore, useValue: heroStoreMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    heroStoreSpy = TestBed.inject(HeroStore) as jasmine.SpyObj<HeroStore>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchHeroesByName on search', () => {
    component.searchValue = 'Superman';
    component.searchHero();
    
    expect(heroStoreSpy.searchHeroesByName).toHaveBeenCalledWith('Superman');
  });
  
  it('should filter heroes when searchValue is not empty', () => {
    component.searchValue = 'Bat';
    heroesSubject.next([
      { id: 1, name: 'Batman' },
      { id: 2, name: 'Superman' }
    ]);
  
    expect(heroStoreSpy.searchHeroesByName).toHaveBeenCalledWith('Bat');
  });

  it('should navigate to /home on returnHome', () => {
    component.returnHome();
    
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
  
  
});

