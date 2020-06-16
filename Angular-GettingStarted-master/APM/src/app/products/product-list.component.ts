import { Component, OnInit } from '@angular/core';


import { IProduct } from './product';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { ProductService } from './product.service';

@Component({
    //selector: "prod-list",
    templateUrl: "./product-list.component.html",
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTtitle:string = 'Product List';
    imageWidth = 40;
    imageMargin = 1;
    showImage:boolean = false;
    errorMessage:string;

    filterProducts:IProduct[];
    private _filterBy: string;
    public get filterBy(): string {
        console.log('Inside getfilterBy');
        return this._filterBy;
    }
    public set filterBy(value: string) {
        console.log('Inside setfilterBy');
        this._filterBy = value;
        this.filterProducts = this.filterBy ? this.performFilter(this.filterBy) : this.products;
    }
    
  
    products: IProduct[]= [];
        

          toggleImage() : void{
              this.showImage = !this.showImage;
          }

          ngOnInit():void{
              console.log('In OnInit method 1');
              //this.products = this.productService.getProducts();
              this.productService.getProducts().subscribe({
                  next : products => 
                  {
                      this.products = products;
                      this.filterProducts = this.products;
                      
                  },
                  error : err => this.errorMessage = err
              });
              //this.filterBy='';
              //this.filterProducts = this.products;
          }

          
          constructor(private productService:ProductService){
            console.log('Inside constructor');
            
          }

          performFilter(filterBy :string):IProduct[]{
            console.log('Inside performFilter');
            filterBy = filterBy.toLowerCase();
            return this.products.filter((product:IProduct)=>product.productName.toLowerCase().indexOf(filterBy) !== -1);
          }

          fromNestedComponent(message:string):void{
              console.log('fromNestedComponent called ');
              this.pageTtitle = 'Product List ' + message;
          }
    
}