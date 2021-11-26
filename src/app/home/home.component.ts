import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/models/person';
import { PersonService } from '../shared/services/person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  persons: Person[] = [];

  constructor(private personService: PersonService) {
    this.personService.getPersons().subscribe(
      (data) => {
        this.persons = data;
      },
      (error) => { console.log(error); },
      () => { },
    );
  }

  ngOnInit(): void {

  }





  display: boolean = false;

  showDialog() {
      this.display = true;
  }


}
