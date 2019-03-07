import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Pet } from '../petModel';
import { DatabaseServiceService } from '../database-service.service';

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

  constructor(private db: DatabaseServiceService) { }

  ngOnInit() {
  }

  onSubmit(){
    //documentation said this should use an event emmitter???
    console.warn(this.petForm.value);
    let petInfo: Pet = this.petForm.value;
    console.log(petInfo);
    this.db.addPet(petInfo)
      .subscribe(pet => console.log(pet));
    
  }

  //a species name can't match the given regular expression
  forbiddenSpeciesValidator(speciesRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key:string]: any} | null => {
      const forbidden = speciesRe.test(control.value);
      return forbidden ? {'forbiddenSpecies': {value: control.value}} : null;
    };
  }

}
