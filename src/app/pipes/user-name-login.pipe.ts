import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userNameLogin'
})
export class UserNameLoginPipe implements PipeTransform {

  transform(value: string | undefined ): string {
    if (!value) { return ''; }
    const firstName = value.split(' ').map(n => n[0]).join('');
    return firstName;
  }
}
