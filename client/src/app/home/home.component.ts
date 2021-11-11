import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CanonicalService } from '../services/canonical.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig], // add NgbCarouselConfig to the component providers
})
export class HomeComponent implements OnInit {
  constructor(
    config: NgbCarouselConfig,
    private title: Title,
    private canonicalService: CanonicalService
  ) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    config.interval = 8000; // images change in 8sec //
    config.wrap = true; // autometically redirect to first image //
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  showNavigationArrows = false;
  showNavigationIndicators = false;
  public images = [
    'https://res.cloudinary.com/dyzeuqi75/image/upload/v1636547171/robert-laursoo-WHPOFFzY9gU-unsplash_oayk5w.jpg',

    'https://res.cloudinary.com/dyzeuqi75/image/upload/v1636547191/pexels-kelson-downes-1149137_eu3el9.jpg',

    'https://res.cloudinary.com/dyzeuqi75/image/upload/v1636547192/shreesha-bhat-59nIOuU7Mp0-unsplash_hoanwi.jpg',

    'https://res.cloudinary.com/dyzeuqi75/image/upload/v1636547195/pexels-jan-kop%C5%99iva-3399938_odeelo.jpg',
  ];
  titles = [
    'Summer tyres',
    'Winter tyres',
    'All-season tyres',
    '4x4 truck tyres',
  ];
  discription = [
    // tslint:disable-next-line: max-line-length
    '',
    '',
    '',
    // tslint:disable-next-line: max-line-length
    '',
  ];

  ngOnInit(): void {
    this.canonicalService.setCanonicalURL();
    this.title.setTitle('Tyre E-commerce');
  }
}
