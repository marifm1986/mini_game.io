import { AfterViewInit, Component, ElementRef, HostListener, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/bee.json',
  };
  options2: AnimationOptions = {
    path: '/assets/happyBee.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  isGameStarted: boolean = false;
  isGameOver: boolean = false;
  isPaused: boolean = false;

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

  gameTrigger: any;
  timeCountDown = 0;
  score: number = 0
  timerTrigger: any;

  screenHeight!: number;
  screenWidth!: number;
  containerHeight!: number;
  containerWidth!: number;

  top = 0;
  left = 0;

  @ViewChild('container') container!: ElementRef;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    console.log(this.screenHeight, this.screenWidth);
  }

  // form group

  setTimeForm = new FormGroup({
    setTimeValue: new FormControl(),
  });

  constructor() {
    this.currentLevel = 2000;
  }

  ngOnInit(): void {
    this.getScreenSize();
  }

  startGame() {
    this.isGameStarted = true;
    this.score = 0;
    this.setTimeForm.setValue({
      setTimeValue: 10
    })
    this.addTime()
    this.playGame()
  }

  pauseGame() {
    this.stopAnimation();
    this.stopTimer();
    this.isPaused = true;
  }

  playGame() {
    this.startAnimation();
    this.startTimer();
    this.isPaused = false;
    this.isGameOver = false;
  }

  endGame() {
    this.top = 0;
    this.left = 0;
    this.pauseGame();
    this.isGameOver = true;
    this.isPaused = false;
    this.isGameStarted = false;
  }

  makeScore() {
    if (this.isGameStarted) {
      this.score++
    }
  }

  startAnimation() {
    this.gameTrigger = setInterval(() => {
      this.top = Math.floor(Math.random() * this.screenHeight / 2) + 1;
      this.left = Math.floor(Math.random() * this.screenWidth / 2) + 1;
    }, this.currentLevel)
  }

  stopAnimation() {
    setTimeout(() => {
      clearTimeout(this.gameTrigger)
    }, 0);
  }

  startTimer() {
    this.timerTrigger = setInterval(() => {
      this.timeCountDown--
      if (this.timeCountDown == 0) {
        this.endGame()
      }
    }, 1000)
  }

  stopTimer() {
    setTimeout(() => {
      clearTimeout(this.timerTrigger)
    }, 0)
  }

  changeLevel(level: any) {
    this.currentLevel = level
    console.log(level)
  }
  addTime() {
    this.timeCountDown = this.setTimeForm.value.setTimeValue;
  }



}
