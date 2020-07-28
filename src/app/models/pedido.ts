import { Producto } from '../models/producto';

export class Pedido {
    idOrden: number;
    cantidad: string;
    fechaOrden: string;
    estado: string;
    producto: Producto[];
}
