import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../services/canonical.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(
    private title: Title,
    private metaTagService: Meta,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this.canonicalService.setCanonicalURL();

    this.title.setTitle('Contact US');
    this.metaTagService.updateTag({
      name: 'description',
      content: 'Contact us for more information',
    });
  }
}
