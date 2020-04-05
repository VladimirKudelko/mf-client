import { trigger, transition, animate, keyframes, style } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition('void => *', [
    animate('1s ease-in', keyframes([
      style({
        opacity: 0,
        offset: 0,
      }),
      style({
        opacity: 0.5,
        offset: 0.5,
      }),
      style({
        opacity: 1,
        offset: 1,
      })
   ]))
  ])
]);
