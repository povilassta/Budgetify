import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() menuButtonClicked: EventEmitter<void> = new EventEmitter<void>();

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

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
