import {formatDate} from '@angular/common';
import * as moment from 'moment';

export default class Utils {

  static LOCALE = 'en-US';
  static TIME_ZONE = 'UTC';

  static extractDateOf(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  static dateToString(date: Date, format: string): string {
    return formatDate(date, format, this.LOCALE, this.TIME_ZONE);
  }

  // 2021-05-31T00:00:00.000+00:00
  static toDate(date: string): Date {
    const format = 'YYYY-MM-DD';
    const dateWithoutTime = date.substring(0, 10);
    const d = moment(dateWithoutTime, format, this.LOCALE).toDate();
    return this.extractDateOf(d);
  }
}
