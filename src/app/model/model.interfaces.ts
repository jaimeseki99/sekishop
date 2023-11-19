import { HttpErrorResponse } from "@angular/common/http";

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IPage<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;

    strSortField: string;
    strSortDirection: string;
    strFilter: string;
    strFilteredTitle: string;
    strFilteredMessage: string;
    nRecords: number;
}

export interface IEntity {
    id: number;
}

export interface IUsuario extends IEntity {
    nombre: string,
    apellido: string,
    username: string,
    email: string,
    direccion: string,
    telefono: string,
    saldo: number,
    rol: boolean,
    compras: number
}

export interface IUsuarioPage extends IPage<IUsuario> {
}

export interface IProducto extends IEntity {
    nombre: string,
    categoria: string,
    stock: number,
    precio: number,
    descripcion: string,
    compras: number
}

export interface IProductoPage extends IPage<IProducto> {
}

export interface ICompra extends IEntity {
    cantidad: number,
    coste: number,
    fecha: Date,
    usuario: IUsuario,
    producto: IProducto
}

export interface ICompraPage extends IPage<ICompra> {
}

export type formOperation = 'EDIT' | 'NEW';

export interface SessionEvent {
    type: string;
}

export interface IToken {
    jti: string;
    iss: string;
    iat: number;
    exp: number;
    nombre: string;
    rol: boolean;
}