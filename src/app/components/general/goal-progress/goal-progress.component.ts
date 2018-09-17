import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-goal-progress',
  templateUrl: './goal-progress.component.html',
  styleUrls: ['./goal-progress.component.scss'],
})
export class GoalProgressComponent implements OnInit {
  @Input()
  percent: number;
  @Input()
  subtitle: string;
  @Input()
  outerStrokeColor = '#78C000';
  animationDuration = 1600;
  @Input()
  titleFontSize;
  @Input()
  unitsFontSize;
  @Input()
  subtitleFontSize;
  isDesktop: boolean;

  constructor(private platform: Platform) {
    this.isDesktop = this.platform.is('desktop');
  }

  ngOnInit() {
    if (this.isDesktop) {
      this.titleFontSize = '40';
      this.unitsFontSize = '15';
      this.subtitleFontSize = '15';
    } else {
      this.titleFontSize = '80';
      this.unitsFontSize = '20';
      this.subtitleFontSize = '20';
    }
  }
}
