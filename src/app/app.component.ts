import { AfterViewInit, Component, ElementRef, HostListener, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isGameStarted: boolean = false
  isGameOver: boolean = false
  currentLevel: any;
  levels: any[] = [
    {
      label: 'Easy',
      speed: 2000
    },
    {
      label: 'Normal',
      speed: 1000
    },
    {
      label: 'Hard',
      speed: 500
    }
  ];

  screenHeight!: number;
  screenWidth!: number;
  containerHeight!: number;
  containerWidth!: number;

  top = 0;
  left = 0;


  timer: any;
  countDown: number = 20;
  score: number = 0
  cd: any;


  @ViewChild('container') container!: ElementRef;

  constructor() {
    this.currentLevel = 2000;
  }

  ngOnInit(): void {
    this.getScreenSize();

  }


  changeLevel(level: any) {
    this.currentLevel = level
    console.log(level)
  }




  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    console.log(this.screenHeight, this.screenWidth);
  }

  startGame() {
    this.isGameStarted = true
    this.timer = setInterval(() => {
      this.top = Math.floor(Math.random() * 500) + 1;
      this.left = Math.floor(Math.random() * 500) + 1;
    }, this.currentLevel)
    this.cd = setInterval(() => {
      this.countDown--
      if (this.countDown <= 0) {
        setTimeout(() => {
          clearTimeout(this.cd)
          this.stopGame();
          this.isGameOver = false;
          this.isGameStarted = false
        }, 0)
      }
    }, 1000)

  }

  stopGame() {
    setTimeout(() => {
      clearTimeout(this.timer)
      this.score = 0;
    }, 0);
    setTimeout(() => {
      clearTimeout(this.cd)
      this.isGameOver = false;
      this.isGameStarted = false
    }, 0)
  }

  resetGame() {
    this.stopGame();
    this.currentLevel = 2000;
    this.score = 0;
  }

  makeScore() {
    if (this.isGameStarted) {
      this.score++
    }
  }

}
