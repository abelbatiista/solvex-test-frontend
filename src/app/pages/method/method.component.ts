import { Component, OnInit } from '@angular/core';
import { Method } from 'src/app/models/method.model';
import { AuthService } from 'src/app/services/auth.service';
import { MethodService } from 'src/app/services/method.service';

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})
export class MethodComponent implements OnInit {

  public methods: Method[] = [];

  public constructor(
    private _methodService: MethodService,
    private _authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.get();
  }

  private get(): void {
    this._methodService.getByUser(this._authService.user?.id!).subscribe((data: any): any => {
      this.methods = data;
    });
  }

}
