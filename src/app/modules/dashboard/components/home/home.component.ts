import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { faCheck, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { SidebarService, AuthService } from 'src/app/shared/services';
import { Task } from 'src/app/shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public faCheck = faCheck;
  public faTimes = faTimes;
  public tasks: Task[];

  constructor(
    private _sidebarService: SidebarService,
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._sidebarService.show();
    this._authService.getUserById().subscribe(response => {
      this.tasks = response.user.tasks;
      this._cdr.detectChanges();
    });
  }

  getTaskClasses(task: Task): object {
    return {
      'task-header__description--completed': task.isCompleted,
      'task-header__description--not-completed': !task.isCompleted
    };
  }

  getIconByStatus(task: Task): IconDefinition {
    return task.isCompleted
      ? faCheck
      : faTimes;
  }
}
