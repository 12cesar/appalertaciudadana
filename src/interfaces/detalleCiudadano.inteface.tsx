// Generated by https://quicktype.io

export interface ResultDetalleCiudadano {
    ok:               boolean;
    msg:              string;
    detalleCiudadano: DetalleCiudadano;
    ciudadano:        Ciudadano;
}

export interface Ciudadano {
    id:       number;
    dni:      string;
    nombre:   string;
    apellido: string;
    password: string;
    estado:   number;
}

export interface DetalleCiudadano {
    id:           number;
    celular:      string;
    correo:       string;
    imagen:       string | null;
    id_ciudadano: number;
    Ciudadano:    Ciudadano | null;
}