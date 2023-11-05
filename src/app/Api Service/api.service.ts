import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost/PatientDemoApp/PatientRequest/PostPatientData';

  constructor(private http: HttpClient) {}

  postPatientData(patientData: any): Observable<any> {
    // Post request to the backend API
    return this.http.post(this.apiUrl,patientData,{responseType: 'text'});
  }
}
