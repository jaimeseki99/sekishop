import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ICompra, IProducto } from 'src/app/model/model.interfaces';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';

@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})
export class HomeRoutedComponent implements OnInit {
  
  idProducto: number = 0;
  reloadProductos: Subject<boolean> = new Subject<boolean>();

  constructor(
    
  ) { }

  ngOnInit() {
  }

  onProductoChange(oProducto: IProducto) {
    this.idProducto = oProducto.id;
  }

  onCompraChange(bCompra: Boolean) {
    this.reloadProductos.next(true);
  }




}
