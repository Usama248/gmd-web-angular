import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router, RouterModule } from '@angular/router';
import { FormValidationService } from 'src/app/shared/services/form-validation.service';
import { ErrorMessagesComponent } from "../../../shared/components/error-messages/error-messages.component";
import { DisableDuringSubmitDirective } from 'src/app/shared/directives/disable-during-submit.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [RouterModule, DisableDuringSubmitDirective, CommonModule, ButtonModule, InputTextModule, CardModule, ReactiveFormsModule, ErrorMessagesComponent]
})
export class LoginComponent implements OnInit {
  fieldTextType = false;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private router: Router, private formValidationService: FormValidationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          null,
          [
            Validators.required
          ]
        ],
        password: [
          '',
          [
            Validators.required
          ]
        ],
      }
    );
  }


  onSubmit(): void {
    if (this.form.valid) {
      const credentials = {
        email: this.form.get("username")?.value,
        password: this.form.get("password")?.value
      };
      this.authService.login(credentials).subscribe({
        next: res => {
          if (res.status == 1) {
            this.storageService.accessToken = res.data.accessToken;
            this.toastService.showSuccess(res.message)
            this.router.navigate(['/clinic/dashboard']);
          } else {
            this.toastService.showError(res.message)
          }
        },
        error: err => {
          console.log(err);
        }
      });
    } else {
      this.formValidationService.markFieldsAsDirty(this.form);
    }
  }
  getControl(keyOrPath: string): FormControl {
    return this.form.get(keyOrPath) as FormControl;
  }
  isPasswordShow: boolean = false
  passwordShowHide(passwordInput: HTMLInputElement) {
    this.isPasswordShow = !this.isPasswordShow
    passwordInput.type = this.isPasswordShow ? "text" : "password"
  }

}
