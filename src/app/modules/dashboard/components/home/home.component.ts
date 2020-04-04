import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { faCheck, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _sidebarService: SidebarService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._sidebarService.show();
    this._authService.getUserById().subscribe(response => {
      this.tasks = response.user.tasks;
      this._cdr.detectChanges();
    });
  }

  private getTaskLink(taskKey: string): string {
    switch (taskKey) {
      case 'category': return '/dashboard/expenses';
      case 'money': return '/dashboard/expenses';
      case 'settings': return '/dashboard/settings';
    }
  }

  private getHelpTipId(taskKey: string): number {
    switch (taskKey) {
      case 'category': return 1;
      case 'money': return 2;
      case 'settings': return 3;
    }
  }

  public navigateWithState(taskKey: string): void {
    const link = this.getTaskLink(taskKey);
    const helpTipId = this.getHelpTipId(taskKey);

    this._router.navigate([link, { helpTipId }]);
  }

  public getTaskClasses(task: Task): object {
    return {
      'task-header__description--completed': task.isCompleted,
      'task-header__description--not-completed': !task.isCompleted
    };
  }

  public getIconByStatus(task: Task): IconDefinition {
    return task.isCompleted
      ? faCheck
      : faTimes;
  }
}
