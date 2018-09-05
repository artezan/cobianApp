import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../_config/_animations';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss'],
  animations: fuseAnimations,
})
export class MainAdminComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
