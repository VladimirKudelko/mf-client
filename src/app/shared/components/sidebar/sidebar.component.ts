import { Component, OnInit } from '@angular/core';

import { navItems } from '../../constants/sidebar-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  public navItems = navItems;

  ngOnInit(): void {

  }

}
