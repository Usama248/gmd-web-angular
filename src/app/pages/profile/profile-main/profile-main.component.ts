import { Component, OnInit } from '@angular/core';

import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PhoneMaskDirective } from 'src/app/shared/directives/phone-mask.directive';
import { FileSizeCheckDirective } from 'src/app/shared/directives/file-size-check.directive';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRepository } from 'src/app/services/auth-service/auth.repository';

@Component({
  selector: 'app-profile-main',
  standalone: true,
  imports: [ReactiveFormsModule, TabViewModule, InputTextModule, ButtonModule, InputMaskModule, PhoneMaskDirective, FileSizeCheckDirective],
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
  constructor(private toastService: ToastService, private authRepo: AuthRepository) {}
  ngOnInit(): void {
    this.authRepo.getLoginUserData();
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
  }
}
