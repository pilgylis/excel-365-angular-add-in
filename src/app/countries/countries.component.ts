import { OnInit, Component } from '@angular/core';
import { Country } from 'src/models/country';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './countries.component.html'
})
export class CountriesComponent  implements OnInit {
  welcomeMessage = 'Welcome';

  countries: Country[];

  get filteredCountries(): Country[] {
    if (!this.countries) {
      return [];
    }

    if (!this.filterText || this.filterText.trim() === '') {
      return this.countries;
    }

    const loweredFilterText = this.filterText.toLocaleLowerCase();

    return this.countries.filter(c =>
      c.name.toLocaleLowerCase().indexOf(loweredFilterText) >= 0
      || c.alpha2Code.toLocaleLowerCase().indexOf(loweredFilterText) >= 0
      || c.alpha3Code.toLocaleLowerCase().indexOf(loweredFilterText) >= 0
      || c.capital.toLocaleLowerCase().indexOf(loweredFilterText) >= 0
      || c.region.toLocaleLowerCase().indexOf(loweredFilterText) >= 0
      || c.subregion.toLocaleLowerCase().indexOf(loweredFilterText) >= 0
      || c.demonym.toLocaleLowerCase().indexOf(loweredFilterText) >= 0);
  }

  filterText = '';

  /**
   *
   */
  constructor(private http: HttpClient) {
  }

  public async ngOnInit() {
    this.countries = await this.http.get<Country[]>('https://restcountries.eu/rest/v2/all').toPromise();
  }

  async insertText(text: string) {
    try {
      await Excel.run(async context => {
        /**
         * Insert your Excel code here
         */
        const cell = context.workbook.getActiveCell();
        if (!cell) {
          return;
        }

        cell.values = [[text]];

        await context.sync();
      });
    } catch (error) {
      console.error(error);
    }
  }

  async insertTable() {
    try {
      await Excel.run(async context => {
        const currentWorksheet = context.workbook.worksheets.getActiveWorksheet();

        const countriesTable = currentWorksheet.tables.add('A1:G1', true);
        countriesTable.name = 'Countries';

        countriesTable.getHeaderRowRange().values = [['#', 'Country Name', 'Alpha2Code', 'Alpha3Code', 'Region', 'Subregion', 'Capital']];

        if (!this.countries || this.countries.length === 0) {
          return;
        }

        const data: any[] = this.countries.map((c, i) => [i, c.name, c.alpha2Code, c.alpha3Code, c.region, c.subregion, c.capital]);

        countriesTable.rows.add(null, data);

        countriesTable.getRange().format.autofitColumns();
        countriesTable.getRange().format.autofitRows();

        await context.sync();
      });
    } catch (error) {
      console.error(error);
    }
  }

  async run() {
    try {
      await Excel.run(async context => {
        /**
         * Insert your Excel code here
         */
        const range = context.workbook.getSelectedRange();

        // Read the range address
        range.load('address');

        // Update the fill color
        range.format.fill.color = 'yellow';

        await context.sync();
        console.log(`The range address was ${range.address}.`);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async openDialog() {
    try {
      await Excel.run(async context => {
        const currentWorksheet = context.workbook.worksheets.getActiveWorksheet();

        const countriesTable = currentWorksheet.tables.getItem('Countries');

        const bodyRange = countriesTable.getDataBodyRange().load('values');

        return context.sync()
          .then(() => {
            const bodyValues = bodyRange.values;

            localStorage.setItem('dialog', JSON.stringify(bodyValues, null, '  '));

            Office.context.ui.displayDialogAsync(
              'https://localhost:6100/taskpane.html#dialog',
              {height: 45, width: 55},
              result => {});
          });
      });
    } catch (error) {
      console.error(error);
    }
  }
}
