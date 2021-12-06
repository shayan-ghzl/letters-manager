import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PersonService } from 'src/app/person/person.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-confirm-delete-person',
  templateUrl: './confirm-delete-person.component.html',
  styleUrls: ['./confirm-delete-person.component.scss']
})
export class ConfirmDeletePersonComponent implements OnInit {

  @Output() update = new EventEmitter<Person>();
  
  constructor( private personService: PersonService, private confirmationService: ConfirmationService , private messageService: MessageService) { }

  ngOnInit(): void {
  }
  clear() {
    this.messageService.clear('confirmDeletePersonToast');
  }
  showDeletePersonConf(person: Person, rowIndex: number): void | boolean {
    if (person.isRemoved) {
      return false;
    }
    this.confirmationService.confirm({
      header: 'پیغام',
      message: `آیا از حذف ردیف ${rowIndex + 1} اطمینان دارید؟`,
      accept: () => {
        this.personService.deletePerson(person).subscribe(
          (data) => {
            this.update.emit(person);
            this.messageService.add({ key: 'confirmDeletePersonToast', severity: 'success', summary: 'موفقیت آمیز', detail: `ردیف ${rowIndex + 1} با موفقیت حذف شد`, life: 7000 });
          },
          (error) => {
            console.log(error);
            this.messageService.add({ key: 'confirmDeletePersonToast', severity: 'error', summary: 'خطا', detail: 'خطا رخ داد.', life: 7000 });
          },
          () => { },
        );

      }
    });
  }
}
