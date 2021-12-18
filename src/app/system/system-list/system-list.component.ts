import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDeleteSystemComponent } from 'src/app/shared/components/confirm-delete-system/confirm-delete-system.component';
import { System } from 'src/app/shared/models/system';
import { SystemService } from '../system.service';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss']
})
export class SystemListComponent implements OnInit {

  @ViewChild(ConfirmDeleteSystemComponent) confirmDeleteSystemComponent!: ConfirmDeleteSystemComponent;
  systems: System[] = [];
  newSystemName:string = '';

  constructor(private systemService:SystemService) { 
    this.getSystems();
  }

  ngOnInit(): void {

  }

  getSystems() {
    this.systemService.getSystems().subscribe(
      (data) => {
        this.systems = data;
      },
      (error) => { console.log(error); },
      () => { },
    );
  }
  updateFromDeleteSystem(system:System){
     system.isRemoved = true;
    setTimeout(() => {
      let index = this.systems.findIndex(p => p.id == system.id);
      if (index > -1) {
        this.systems.splice(index, 1);
      }
    }, 1000);
  }
  addSystem() {
    this.systemService.addSystem({ 'id': 0, 'name': this.newSystemName }).subscribe(
      (data) => {
        this.systems.unshift(data);
      },
      (error) => { console.log(error); },
      () => { },
    );
  }

}
