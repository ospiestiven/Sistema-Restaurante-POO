
import Mesa  from "./mesa.js";
import { menuInicial } from "./productos.js";

export default class SistemaPedidos {
    #mesas;
    #menu;
    #colaPreparacion;
    
    constructor() {
        // Inicializar las 4 mesas
        this.#mesas = [
            new Mesa(1),
            new Mesa(2),
            new Mesa(3),
            new Mesa(4)
        ];
        
        // Inicializar menú con productos
        this.#menu = [...menuInicial];
        
        // Cola de preparación
        this.#colaPreparacion = [];
    }
    
    // metodos publicos
    
    hacerPedido(numeroMesa, indexProducto, cantidad) {
        try {
            // 1. Validar mesa
            const mesa = this.#validarMesa(numeroMesa);
            
            // 2. Validar producto
            if (indexProducto < 0 || indexProducto >= this.#menu.length) {
                throw new Error("Producto no válido");
            }
            
            const producto = this.#menu[indexProducto];
            
            // 3. Validar cantidad
            if (cantidad <= 0) {
                throw new Error("La cantidad debe ser mayor a 0");
            }
            
            // 4. Crear pedido
            const pedido = mesa.agregarPedido(producto, cantidad);
            
            // 5. Actualizar cola de preparación
            this.#actualizarColaPedidos({
                mesa: numeroMesa,
                pedido: pedido,
                tiempo: producto.calcularTiempoTotal(cantidad)
            });
            
            // 6. Retornar confirmación
            return {
                exito: true,
                mensaje: ` Pedido registrado exitosamente`,
                mesa: numeroMesa,
                producto: producto.nombre,
                cantidad: cantidad,
                tiempoEstimado: producto.calcularTiempoTotal(cantidad),
                total: producto.precio * cantidad
            };
            
        } catch (error) {
            return {
                exito: false,
                mensaje: ` Error: ${error.message}`
            };
        }
    }
    //  retorna el estado de preparación de pedidos
    verEstadoPreparacion() {
        let resultado = "\n          ESTADO DE PREPARACIÓN DE PEDIDOS       \n";
        
        
        
        let hayPedidos = false;
        
        this.#mesas.forEach(mesa => {
            if (mesa.cantidadPedidos > 0) {
                hayPedidos = true;
                resultado += mesa.mostrarDetalle();
            }
        });
        
        if (!hayPedidos) {
            resultado += "\n   No hay pedidos en preparación\n";
        }
        
        return resultado;
    }

    //retorna el array de productos del menú
    obtenerMenu() {
        // Retorna una copia del array privado #menu
        // Esto permite ver los productos sin poder modificar el array original directamente
        return this.#menu;
    }
    
    obtenerMesas() {
        return this.#mesas;
    }

    // metos privados
    #validarMesa(numero) {
        // Valida que el número de mesa sea válido (1-4)
        if (numero < 1 || numero > 4) {
            throw new Error("La mesa debe estar entre 1 y 4");
        }
        
        // Retorna la mesa correspondiente (restamos 1 porque el array empieza en 0)
        return this.#mesas[numero - 1];
    }
    #actualizarColaPedidos(nuevoPedido) {
        this.#colaPreparacion.push({
            ...nuevoPedido,
            timestamp: new Date()
        });
    }

    // pagar la cuenta

    pagarCuenta(numeroMesa) {
        try {
            // Validar mesa
            if (isNaN(numeroMesa) || numeroMesa < 1 || numeroMesa > 4) {
                throw new Error("La mesa debe estar entre 1 y 4");
            }
            const mesa = this.#mesas[numeroMesa - 1];

            // Calcular total
            const saldo = mesa.totalCuenta;

            // Limpiar pedidos
            mesa.limpiarMesa();

            return {
                exito: true,
                saldo: saldo
            };
        } catch (error) {
            return {
                exito: false,
                mensaje: error.message
            };
        }
    }

    //admin
        agregarProducto(producto) {
        this.#menu.push(producto);
        return { exito: true, mensaje: "Producto agregado correctamente." };
    }

    modificarProducto(idx, nuevoNombre, nuevoPrecio, nuevoTiempo) {
        if (idx < 0 || idx >= this.#menu.length) {
            return { exito: false, mensaje: "❌ Producto no válido." };
        }
        if (nuevoNombre && nuevoNombre.trim()) this.#menu[idx].nombre = nuevoNombre;
        if (!isNaN(nuevoPrecio)) this.#menu[idx].precio = nuevoPrecio;
        if (!isNaN(nuevoTiempo)) this.#menu[idx].tiempoPreparacion = nuevoTiempo;
        return { exito: true, mensaje: "✅ Producto modificado correctamente." };
    }

    eliminarProducto(idx) {
        if (idx < 0 || idx >= this.#menu.length) {
            return { exito: false, mensaje: "❌ Producto no válido." };
        }
        const eliminado = this.#menu.splice(idx, 1);
        return { exito: true, mensaje: `✅ Producto "${eliminado[0].nombre}" eliminado correctamente.` };
    }
}
// ...existing code...





    // estado de preparación de pedidos



