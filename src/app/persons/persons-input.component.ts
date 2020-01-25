// import { Component, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';

import { PersonsService } from './persons.service';

@Component({
  selector: 'app-person-input',
  templateUrl: './persons-input.component.html',
  styleUrls: ['./persons-input.component.css']
})

export class PersonsInputComponent {

  // @Output() personCreate = new EventEmitter<string>();
  newPersonName: string;

  constructor(private personService: PersonsService) {}

  addNewPerson() {
    // console.log('new person added : ' + this.newPersonName);
    // this.personCreate.emit(this.newPersonName);
    this.personService.onPersonCreated(this.newPersonName)
    this.newPersonName = '';
  }
}


/*
Types of bindings available:
1. property binding => []
2. event binding => ()
3. string interpolation => {{}}
4. two-way binding => [()]
*/
