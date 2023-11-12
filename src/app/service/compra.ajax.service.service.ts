import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "src/environment/environment";
import { ICompra, ICompraPage } from "../model/model.interfaces";
import { Observable } from "rxjs";

@Injectable() 
export class CompraAjaxService {

    sUrl: string = API_URL + "/compra";

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<ICompra> {
        return this.oHttpClient.get<ICompra>(this.sUrl + "/" + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, id_usuario: number, id_producto: number): Observable<ICompraPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        let strUrlUser = "";
        if (id_usuario > 0) {
            strUrlUser = "&usuario=" + id_usuario;
        }
        let strUrlProducto = "";
        if (id_producto > 0) {
            strUrlProducto = "&producto=" + id_producto;
        }

        return this.oHttpClient.get<ICompraPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection + strUrlUser + strUrlProducto);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oCompra: ICompra): Observable<ICompra> {
        return this.oHttpClient.post<ICompra>(this.sUrl, oCompra);
    }

    updateOne(oCompra: ICompra): Observable<ICompra> {
        return this.oHttpClient.put<ICompra>(this.sUrl, oCompra);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate" + amount, null);
    }
}