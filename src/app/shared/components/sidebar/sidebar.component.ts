import { Component, OnInit } from '@angular/core';
import { faHome, faPlus, faMinus, faChartBar, faEnvelope, faCog, faSmile } from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from '../../models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  public navItems: MenuItem[] = [
    { title: 'HOME', link: '/dashboard/home', icon: faHome },
    { title: 'Expenses (5$)', link: '/dashboard/expenses', icon: faPlus },
    { title: 'Incomes (10$)', link: '/dashboard/incomes', icon: faMinus },
    { title: 'Statistic', link: '/dashboard/statistic', icon: faChartBar },
    { title: 'Reports', link: '/dashboard/reports', icon: faEnvelope },
    { title: 'Settings', link: '/dashboard/settings', icon: faCog },
    { title: 'Vladimir Kudelko', link: '/dashboard/profile', icon: faSmile }
  ];

  ngOnInit(): void {

  }

}
