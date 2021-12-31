import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui';
  constructor(private router: Router, private httpService: HttpService) { }

  logout(): void {
    this.httpService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
