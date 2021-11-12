import {Component, Input, OnInit} from '@angular/core';
import {IProduct, ProductFormValues} from '../../shared/models/product';
import {IBrand} from '../../shared/models/brand';
import {IType} from '../../shared/models/productType';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../admin.service';
import { CanonicalService } from 'src/app/services/canonical.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss'],
})
export class EditProductFormComponent implements OnInit {
  @Input() product: ProductFormValues;
  @Input() brands: IBrand[];
  @Input() types: IType[];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private title: Title,
    private metaTagService: Meta,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this.canonicalService.setCanonicalURL();
    this.title.setTitle('Edit product form');
    this.metaTagService.updateTag({
      name: 'description',
      content: 'Edit product on this form',
    });
  }

  onSubmit(product: ProductFormValues) {
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedProduct = {
        ...this.product,
        ...product,
        price: +product.price,
      };
      this.adminService
        .updateProduct(updatedProduct, +this.route.snapshot.paramMap.get('id'))
        .subscribe((response: any) => {
          this.router.navigate(['/admin']);
        });
    } else {
      const newProduct = { ...product, price: +product.price };
      this.adminService.createProduct(newProduct).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    }
  }

  updatePrice(event: any) {
    this.product.price = event;
  }
}
