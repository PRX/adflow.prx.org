import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timefromnow'
})
export class TimeFromNowPipe implements PipeTransform {

  transform(value: Date): string {
    const now = new Date();
    let secondsInFuture = Math.floor((value.getTime() - now.getTime()) / 1000);

    if (secondsInFuture < 60) {
      return 'Immediately';
    } else if (secondsInFuture < 3600) {
      const minutes = Math.floor(secondsInFuture / 60);
      const noun = (minutes === 1) ? 'minute' : 'minutes';
      return `In ${minutes} ${noun}`;
    } else if (secondsInFuture < 86400) {
      const hours = Math.floor(secondsInFuture / 3600);
      const noun = (hours === 1) ? 'hour' : 'hours';
      return `In about ${hours} ${noun}`;
    } else if (secondsInFuture < 604800) {
      const days = Math.floor(secondsInFuture / 86400);
      const noun = (days === 1) ? 'day' : 'days';
      return `In about ${days} ${noun}`;
    } else if (secondsInFuture < 1209600) {
      const weeks = Math.floor(secondsInFuture / 604800);
      const weekNoun = (weeks === 1) ? 'week' : 'weeks';
      secondsInFuture %= 604800;
      const days = Math.floor(secondsInFuture / 86400);
      const dayNoun = (days === 1) ? 'day' : 'days';
      return `In ${weeks} ${weekNoun} ${days} ${dayNoun}`;
    }
  }

}
