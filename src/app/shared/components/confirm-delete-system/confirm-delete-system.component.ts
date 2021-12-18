import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SystemService } from 'src/app/system/system.service';
import { System } from '../../models/system';

@Component({
  selector: 'app-confirm-delete-system',
  templateUrl: './confirm-delete-system.component.html',
  styleUrls: ['./confirm-delete-system.component.scss']
})
export class ConfirmDeleteSystemComponent implements OnInit {
 
  @Output() update = new EventEmitter<System>();

  constructor( private systemService: SystemService, private confirmationService: ConfirmationService , private messageService: MessageService) { }

  ngOnInit(): void {
  }
  clear() {
    this.messageService.clear('confirmDeleteColorToast');
  }
  deleteSystem(system: System): void | boolean {
    if (system.isRemoved || system.isEdited) {
      return false;
    }
    this.confirmationService.confirm({
      header: 'پیغام',
      message: `آیا از حذف اطمینان دارید؟`,
      accept: () => {
        this.systemService.deleteSystem(system).subscribe(
          (data) => {
            this.update.emit(system);
            this.messageService.add({ key: 'confirmDeleteSystemToast', severity: 'success', summary: 'موفقیت آمیز', detail: `ردیف با موفقیت حذف شد`, life: 7000 });
          },
          (error) => {
            console.log(error);
            this.messageService.add({ key: 'confirmDeleteSystemToast', severity: 'error', summary: 'خطا', detail: 'خطا رخ داد.', life: 7000 });
          },
          () => { },
        );
      }
    });
  }
}
