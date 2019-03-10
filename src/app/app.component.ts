import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isShowSidebar = false;

  ngOnInit(): void {
    // this.loaderService.isShown$.subscribe(data => {
    //   this.data = this.loaderService.data
    //   this.isShown = data
    // });
  }
}
