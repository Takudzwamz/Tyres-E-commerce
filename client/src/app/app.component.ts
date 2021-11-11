import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //title = 'Tashe Bakery';

  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    private metaTagService: Meta
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();

    this.metaTagService.addTags([
      {
        name: 'keywords',
        content:
          // tslint:disable-next-line: max-line-length
          'Takudzwa, Mupanesure, CSS, HTML, .Net, C#, Angular, Software development, Computer science, E-commerce, Android apps, iOS apps, Windows, .Net 6, ASP.NET Core, SQL, No- SQL, Mongodb, Mysql, Digital Ocean, Github, Software developer, dev, web',
      },
      { name: 'robots', content: 'index, follow' },

      {
        name: 'description',
        content:
          // tslint:disable-next-line: max-line-length
          'I am a Software Engineer who is passionate about software advancements. If you like what I do please dont hesitate to contact me, lets work together',
      },
      { name: 'author', content: 'Sputnik Tech' },
      { name: 'twitter:card', content: 'Takudzwa Mupanesure' },
      {
        name: 'twitter:title',
        content: 'Software is the backbone of the modern society',
      },
      {
        name: 'twitter:description',
        content:
          // tslint:disable-next-line: max-line-length
          'I am a Software Engineer who is passionate about software advancements. If you like what I do please dont hesitate to contact me, lets work together',
      },
    ]);
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe(
      () => {
        console.log('loaded user');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => {
          console.log('initialised basket');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
