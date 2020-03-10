import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent implements OnInit, OnDestroy {
  public toggleControl: FormControl;
  private unsubscribe$ = new Subject();

  @Input() defaultValue = true;
  @Output() valueChanged = new EventEmitter<boolean>();

  ngOnInit() {
    this.toggleControl = new FormControl(this.defaultValue);

    this.toggleControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(newValue => {
        this.valueChanged.emit(newValue);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
