import { Component, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent implements OnDestroy{
  categories$!: Observable<any[]>;
  subscription!: Subscription;

  @Input('category') category: any;

  constructor(private categoryService: CategoryService){
    
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

    // this.subscription = categoryService.getAllCategories().subscribe(category => this.categories$ = category);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
