import { Component } from '@angular/core';
import { VmAccordionObject } from './shared/models/ac-vm-accordion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // only one level 
  accordionInitObject: VmAccordionObject[] = [
    {
      heading: 'داشبورد',
      url: '',
      icon: '',
      group: [
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
            },
            {
              name: 'بچه سوم',
              url: 'google',
              icon: '',
              children: []
            }
          ]
        },
        {
          name: 'آیتم دوم',
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
            },
            {
              name: 'بچه سوم',
              url: 'google',
              icon: '',
              children: []
            }
          ]
        },
        {
          name: 'آیتم سوم',
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
            },
            {
              name: 'بچه سوم',
              url: 'google',
              icon: '',
              children: []
            }
          ]
        }
      ]
    },
    {
      heading: 'رسانه',
      url: '',
      icon: '',
      group: [
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
            },
            {
              name: 'بچه سوم',
              url: 'google',
              icon: '',
              children: []
            }
          ]
        },
        {
          name: 'آیتم دوم',
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
            },
            {
              name: 'بچه سوم',
              url: 'google',
              icon: '',
              children: []
            }
          ]
        },
        {
          name: 'آیتم سوم',
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
            },
            {
              name: 'بچه سوم',
              url: 'google',
              icon: '',
              children: []
            }
          ]
        }
      ]
    },
    {
      heading: 'رسانه',
      url: 'google',
      icon: 'icon-dashboard',
      group: []
    },
    {
      heading: 'داشبورد',
      url: '',
      icon: '',
      group: [
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
            },
            {
              name: 'بچه سوم',
              url: 'google',
              icon: '',
              children: []
            }
          ]
        },
        {
          name: 'آیتم دوم',
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
            },
            {
              name: 'بچه سوم',
              url: 'google',
              icon: '',
              children: []
            }
          ]
        },
        {
          name: 'آیتم سوم',
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
            },
            {
              name: 'بچه سوم',
              url: 'google',
              icon: '',
              children: []
            }
          ]
        }
      ]
    },
  ];
}
