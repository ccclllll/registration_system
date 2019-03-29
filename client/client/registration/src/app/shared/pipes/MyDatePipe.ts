import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDatePipe',
  pure: true // 如果你的管道不受外界影响，只受参数的影响请遵守FP原则，设置为纯管道
})
export class MyDatePipe implements PipeTransform {

  transform(value: string, args?: any): string {

    const year = value.substring(0,4);
    const month = value.substring(4,6);
    const day = value.substring(6,8);
    let be = value.substring(8,10);

    be = be === 'am' ? '上午' : '下午';

    return year + '-' + month + '-' + day + be;
  }
}
