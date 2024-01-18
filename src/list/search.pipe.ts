import { Pipe, PipeTransform } from '@angular/core';
import { Livre } from '../livre';
@Pipe({
  name: 'filter',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(items: Livre[], searchText: string): Livre[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((it) => {
      return (
        it.titre.toLowerCase().includes(searchText) ||
        it.auteur.toLowerCase().includes(searchText)
      );
    });
  }
}
