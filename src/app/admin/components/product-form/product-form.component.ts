import { Component, OnDestroy } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Observable, Subscription, map, take } from 'rxjs';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnDestroy {
  categories$!: Observable<any[]>;
  product: any = {};
  id;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService){

    this.categories$ = this.categoryService.getAllCategories().snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => {
          const payloadVal: any = c.payload.val();
          return {
            key: c.payload.key,
            ...payloadVal
          };
        });
      })
    );

    // this.subscription = this.categoryService.getAllCategories().subscribe(category => this.categories$ = category);

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) { 
      productService.getProduct(this.id).snapshotChanges()
      .subscribe(product => this.product = product);
    }  
  }

  save(product){
    if(this.id) this.productService.updateProduct(this.id, product);
    else this.productService.createProduct(this.product);
    
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Do you really want to delete this product?')) return;

    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
