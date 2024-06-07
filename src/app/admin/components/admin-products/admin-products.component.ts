import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnDestroy {
  products!: Product[];
  filteredProducts!: Product[];
  subscription: Subscription;
  // dataSource!: MatTableDataSource<Product>;
  // displayedColumns: string[] = ['title', 'price'];
  // sort!: MatSort;
  // paginator!: MatPaginator
  // tableResource!: DataTableResource<Product>;
  // items: Product[] = [];
  // itemCount!: number;

  constructor(private productService: ProductService) {

    this.subscription = this.productService.getAllProducts().snapshotChanges()
      .subscribe(products => {
        this.filteredProducts = this.products = products.map(snapshot => {
          const data = snapshot.payload.val() as Product;
          const key = snapshot.payload.key;
          return { ...data, key: key } as Product;
        })
        // this.initializeDataSource(this.products);
        // this.initializeTable(products);
      });

    // this.subscription = this.productService.getAllProducts().subscribe((products: any) => {
    //   this.filteredProducts = this.products = products;
    // });
  }

  // private initializeDataSource(products){
  //   this.dataSource = new MatTableDataSource(products);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    // this.initializeDataSource(this.filteredProducts);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // private initializeTable(products){
  //   this.tableResource = new DataTableResource(products);
  //   this.tableResource.query({ offset: 0})
  //     .then(items => this.items = items);
    
  //   this.tableResource.count()
  //     .then(count => this.itemCount = count);  
  // }

  // reloadItems(params){
  //   if(!this.tableResource) return;

  //   this.tableResource.query(params)
  //     .then(items => this.items = items);
  // }
}
