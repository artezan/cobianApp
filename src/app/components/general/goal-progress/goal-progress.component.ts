import { Component, OnInit, Input } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}
}
