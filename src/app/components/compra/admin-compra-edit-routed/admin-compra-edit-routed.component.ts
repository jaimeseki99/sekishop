import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-compra-edit-routed',
  templateUrl: './admin-compra-edit-routed.component.html',
  styleUrls: ['./admin-compra-edit-routed.component.css']
})
export class AdminCompraEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRouter: ActivatedRoute
  ) { 
    this.id = parseInt(this.oActivatedRouter.snapshot.paramMap.get('id') || '1');
  }

  ngOnInit() {
  }

}
