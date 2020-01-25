import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class PersonsService {
  personsChanged = new Subject<string[]>();
  persons: string[];

  constructor(private http: HttpClient) {}

  fetchPersons() {
    this.http
    .get<any>('https://swapi.co/api/people')
    .pipe(map(resData => {
      return resData.results.map(people => people.name);
    }))
    .subscribe(modifiedPeople => {
      this.personsChanged.next(modifiedPeople);
    });
  }

  onPersonCreated(name: string) {
    this.persons.push(name);
    this.personsChanged.next(this.persons);
  }

  removePerson(name: string) {
    this.persons = this.persons.filter(person => person !== name);
    this.personsChanged.next(this.persons); // next => to send new value for persons
  }
}
