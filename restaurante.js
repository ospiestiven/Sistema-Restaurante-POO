import SistemaPedidos from './sisPedidos.js';
import {
    mostrarMenuPrincipal,
    hacerPedido,
    verEstado,
    pagarCuenta,
    modoAdministrador,
    cerrarInterfaz,
    pregunta
} from'./menuPrincipal.js';

// Inicializar sistema
const sistema = new SistemaPedidos();

async function ejecutarSistema() {
    console.log("\n ¡Bienvenido al Sistema de Pedidos del Restaurante!\n");
    
    let continuar = true;
    
    while (continuar) {
        mostrarMenuPrincipal();
        
        const opcion = await pregunta(" Seleccione una opción: ");
        
        switch (opcion) {
            case '1':
                await hacerPedido(sistema);
                break;
                
            case '2':
                await verEstado(sistema);
                break;
                
            case '3':
                await pagarCuenta(sistema);
                break;
                
            case '4':
                await modoAdministrador(sistema);
                break;
                
            case '5':
                console.log("\n Gracias por usar el sistema. ¡Hasta pronto!\n");
                continuar = false;
                cerrarInterfaz();
                break;
                
            default:
                console.log("\n Opción no válida. Por favor intente nuevamente.");
        }
    }
}

// Ejecutar el sistema
ejecutarSistema().catch(error => {
    console.error(" Error crítico:", error);
    cerrarInterfaz();
});
