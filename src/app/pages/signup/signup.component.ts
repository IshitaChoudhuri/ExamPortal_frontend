import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snack: MatSnackBar) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (!this.validatePassword(this.user.password)) {
      this.snack.open('Password must be at least 6 characters long', '', {
        duration: 3000,
      });
      return;
    }

    if (!this.validateEmail(this.user.email)) {
      this.snack.open('Please enter a valid email address', '', {
        duration: 3000,
      });
      return;
    }

    if (!this.validatePhone(this.user.phone)) {
      this.snack.open('Please enter a valid phone number', '', {
        duration: 3000,
      });
      return;
    }

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Successfully done !!', 'User id is ' + data.id, 'success');
      },
      (error) => {
        console.log(error);
        this.snack.open(error.error.text, '', {
          duration: 3000,
        });
      }
    );
  }

  validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhone(phone: string): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }
}
