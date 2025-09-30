import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para hacer preguntas y retornar promesas
export function pregunta(texto) {
    return new Promise((resolve) => {
        rl.question(texto, (respuesta) => {
            resolve(respuesta);
        });
    });
}
export async function esperarContinuar() {
    await pregunta("\n Presione Enter para continuar...");
}

export function mostrarMenuPrincipal() {
    console.log("   SISTEMA DE PEDIDOS RESTAURANTE              ");
    console.log("│                                                │");
    console.log("│  1. Hacer un pedido                            │");
    console.log("│  2. Ver estado de preparación de los pedidos   │");
    console.log("│  3. Pagar la cuenta                            │");
    console.log("│  4. Modo administrador                         │");
    console.log("│  5. Salir del sistema                          │");
    console.log("│                                                │");

}

export function mostrarMenuAdministrador() {
    console.log("        MODO ADMINISTRADOR                    ");
    console.log("|                                                |");
    console.log("| 1. Agregar un producto nuevo                   |");
    console.log("|  2. Modificar un producto existente            |");
    console.log("|  3. Eliminar un producto                       |");
    console.log("|  4. Volver al menú principal                   |");


}

export function mostrarMenu(sistema) {
    console.log("                   MENÚ DE PRODUCTOS                               \n");
    const menu = sistema.obtenerMenu();
    menu.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.info()}`);
        console.log("");
    });
    console.log("────────────────────────────────────────────────────────────────────────\n");
}

export async function hacerPedido(sistema) {
    console.log("           HACER UN PEDIDO                     ");  
    try {
        // 1. Seleccionar mesa
        let mesaValida = false;
        let numeroMesa;
        
        while (!mesaValida) {
            const respuestaMesa = await pregunta(" Seleccione el número de mesa (1-4): ");
            numeroMesa = parseInt(respuestaMesa);
            
            if (numeroMesa >= 1 && numeroMesa <= 4) {
                mesaValida = true;
                console.log(` Mesa ${numeroMesa} seleccionada\n`);
            } else {
                console.log(" Error: La mesa debe estar entre 1 y 4. Intente nuevamente.\n");
            }
        }
        
        // 2. Mostrar menú de productos
        mostrarMenu(sistema);
        
        // 3. Seleccionar producto
        let productoValido = false;
        let indexProducto;
        const menu = sistema.obtenerMenu();
        
        while (!productoValido) {
            const respuestaProducto = await pregunta(` Seleccione el producto (1-${menu.length}): `);
            indexProducto = parseInt(respuestaProducto) - 1;
            
            if (indexProducto >= 0 && indexProducto < menu.length) {
                productoValido = true;
                console.log(` Producto seleccionado: ${menu[indexProducto].nombre}\n`);
            } else {
                console.log("Error: Opción no válida. Intente nuevamente.\n");
            }
        }
        
        // 4. Seleccionar cantidad
        let cantidadValida = false;
        let cantidad;
        
        while (!cantidadValida) {
            const respuestaCantidad = await pregunta(" Ingrese la cantidad: ");
            cantidad = parseInt(respuestaCantidad);
            
            if (cantidad > 0) {
                cantidadValida = true;
            } else {
                console.log(" Error: La cantidad debe ser mayor a 0. Intente nuevamente.\n");
            }
        }
        
        // 5. Registrar el pedido
        const resultado = sistema.hacerPedido(numeroMesa, indexProducto, cantidad);
        
    if (resultado.exito) {
        console.log("\n=== PEDIDO CONFIRMADO ===");
        console.log(`Mesa: ${resultado.mesa}`);
        console.log(`Producto: ${resultado.producto}`);
        console.log(`Cantidad: ${resultado.cantidad}`);
        console.log(`Subtotal: $${resultado.total}`);
        console.log(`Tiempo estimado: ${resultado.tiempoEstimado} minutos`);
        console.log("==========================\n");
        console.log(resultado.mensaje);
    } else {
        console.log(resultado.mensaje);
    }

        
    } catch (error) {
            console.log(`Error inesperado: ${error.message}`);
        }
    
    await esperarContinuar();
    
}
// funcion para ver el estado de preparación de pedidos
export async function verEstado(sistema) {
    console.log(sistema.verEstadoPreparacion());
    await esperarContinuar();
}
// pagar la cuenta
export async function pagarCuenta(sistema) {
    console.log("\n--- PAGAR LA CUENTA ---");

    try {
        const resMesa = await pregunta("Seleccione la mesa (1-4): ");
        const numeroMesa = parseInt(resMesa);

        const resultado = sistema.pagarCuenta(numeroMesa);

        if (resultado && resultado.exito) {
            console.log(" Pago exitoso");
            console.log(` Total pagado: $${resultado.saldo}\n`);
            console.log(" Los pedidos de la mesa han sido limpiados.");
        } else {
            console.log(" No se pudo pagar la cuenta:", resultado.mensaje);
        }

    } catch (error) {
        console.log(" Error inesperado:", error.message);
    }
    await esperarContinuar();
}

// admin
export async function modoAdministrador(sistema) {
    console.log("\n");
    console.log("        MODO ADMINISTRADOR                    ");

    const clave = await pregunta(" Ingrese la clave de acceso (1234): ");
    if (clave !== "1234") {
        console.log("Error: Clave incorrecta. Intente nuevamente.");
        await esperarContinuar();
        modoAdministrador(sistema);
        return;
    } 
    console.log("Acceso correcto. Bienvenido al modo administrador.\n");
    let continuar = true;
    while (continuar) {
        mostrarMenuAdministrador();
        const opcion = await pregunta(" Seleccione una opción: ");
        
        switch (opcion) {
            case '1':
                await agregarProducto(sistema);
                break;
            case '2':
                await modificarProducto(sistema);
                break;
            case '3':
                await eliminarProducto(sistema);
                break;
            case '4':

                console.log("\n Regresando al menú principal.\n");
                continuar = false;
                break;
            default:
                console.log(" Opción no válida. Por favor intente nuevamente.");
                await esperarContinuar();
                modoAdministrador(sistema);
                
                break;
        }
    }
}
// ...existing code...

export async function agregarProducto(sistema) {
    console.log("\n--- AGREGAR PRODUCTO ---");
    const nombre = await pregunta("Nombre del producto: ");
    const precio = parseFloat(await pregunta("Precio: "));
    const tiempo = parseInt(await pregunta("Tiempo de preparación (min): "));
    const nuevo = {
        nombre,
        precio,
        tiempoPreparacion: tiempo,
        info() { return `${this.nombre} - $${this.precio} - ${this.tiempoPreparacion} min`; }
    };
    const res = sistema.agregarProducto(nuevo);
    console.log(res.mensaje);
    await esperarContinuar();
}

export async function modificarProducto(sistema) {
    console.log("\n--- MODIFICAR PRODUCTO ---");
    const menu = sistema.obtenerMenu();
    if (menu.length === 0) {
        console.log("⚠️ No hay productos para modificar.");
        await esperarContinuar();
        return;
    }
    menu.forEach((p, i) => {
        console.log(`${i + 1}. ${p.info ? p.info() : `${p.nombre} - $${p.precio}`}`);
    });
    const idx = parseInt(await pregunta("Seleccione el producto a modificar: ")) - 1;
    if (idx < 0 || idx >= menu.length) {
        console.log("Producto no válido.");
        await esperarContinuar();
        return;
    }
    const nuevoNombre = await pregunta(`Nuevo nombre (${menu[idx].nombre}): `);
    const nuevoPrecio = parseFloat(await pregunta(`Nuevo precio (${menu[idx].precio}): `));
    const nuevoTiempo = parseInt(await pregunta(`Nuevo tiempo (${menu[idx].tiempoPreparacion}): `));
    const res = sistema.modificarProducto(idx, nuevoNombre, nuevoPrecio, nuevoTiempo);
    console.log(res.mensaje);
    await esperarContinuar();
}

export async function eliminarProducto(sistema) {
    console.log("\n--- ELIMINAR PRODUCTO ---");
    const menu = sistema.obtenerMenu();
    if (menu.length === 0) {
        console.log("No hay productos para eliminar.");
        await esperarContinuar();
        return;
    }
    menu.forEach((p, i) => {
        console.log(`${i + 1}. ${p.info ? p.info() : `${p.nombre} - $${p.precio}`}`);
    });
    const idx = parseInt(await pregunta("Seleccione el producto a eliminar: ")) - 1;
    const res = sistema.eliminarProducto(idx);
    console.log(res.mensaje);
    await esperarContinuar();
}

// ...existing code...

export async function cerrarInterfaz() {
    rl.close();
}

