import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ColorService } from 'src/app/color/color.service';
import { Color } from '../../models/color';

@Component({
  selector: 'app-confirm-delete-color',
  templateUrl: './confirm-delete-color.component.html',
  styleUrls: ['./confirm-delete-color.component.scss']
})
export class ConfirmDeleteColorComponent implements OnInit {

  @Output() update = new EventEmitter<Color>();



  constructor( private colorService: ColorService, private confirmationService: ConfirmationService , private messageService: MessageService) { }

  ngOnInit(): void {
  }
  clear() {
    this.messageService.clear('confirmDeleteColorToast');
  }
  deleteColor(color: Color): void | boolean {
    if (color.isRemoved || color.isEdited) {
      return false;
    }
    this.confirmationService.confirm({
      header: 'پیغام',
      message: `آیا از حذف اطمینان دارید؟`,
      accept: () => {
        this.colorService.deleteColor(color).subscribe(
          (data) => {
            this.update.emit(color);
            this.messageService.add({ key: 'confirmDeletePersonToast', severity: 'success', summary: 'موفقیت آمیز', detail: `ردیف با موفقیت حذف شد`, life: 7000 });
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
