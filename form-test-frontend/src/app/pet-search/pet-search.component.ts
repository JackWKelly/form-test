import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Pet } from '../petModel';
import { DatabaseServiceService } from '../database-service.service';

@Component({
  selector: 'app-pet-search',
  templateUrl: './pet-search.component.html',
  styleUrls: ['./pet-search.component.css']
})
export class PetSearchComponent implements OnInit {

  petData: [];
  searchForm = new FormGroup({
    petName: new FormControl('', Validators.required),
  })

  constructor(private db: DatabaseServiceService) { }

  ngOnInit() {
  }

  onSubmit(){
    //documentation said this should use an event emmitter???
    console.warn(this.searchForm.value);
    let searchName = this.searchForm.value.petName;
    console.log(searchName);
    this.db.getPet(searchName)
      .subscribe(pet => 
        {
          console.log(pet)
          this.petData = <any> pet;
        });
    
  }

  //a species name can't match the given regular expression
  forbiddenSpeciesValidator(speciesRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key:string]: any} | null => {
      const forbidden = speciesRe.test(control.value);
      return forbidden ? {'forbiddenSpecies': {value: control.value}} : null;
    };
  }

}

