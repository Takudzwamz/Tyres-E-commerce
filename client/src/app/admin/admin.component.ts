import {Component, OnInit} from '@angular/core';
import {ShopParams} from '../shared/models/shopParams';
import {IProduct} from '../shared/models/product';
import {ShopService} from '../shop/shop.service';
import {AdminService} from './admin.service';
import { CanonicalService } from '../services/canonical.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  products: IProduct[];
  totalCount: number;
  shopParams: ShopParams;

  constructor(
    private shopService: ShopService,
    private adminService: AdminService,
    private title: Title,
    private metaTagService: Meta,
    private canonicalService: CanonicalService
  ) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts();
    this.canonicalService.setCanonicalURL();
    this.title.setTitle('Admin page');
    this.metaTagService.updateTag({
      name: 'description',
      content: 'Inventory and Orders management page',
    });
  }

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(
      (response) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  deleteProduct(id: number) {
    this.adminService.deleteProduct(id).subscribe((response: any) => {
      this.products.splice(
        this.products.findIndex((p) => p.id === id),
        1
      );
      this.totalCount--;
    });
  }
}
