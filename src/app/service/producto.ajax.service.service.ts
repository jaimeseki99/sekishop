import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "src/environment/environment";
import { IProducto, IProductoPage } from "../model/model.interfaces";
import { Observable } from "rxjs";

@Injectable()
export class ProductoAjaxService {

    sUrl: string = API_URL + "/producto";

    constructor(
        private oHttpClient: HttpClient
    ) {}

    getOne(id: number): Observable<IProducto> {
        return this.oHttpClient.get<IProducto>(this.sUrl + "/" + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IProductoPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IProductoPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oUser: IProducto): Observable<IProducto> {
        return this.oHttpClient.post<IProducto>(this.sUrl, oUser);
    }

    updateOne(oUser: IProducto): Observable<IProducto> {
        return this.oHttpClient.put<IProducto>(this.sUrl, oUser);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
    }

    getPageByCompraDesc(size: number | undefined, page: number | undefined): Observable<IProductoPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IProductoPage>(this.sUrl + "/compradesc?size=" + size + "&page=" + page);
    }

    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/empty");
    }


}
