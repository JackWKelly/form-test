import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-pet-input',
  templateUrl: './pet-input.component.html',
  styleUrls: ['./pet-input.component.css']
})
export class PetInputComponent implements OnInit {

  petForm = new FormGroup({
    petName: new FormControl('', Validators.required),
    petAge: new FormControl(''),
    petSpecies: new FormControl('', [Validators.required, this.forbiddenSpeciesValidator(/cat/i)]),
    petDetails: new FormGroup({
      petLegs: new FormControl(''),
      petColour: new FormControl(''),
      petTail: new FormControl(''),
    })
  })

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    //TODO use EventEmitter
    console.warn(this.petForm.value);
  }

  //a species name can't match the given regular expression
  forbiddenSpeciesValidator(speciesRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key:string]: any} | null => {
      const forbidden = speciesRe.test(control.value);
      return forbidden ? {'forbiddenSpecies': {value: control.value}} : null;
    };
  }

}
