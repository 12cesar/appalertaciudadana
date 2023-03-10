// Generated by https://quicktype.io

export interface ResultTipoAlerta {
    ok:         boolean;
    msg:        string;
    tipoalerta: Tipoalerta[];
}

export interface Tipoalerta {
    id:          number;
    nombre:      string;
    opcion_foto: number;
    icono:       string;
    img:         string;
    color:       string;
    estado:      number;
    OpcionFoto:  OpcionFoto;
}

export interface OpcionFoto {
    id:     number;
    nombre: string;
}
