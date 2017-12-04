import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timefromnow'
})
export class TimeFromNowPipe implements PipeTransform {

  transform(value: Date): string {
    let now = new Date();
    let secondsInFuture = Math.floor((value.getTime() - now.getTime()) / 1000);

    if (secondsInFuture < 60) {
      return 'Immediately';
    } else if (secondsInFuture < 3600) {
      let minutes = Math.floor(secondsInFuture / 60);
      let noun = (minutes === 1) ? 'minute' : 'minutes';
      return `In ${minutes} ${noun}`;
    } else if (secondsInFuture < 86400) {
      let hours = Math.floor(secondsInFuture / 3600);
      let noun = (hours === 1) ? 'hour' : 'hours';
      return `In about ${hours} ${noun}`;
    } else if (secondsInFuture < 604800) {
      let days = Math.floor(secondsInFuture / 86400);
      let noun = (days === 1) ? 'day' : 'days';
      return `In about ${days} ${noun}`;
    } else if (secondsInFuture < 1209600) {
      let weeks = Math.floor(secondsInFuture / 604800);
      let weekNoun = (weeks === 1) ? 'week' : 'weeks';
      secondsInFuture %= 604800;
      let days = Math.floor(secondsInFuture / 86400);
      let dayNoun = (days === 1) ? 'day' : 'days';
      return `In ${weeks} ${weekNoun} ${days} ${dayNoun}`;
    }
  }

}
