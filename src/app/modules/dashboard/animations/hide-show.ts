import { trigger, state, style, transition, animate } from '@angular/animations';

export const hideShow = (
  trigger('hideShow', [
    state('hide', style({ opacity: 0, })),
    state('show', style({ opacity: 1, })),
    transition('hide => show', [animate('1s')]),
    transition('show => hide', [animate('0.5s')])
  ])
);
