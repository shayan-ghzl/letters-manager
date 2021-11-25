import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // only one level 
  accordionInitObject = [
    {
      name: 'آیتم اول',
      url: '',
      icon: 'icon-dashboard',
      children: [
        {
          name: 'بچه اول',
          url: 'google',
          icon: '',
          children: []
        },
        {
          name: 'بچه دوم',
          url: 'google',
          icon: '',
          children: []
        }
      ]
    }
  ]
}
