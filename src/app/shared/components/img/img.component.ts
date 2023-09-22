import { Component, Input, Output, EventEmitter, OnChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  img: string = '';

  @Input()
  set changeImage(newImg: string) {
    this.img = newImg;
    console.log('change just img => ', this.img);

  };

  // RECEIVE VALUE FROM PARENT WITH INPUT
  // @Input() img: string = '';
  // SPECIFY THAT THE loaded EVENT WILL SEND STRINGS AS PARAMS
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://www.m2crowd.com/core/i/placeholder.png';
  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    // EXECUTES BEFORE RENDER
    // DO NOT EXECUTE ASYNC FUNCTIONS
    // EXECUTED JUST ONCE
    console.log('constructor', 'imgValue => ', this.img);
  }

  ngOnChanges() {
    // EXECUTES BEFORE AND AFTER RENDER
    // LISTENT TO INPUT CHANGES
    console.log('ngOnChanges', 'imgValue => ', this.img);
  }

  ngOnInit() {
    // EXECUTES BEFORE RENDER
    // CAN EXECUTE ASYNC/FETCH FUNCTIONS
    // EXECUTES JUST ONCE
    console.log('ngOnInit', 'imgValue => ', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('counter running');
    // }, 1000);
  }

  ngAfterViewInit() {
    // AFTER VIEW RENDERED
    // HANDLE CHILDREN COMPONENTS
    console.log('ngAfterViewInit');
  }

  ngOnDestroy() {
    // DELETE
    console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('log child');
    this.loaded.emit(this.img);
  }
}
