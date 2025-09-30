# Sistema-Restaurante-POO
Este proyecto es una aplicación de consola en Node.js que simula un sistema de gestión de pedidos para un restaurante. Permite tomar pedidos, ver el estado de preparación, pagar cuentas y administrar el menú de productos de manera sencilla.

Estructura de Archivos

restaurante.js
Archivo principal. Inicia el sistema y gestiona el flujo del menú principal.

menuPrincipal.js
Contiene la lógica de interacción con el usuario, los menús y las funciones para hacer pedidos, ver estados, pagar cuentas y administrar productos.

sisPedidos.js
Implementa la clase SistemaPedidos, que maneja la lógica central del sistema: gestión de mesas, pedidos y administración del menú.

mesa.js
Define la clase Mesa, que representa cada mesa del restaurante y sus pedidos.

productos.js
Define las clases de productos (producto, Comida, hamburguesa, pizza, ensalada, bebida, etc.) y el menú inicial del restaurante.

package.json
Archivo de configuración de Node.js para el proyecto.
