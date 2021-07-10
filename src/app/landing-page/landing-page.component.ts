import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  peliculasEnCines: any;
  peliculasProximosEstrenos: any = [];
  
  ngOnInit(): void {

    this.peliculasEnCines = [{
      titulo: 'Spider-Man',
      fechaLanzamiento: new Date(),
      precio: 1400.99,
      poster: 'https://cdn.europosters.eu/image/750/posters/spider-man-miles-morales-cybernetic-swing-i100282.jpg'
    },
    {
      titulo: 'Moana',
      fechaLanzamiento: new Date('2016-11-14'),
      precio: 300.99,
      poster: 'https://i.pinimg.com/originals/73/3c/f5/733cf519363ff0401658ea9df8384c2f.jpg'
    }];

  }
}


