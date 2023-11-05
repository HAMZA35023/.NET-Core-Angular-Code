import { Component } from '@angular/core';
import { ApiService } from './Api Service/api.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Patient Demographics';
  provider: any = {
    providerId : 123,
    firstName : ''
  };

  patient: any = {
    id: 1,
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    RefProvider: this.provider
  };
  isFormValid: boolean = false;
  errorMessage: string = '';
  showAlert: boolean = false;  
  alertMessage: string = '';    
  success: boolean = false;    
  error: boolean = false;    
  
  constructor(private apiService: ApiService) 
  {

  }

  onFormChange(): void {
    
  }

  postPatientDemo()
  {
    this.isFormValid = this.patient.firstName && this.patient.lastName && this.patient.dob && this.patient.gender && this.provider.firstName;
    this.errorMessage = '';
    if(this.isFormValid)
    {
      const observer: Observer<any> = {
        next: (response) => {
          this.showAlertMessage('Request was successful!', true);
          console.log('API Response:', response);
          return response;
        },
        error: (error) => {
          this.showAlertMessage('Request failed. Please try again.', false);
          console.error('API Error:', error);
        },
        complete: () => {
          // Handle completion if needed
        }
      };
      // Call api post service
      this.apiService.postPatientData(this.patient).subscribe(observer);
    }
    else
    {
      this.errorMessage = 'Please Fill the required fields';
    }
    
  }
  currentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
  
    // Format the date as 'yyyy-MM-dd'
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return formattedDate;
  }

  showAlertMessage(message: string, isSuccess: boolean) {
    this.alertMessage = message;
    this.showAlert = true;
    this.success = isSuccess;
    this.error = !isSuccess;
  
    // Message appears for 2 seconds
    setTimeout(() => {
      this.hideAlert();
    }, 2000);
  }
  
  hideAlert() {
    this.showAlert = false;
  }
  clearForm() {
    
    this.patient.firstName = '';
    this.patient.lastName = '';
    this.patient.dob = '';
    this.patient.gender = '';
    this.provider.firstName = ''; 

    
    this.isFormValid = true; 
    this.errorMessage = ''; 
  }
}
