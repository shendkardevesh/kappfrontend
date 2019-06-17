import { Component, KeyValueDiffers } from '@angular/core';
import { IndexService } from '../app/index.service';
import {keyValue} from '../app/keyValueClass';
import {AngularCsv} from 'angular7-csv/dist/Angular-csv';
// tslint:disable-next-line: class-name
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'k-app-front';
  datas: Array<keyValue> = [];
  keyInput = '';
  valueInput = '';

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    // title: '',
    useBom: true,
    noDownload: false,
    headers: ['label', 'value']
  };

  constructor(
    private indexService: IndexService
  ) {}

  add(): void {
    if (this.keyInput !== '' && this.valueInput !== '') {
      const newValue = new keyValue();
      newValue.key = this.keyInput;
      newValue.value = this.valueInput;
      this.datas.push(newValue);
      this.keyInput = '';
      this.valueInput = '';
    }
    
  }

  remove(index: number): void {
    this.datas.splice(index, 1);
  }

  saveToDb(): void {
    console.log('save datas to db');
    this.indexService.saveKeyValue(this.datas)
      .subscribe(response => {
        console.log(response);
        this.datas = [];
      });
  }

  downloadCSV(): void {
    new AngularCsv(this.datas, 'data', this.csvOptions);
  }
}
