import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-usuario-view-routed',
  templateUrl: './admin-usuario-view-routed.component.html',
  styleUrls: ['./admin-usuario-view-routed.component.css']
})
export class AdminUsuarioViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRouter: ActivatedRoute,
  ) { 
    this.id = parseInt(this.oActivatedRouter.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
