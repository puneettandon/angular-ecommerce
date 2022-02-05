import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean  = false;
  userFullName: string | undefined; 

  storage :Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
    // subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    )
  }

  getUserDetails() {
   if(this.isAuthenticated){
     // fetch the logged in user details(user's claim)
     // 
     // user full name is exposed as property name
     this.oktaAuthService.getUser().then(
       (res) => {
         this.userFullName = res.name;

         // retrieve the user's email from the authentication response
         const theEmail = res.email;

         // now store the email
         this.storage.setItem('userEmail',JSON.stringify(theEmail));
       }
     );
   }
  }


  logout(){
    // terminates the session with okta and remove current tokens
    this.oktaAuthService.signOut();
  }



}
