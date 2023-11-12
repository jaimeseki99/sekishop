import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { API_URL } from "src/environment/environment";
import { IToken, SessionEvent } from "../model/model.interfaces";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SessionAjaxService {
    sUrl: string = API_URL + "/sesion";

    subjectSession = new Subject<SessionEvent>();

    constructor(
        private oHttpClient: HttpClient
    ) {}

    private parseJwt(token: string): IToken {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {

        }).join(''));

        return JSON.parse(jsonPayload);
    }

    login(sUsername: string, sContrasenya: string): Observable<string> {
        return this.oHttpClient.post<string>(this.sUrl, { username: sUsername, contrasenya: sContrasenya});
    }

    setToken(sToken: string): void {
        localStorage.setItem('token', sToken);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isSessionActive(): Boolean {
        return this.getToken() != null;
    }

    getUsername(): string {
        if (this.isSessionActive()) {
            let token: string | null = localStorage.getItem('token');
            if (!token) {
                return "";
            } else {
                return this.parseJwt(token).name;
            }
        } else {
            return "";
        }
    }

    on(): Observable<SessionEvent> {
        return this.subjectSession.asObservable();
    }

    emit(event: SessionEvent) {
        this.subjectSession.next(event);
    }
}