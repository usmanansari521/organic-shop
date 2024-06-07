import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Observable, Subscription, map, switchMap } from 'rxjs';
import { CategoryService } from 'shared/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category;
  cart$!: Observable<ShoppingCart>;

  constructor(
    private cartService: ShoppingCartService,
    private route: ActivatedRoute,
    private productService: ProductService){ }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts(){
    
    // this.productService.getAllProducts().pipe(switchMap((products: any) => {
    //   this.products = products;
    //   return this.route.queryParamMap
    // })).subscribe(params => {
    //   this.category = params.get('category');
    //   this.applyFilter();
    // });

    this.productService.getAllProducts().snapshotChanges()
    .pipe(
      switchMap((products: any) => {
        this.products = products
          .map(snapshot => {
            const data = snapshot.payload.val() as Product;
            const key = snapshot.payload.key;
            return { ...data, key: key } as Product;
          })
        return this.route.queryParamMap
      })
    )
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter()
    });
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ? 
    this.products.filter(products => products.category === this.category) : 
    this.products;
  }
}
