import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UppercaseDirective } from '@directives/uppercase.directive';
import { Hero } from '@interfaces/hero.interface';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UppercaseDirective],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent {
  public hero = input<Hero | null>();
  public formSubmit = output<Hero>();

  public showErrors: boolean = false;
  public heroForm: FormGroup;

  public resetValue: Hero = {
    id: 0,
    name: '',
    slug: '',
    powerStats: {
      intelligence: 0,
      strength: 0,
      speed: 0,
      durability: 0,
      power: 0,
      combat: 0
    },
    apareance: {
      gender: '',
      race: '',
      height: [''],
      weight: [''],
      eyeColor: '',
      hairColor: ''
    },
    biography: {
      fullName: '',
      alterEgos: '',
      aliases: '',
      placeOfBirth: '',
      firstAppearance: '',
      publisher: '',
      alignment: ''
    },
    work: {
      occupation: '',
      base: ''
    },
    connections: {
      groupAffiliation: '',
      relatives: ''
    },
    images: {
      xs: '',
      sm: '',
      md: '',
      lg: ''
    }
  }

  constructor(private fb: FormBuilder) {    
    this.heroForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      slug: [''],
      powerstats: this.fb.group({
        intelligence: [0, [ Validators.min(0), Validators.max(100)]],
        strength: [0, [ Validators.min(0), Validators.max(100)]],
        speed: [0, [ Validators.min(0), Validators.max(100)]],
        durability: [0, [ Validators.min(0), Validators.max(100)]],
        power: [0, [ Validators.min(0), Validators.max(100)]],
        combat: [0, [ Validators.min(0), Validators.max(100)]]
      }),
      appearance: this.fb.group({
        gender: [''],
        race: [''],
        height: [''],
        weight: [''],
        eyeColor: [''],
        hairColor: ['']
      }),
      biography: this.fb.group({
        fullName: [''],
        alterEgos: [''],
        aliases: [''],
        placeOfBirth: [''],
        firstAppearance: [''],
        publisher: [''],
        alignment: ['']
      }),
      work: this.fb.group({
        occupation: [''],
        base: ['']
      }),
      connections: this.fb.group({
        groupAffiliation: [''],
        relatives: ['']
      }),
      images: this.fb.group({
        xs: [''],
        sm: [''],
        md: [''],
        lg: ['']
      })
    });

  }

  ngOnChanges(): void {    
    const hero = this.hero();
    if (hero) {
      this.heroForm.patchValue(hero);
    }else{
      this.heroForm.reset(this.resetValue);
    }
    this.scrolltotop();
  }

  private scrolltotop(){
    const inptName = document.getElementById('name') as HTMLElement;
    if (inptName) {
      inptName.scrollIntoView({ behavior: 'smooth', block: 'center' });
      inptName.focus();
    }
  }

  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = document.querySelector(
      'form .ng-invalid'
    )!;
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalidControl.focus();
    }
  }

  submitForm() {       
    if (this.heroForm.valid) {
      const newHero: Hero = {...this.heroForm.value }      
      this.formSubmit.emit(newHero);
      this.heroForm.reset(this.resetValue);      
      this.showErrors = false;
      
      
    } else {
      this.showErrors = true;
      this.scrollToFirstInvalidControl();
    }
  }
}
