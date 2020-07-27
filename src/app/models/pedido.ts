import { Producto } from '../models/producto';

export class Pedido {
    id: number;
    cantidad: string;
    fechaOrden: string;
    estado: string;
    producto: Producto[];
}
