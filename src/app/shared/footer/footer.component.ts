import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public NAME: string | undefined;
  public DATE: Date | undefined;

  public constructor() { }

  public ngOnInit(): void {
    this.fill();
  }

  private fill(): void {
    this.NAME = 'ABel Batista Rodríguez';
    this.DATE = new Date();
  }

}
