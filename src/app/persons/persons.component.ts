// import { Component, Input } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonsService } from './persons.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})

export class PersonsComponent implements OnInit {
  // title = 'angular-refresher';
  // @Input() personsList: string[];
  personsList: string[];
  isFetching = false;
  private personService: PersonsService;
  private personListSubscription: Subscription;
  // initializing personList using dependecy injection
  constructor(prsService: PersonsService) {
    // below is not rec way of initializing properties/variables, instead use lifecycle hooks, here "ngOnInit"
    // this.personsList = personService.persons;
    this.personService = prsService;
  }

  // constructor(private prsService: PersonsService) {} -> this internally does this => this.personService = prsService;

  ngOnInit() {
    // this.personsList = this.personService.persons;

    // subscribe is used to listen for new values in person added/deleted
    this.personListSubscription =  this.personService.personsChanged.subscribe(persons => {
      this.personsList = persons;
      this.isFetching = false;
    });
    this.isFetching = true;
    this.personService.fetchPersons();
  }

  onRemovePerson(person: string) {
    this.personService.removePerson(person);
  }

  OnDestroy() {
    this.personListSubscription.unsubscribe(); //  clean up memory taken up by "subscribe"
  }
}
