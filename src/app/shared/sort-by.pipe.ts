import { Pipe, PipeTransform } from '@angular/core';

import { IStats } from '../stats/stats';


@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(stats: Array<any>, args: any): any[] {
    stats.sort((a: any, b: any) => {
      if ( a[args] < b[args] ) {
	    	return -1;
	    } else if ( a[args] > b[args] ) {
	        return 1;
	    }else {
	    	return 0;
	    }
    });
    return stats;
  }

}
