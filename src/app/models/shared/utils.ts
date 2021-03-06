import * as moment from 'moment';

export default class Utils {

  static LOCALE = 'en-US';

  static extractDateOf(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  static dateWithFirstDay(): Date {
    let date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  static dateToString(date: Date): string {
    const goodDate = this.stringToDate(date.toString());
    return moment(goodDate).format('DD/MM/YYYY');
  }

  static toDateFormat(date: string): string {
    const goodDate = this.stringToDate(date);
    return moment(goodDate).format('DD/MM/YYYY');
  }

  // 2021-05-31T00:00:00.000+00:00
  static stringToDate(date: string): Date {
    const dateWithoutTime = date.substring(0, 10);
    const d = moment(dateWithoutTime, 'YYYY-MM-DD', this.LOCALE).toDate();
    return this.extractDateOf(d);
  }
}
