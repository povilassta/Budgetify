import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public currentUser: string = localStorage.getItem('name') || '';
  public isWideScreen$: Observable<boolean> | undefined;
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isWideScreen$ = this.breakpointObserver
      .observe('(min-width: 800px')
      .pipe(map(({ matches }) => matches));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number } }) {
    if (event.target.innerWidth > 800) {
      this.sidenav.close();
    }
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
