import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/environment/environment";
import { IUsuario, IUsuarioPage } from "../model/model.interfaces";

@Injectable()
export class UsuarioAjaxService {

    sUrl: string = API_URL + "/usuario";

    constructor(
        private oHttpClient: HttpClient
    ) {

    }

    getOne(id: number): Observable<IUsuario> {
        return this.oHttpClient.get<IUsuario>(this.sUrl + "/" + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IUsuarioPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IUsuarioPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oUsuario: IUsuario): Observable<IUsuario> {
        return this.oHttpClient.post<IUsuario>(this.sUrl, oUsuario);
    }

    updateOne(oUsuario: IUsuario): Observable<IUsuario> {
        return this.oHttpClient.put<IUsuario>(this.sUrl, oUsuario);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate" + amount, null);
    }

    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/empty");
    }
}