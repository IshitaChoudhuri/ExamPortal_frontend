import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user = null;
  constructor(private login: LoginService) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
    // this.login.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.user = user;
    //   },
    //   (error) => {
    //     alert('error');
    //   }
    // );
  }


  // Generate URL to share profile details
  onShareProfile() {
    const profileUrl = window.location.href;
    const shareUrl = `${profileUrl}`;
    console.log('Share URL:', shareUrl);
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Profile URL copied to clipboard');
    }).catch((error) => {
      console.error('Failed to copy URL to clipboard', error);
      alert('Failed to copy URL to clipboard');
    });
  }
}
