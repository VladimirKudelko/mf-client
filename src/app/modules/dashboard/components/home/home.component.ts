import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public panelOpenState = false;
  public accordionItems = [
    { title: 'Title #1', description: 'Description #1', content: 'Some content', isCompleted: true },
    { title: 'Title #2', description: 'Description #2', content: 'Some content', isCompleted: false },
    { title: 'Title #3', description: 'Description #3', content: 'Some content', isCompleted: false },
    { title: 'Title #4', description: 'Description #4', content: 'Some content', isCompleted: false },
    { title: 'Title #5', description: 'Description #5', content: 'Some content', isCompleted: false },
  ];

  constructor(
    private _sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this._sidebarService.show();
  }
}
