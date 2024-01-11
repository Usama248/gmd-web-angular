/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface IApiBaseActions {
    get(url: string): Observable<any>;
    post(url: string, data: any): Observable<any>;
    delete(url: string, id: any): Observable<any>;
    put(id: any, data: any): Observable<any>;
}

@Injectable({
    providedIn: 'root',
})
export class ApiHandler implements IApiBaseActions {
    constructor(private myHttpClient: HttpClient) { }

    handleResponse(response: any) {
        if (response?.Status === 500) {
            console.log(response);
        }
    }
    get(url: string) {
        return this.myHttpClient
            .get<any>(url)
            .pipe(tap((x: any) => this.handleResponse(x)));
    }
    getById(url: string, id: any) {
        url = `${url}${id}`;
        return this.myHttpClient
            .get<any>(url)
            .pipe(tap((x: any) => this.handleResponse(x)));
    }
    post(url: string, data: any) {
        return this.myHttpClient
            .post<any>(url, data)
            .pipe(tap((x: any) => this.handleResponse(x)));
    }

    delete(url: string, id: any) {
        url = `${url}${id}`;
        return this.myHttpClient
            .delete<any>(url)
            .pipe(tap((x: any) => this.handleResponse(x)));
    }

    deleteById(url: string, id: any) {
        return this.myHttpClient
            .delete<any>(url, {
                params: {
                    id: id
                }
            })
            .pipe(tap((x: any) => this.handleResponse(x)));
    }

    put(url: string, data: any) {
        return this.myHttpClient
            .put<any>(url, data)
            .pipe(tap((x: any) => this.handleResponse(x)));
    }

    update(id: any, data: any, url: string = '') {
        url = `${url}?id=${id}`;
        return this.myHttpClient
            .put<any>(url, data)
            .pipe(tap((x: any) => this.handleResponse(x)));
    }
    getByParameteres(url: string, params: HttpParams) {
        url = `${url}`;
        return this.myHttpClient
            .get<any>(url, { params })
            .pipe(tap((x: any) => this.handleResponse(x)));
    }
}
