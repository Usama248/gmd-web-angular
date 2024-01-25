import { Component, OnInit } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PhoneMaskDirective } from 'src/app/shared/directives/phone-mask.directive';
import { FileSizeCheckDirective } from 'src/app/shared/directives/file-size-check.directive';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { AuthRepository } from 'src/app/services/auth-service/auth.repository';
import { UserProfileModel } from 'src/app/models/user/user-profile.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';


@Component({
  selector: 'app-profile-main',
  standalone: true,
  imports: [ReactiveFormsModule, TabViewModule, InputTextModule, ButtonModule, InputMaskModule, PhoneMaskDirective, FileSizeCheckDirective,FormsModule],
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss']
})
export class ProfileMainComponent implements OnInit {
  imageUrl: string | ArrayBuffer | null = "../../../../assets/images/user.webp";
  imageError!: string;
  uKey: string = "werwer";
  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    labkey: new FormControl(''),
  });
  constructor(private toastService: ToastService, private authRepo: AuthRepository,
    private authService: AuthService,
    private formBuilder: FormBuilder) {}
  loginUserInfo!: UserProfileModel;
  userProfileForm: FormGroup = new FormGroup({
   firstName: new FormControl(''),
   lastName: new FormControl(''),
   labAlertSecertKey: new FormControl(''),
   equilifeAPIKey:new FormControl(''),
   labCode:new FormControl(''),
   email:new FormControl(''),
   mobileNumber:new FormControl(''),
   userName:new FormControl('')
  });
  ngOnInit(): void {
    this.authRepo.getLoginUserData();
    this.authService.getProfile().subscribe(res=>{
      if(res?.data)
      {
        this.loginUserInfo = res?.data;
        this.userProfileForm.setValue({
          firstName: this.loginUserInfo.firstName,
          lastName: this.loginUserInfo.lastName,
          labAlertSecertKey:this.loginUserInfo.clinicLabAlertSecretKey,
          equilifeAPIKey:'',
          labCode:'',
          email:this.loginUserInfo.email,
          mobileNumber:this.loginUserInfo.mobileNumber,
          userName:this.loginUserInfo.userName
        })
      }
    });
    this.userProfileForm = this.formBuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      labAlertSecertKey:[''],
      equilifeAPIKey:[''],
      labCode:[''],
      email:['',[Validators.required]],
      mobileNumber:[''],
      userName:['',[Validators.required]]
    });
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (this.isImageFile(file)) {
        this.previewImage(file);
        this.handleUploadProfileError("");
      } else {
        const invalidImageError = 'Please select a valid image file (jpg, jpeg, png, gif).';
        this.toastService.showWarn(invalidImageError);
        this.handleUploadProfileError(invalidImageError);
        // Clear the input field
        event.target.value = null;
      }
    }
  }
  previewImage(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }
  isImageFile(file: File): boolean {
    const acceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    return acceptedImageTypes.includes(file.type);
  }
  handleUploadProfileError(message: string): void {
    this.imageError = message;
  }
  generateLabAlertSecretKey() {
    const keyLength = 24;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
  
    for (let i = 0; i < keyLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters.charAt(randomIndex);
    }
    this.uKey = key;
    this.userProfileForm.controls['labAlertSecertKey'].setValue(this.uKey)
  }
}
