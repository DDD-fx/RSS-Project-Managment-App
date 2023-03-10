import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

export const FILE_MOCK: File = new File(['foo'], 'foo.png', {
  type: 'image/png',
});

export const FILES_TO_DELETE_MOCK: string[] = ['1', '2'];

export const USER_FILES_MOCK = {
  addedFiles: [FILE_MOCK],
  filesToDelete: FILES_TO_DELETE_MOCK,
};

const dataMock = {
  fullName: 'fullName',
  identificationNumber: '111111111111',
  exemptionFromTaxation: 'exemptionFromTaxation',
  addressOfSubAccountAccountsOwner: 'addressOfSubAccountAccountsOwner',
  phoneNumber: '+7485566950740',
  email: 'test@gmail.com',
  isIndividual: true,
  isResident: true,
}

@Component({
  selector: 'app-custody',
  templateUrl: './custody.component.html',
  styleUrls: ['./custody.component.scss']
})
export class CustodyComponent {
  constructor(private http: HttpClient) {
  }

  public send(): void {
    this.method().subscribe((data) => console.log(data))
  }

  private method() {
    const formData: FormData = new FormData();
    formData.append(
      'dto',
      new Blob([JSON.stringify(dataMock)], {
        type: 'application/json',
      })
    );
    USER_FILES_MOCK.addedFiles.forEach((item) => formData.append('files', item));
    if (!!USER_FILES_MOCK.filesToDelete.length) {
      formData.append(
        'filesToDelete',
        new Blob([JSON.stringify(USER_FILES_MOCK.filesToDelete)], {
          type: 'application/json',
        })
      );
    }

    return this.http
      .post('https://test-custody.jusan.kz:8556/api/v1/sub-account/draft', formData)
      .pipe(catchError((error: Error) => {
        console.error(error);
        return of(null);
      }));
  }
}
