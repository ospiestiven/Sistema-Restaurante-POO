// models/Mesa.js
export default class Mesa {
    #numero;
    #pedidos;
    #ocupada;
    
    constructor(numero) {
        this.#numero = numero;
        this.#pedidos = [];
        this.#ocupada = false;
    }
    
    // Getters
    get numero() {
        return this.#numero;
    }
    
    get pedidos() {
        return this.#pedidos;
    }
    
    get ocupada() {
        return this.#ocupada;
    }
    
    // Getters calculados
    get totalCuenta() {
        return this.#pedidos.reduce((total, pedido) => {
            return total + (pedido.producto.precio * pedido.cantidad);
        }, 0);
    }
    
    get estadoMesa() {
        if (this.#pedidos.length === 0) {
            return "Libre";
        }
        
        const todosListos = this.#pedidos.every(p => p.estado === 'listo');
        if (todosListos) {
            return "Listo para pagar";
        }
        
        return "Ocupada";
    }
    
    get cantidadPedidos() {
        return this.#pedidos.length;
    }
    
    get tiempoPreparacionTotal() {
        return this.#pedidos.reduce((total, pedido) => {
            return total + pedido.producto.calcularTiempoTotal(pedido.cantidad);
        }, 0);
    }
    
    // Métodos públicos
    agregarPedido(producto, cantidad) {
        const pedido = {
            producto: producto,
            cantidad: cantidad,
            estado: 'en preparación',
            timestamp: new Date()
        };
        
        this.#pedidos.push(pedido);
        this.#ocupada = true;
        
        return pedido;
    }
    
    limpiarMesa() {
        this.#pedidos = [];
        this.#ocupada = false;
    }
    
    mostrarDetalle() {
        if (this.#pedidos.length === 0) {
            return `Mesa ${this.#numero}: Sin pedidos`;
        }

        let detalle = `\n--- MESA ${this.#numero} (${this.estadoMesa.toUpperCase()}) ---\n`;

        this.#pedidos.forEach((pedido, index) => {
            const subtotal = pedido.producto.precio * pedido.cantidad;
            detalle += `${index + 1}. ${pedido.producto.nombre}\n`;
            detalle += `   Cantidad: ${pedido.cantidad}x - Subtotal: $${subtotal}\n`;
        });

        detalle += `\nTOTAL: $${this.totalCuenta}\n`;
        detalle += `Tiempo estimado: ${this.tiempoPreparacionTotal} min\n`;

        return detalle;
    }

}

