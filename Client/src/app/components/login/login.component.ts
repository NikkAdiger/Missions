import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  error: any | undefined;
  

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService
  ) { 
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls; 
  }

  clearError() {
    setTimeout(() => {
      this.error = null;
    }, 3000);
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.userService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          (token: any) => {
            if(token) {
              this.router.navigate(['/missions']); 
              this.loading = false;
              return;
            }
            this.error = { status: 'error', statusText: `Response doesn't exist a token` };
            this.clearError();
            this.loading = false;
            return;

          },
          (error: any) => {
              this.error = error;
              this.loading = false;
              this.clearError();
          });
  }
}
