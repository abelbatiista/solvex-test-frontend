import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public locations: Location[] = [];

  public constructor(
    private _locationService: LocationService,
    private _authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.get();
  }

  private get(): void {
    this._locationService.getByUser(this._authService.user?.id!).subscribe((data: any): any => {
      this.locations = data;
    });
  }

}
