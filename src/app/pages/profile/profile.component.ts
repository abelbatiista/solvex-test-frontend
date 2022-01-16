import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userLogged: User | undefined;
  public user: User | undefined;
  public fileUpload: any;
  public form: FormGroup | undefined;
  public image: any;

  public constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _fileService: FileService,
    private _formBuilder: FormBuilder
  ) {
    this.initializeForm();
   }

  public ngOnInit(): void {
    this.userLogged = this._authService.user;
  }

  private initializeForm(): void {
    this.user = this._authService.user;
    this.form = this._formBuilder.group({
      name: ['' || this.user?.name, [Validators.required]],
      lastname: ['' || this.user?.lastname, [Validators.required]],
      email: ['' || this.user?.email, [Validators.required, Validators.email]]
    });
  }

  public update(): void {
    const {name, lastname, email} = this.form!.value;
    const user: User = {id: this.user?.id, name, lastname, email};

    this._userService.update(user).subscribe(() => { 
      const { name, lastname, email } = this.form!.value;
      this.user!.name = name;
      this.user!.lastname = lastname;
      this.user!.email = email;
      this.callSwal('success', 'Successfully!', 'Changes was saved!');
    }, (error): any => {
      console.log(error);
      this.callSwal('error', 'Error!', error.error.message);
    });
  }

  public changeImage(event: any): any {
    this.fileUpload = event['target']['files'][0];

    if(!this.fileUpload) {
      return this.image = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileUpload);
    reader.onloadend = () => {
      this.image = reader.result;
    }
  }

  public updateImage(): void {
    this._fileService.updateImage(this.fileUpload, 'user', this.user!.id!).subscribe((data: any): any => {
      console.log(data);
      this.user!.image = data;
      this.callSwal('success', 'Successfully!', 'Image was saved!');
    }, (error): any => {
      this.callSwal('error', 'Error!', error.error.message);
    });
  }

  private callSwal(icon: any, title: string, text: string): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }

}
