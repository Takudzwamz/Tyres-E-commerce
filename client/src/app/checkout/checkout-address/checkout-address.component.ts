import { Component, Input, OnInit } from '@angular/core';

import { AccountService } from 'src/app/account/account.service';
import { FormGroup } from '@angular/forms';
import { IAddress } from 'src/app/shared/models/address';
import { ToastrService } from 'ngx-toastr';
import { Title, Meta } from '@angular/platform-browser';
import { CanonicalService } from 'src/app/services/canonical.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private title: Title,
    private metaTagService: Meta,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit() {
    this.canonicalService.setCanonicalURL();
    this.title.setTitle('Checkout Address');
    this.metaTagService.updateTag({
      name: 'description',
      content: 'Enter your address and save it',
    });
  }

  saveUserAddress() {
    this.accountService
      .updateUserAddress(this.checkoutForm.get('addressForm').value)
      .subscribe(
        (address: IAddress) => {
          this.toastr.success('Address saved');
          this.accountService.addressSource.next(address);
          this.checkoutForm.get('addressForm').reset(address);
        },
        (error) => {
          this.toastr.error(error.message);
          console.log(error);
        }
      );
  }
}
