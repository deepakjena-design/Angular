import {Component, OnChanges, Input, EventEmitter, Output} from '@angular/core'

@Component({
    selector:'prod-star',
    templateUrl:'./star.component.html',
    styleUrls:['./star.component.css'],
})

export class StarComponent implements OnChanges{
    
    starWidth:number;
    @Input() rating:number ;

    @Output() ratingClicked:EventEmitter<String> = new EventEmitter<String>();

    ngOnChanges(): void {
        this.starWidth = this.rating *75/5;
    }

    onClick():void{
        console.log(`Rating ${this.rating} clicked`);
        this.ratingClicked.emit(`Rating ${this.rating} clicked`);
    }
}