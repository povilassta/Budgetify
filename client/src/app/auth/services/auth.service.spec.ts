import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setSession have to call on success', (done: DoneFn) => {
    spyOn(service as any, 'setSession');
    const expectedResult = {
      token: 'token',
      expiresIn: '1h',
      name: 'name',
    };
    service.login('email', 'pass').subscribe(() => {
      expect((service as any).setSession).toHaveBeenCalledOnceWith(
        expectedResult
      );
      done();
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: 'http://localhost:3000/login/',
    });
    req.flush(expectedResult);
  });

  it('setSession have not to call on error', (done: DoneFn) => {
    spyOn(service as any, 'setSession');
    service.login('email', 'pass').subscribe({
      error: () => {
        expect((service as any).setSession).not.toHaveBeenCalled();
        done();
      },
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: 'http://localhost:3000/login/',
    });
    req.error(new ProgressEvent('401'));
  });
});
