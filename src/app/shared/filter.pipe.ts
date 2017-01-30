import { Pipe, PipeTransform } from '@angular/core';

import { IStats } from '../stats/stats';

@Pipe({
    name: 'stringFilter'
})
export class StringFilterPipe implements PipeTransform {

    transform(value: IStats[], filterBy: string): IStats[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase(): null;
        return filterBy ? value.filter((soldier: IStats) =>
        soldier.soldierName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
