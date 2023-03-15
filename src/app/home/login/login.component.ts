import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  loginForm!: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control(''),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    })
  }

  public onSubmit() {
    console.log(this.loginForm.value);
    this.authService.signInWithEmailAndPassword(
      this.loginForm.value.email,
      this.loginForm.value.password
    )
      .then((res: any) => {
        console.log(res);
        alert('Success');
      })
      .catch((err) => {
        console.log(err);
        alert('Failure');
      });
  }
}
