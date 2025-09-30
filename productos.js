
export class producto  {
    #nombre;
    #precio;
    #tiempoPreparacion;
    constructor(nombre, precio, tiempoPreparacion) {
        if(this.constructor === producto){ // clase abstracta
            throw new Error("No puedes instanciar esta clase, porque es una clase Abstracta");
        }

        this.#nombre = nombre;
        this.#precio = precio;
        this.#tiempoPreparacion = tiempoPreparacion;
    }
    info(){
        return `El producto ${this.#nombre} tiene un precio de ${this.#precio} y tiene ${this.#tiempoPreparacion} de tiempo de preparacion`;
    }
    
    get nombre() {
     // Debe retornar el valor de #nombre
        return this.#nombre;
    }
    get precio() {
        // Debe retornar el valor de #precio
        return this.#precio
    }
    get tiempoPreparacion() {
        // Debe retornar el valor de #tiempoPreparacion
        return this.#tiempoPreparacion
    }

        // ACTIVIDAD 2: Implementar estos setters con validaciones
    set precio(nuevoPrecio) {
        if (nuevoPrecio < 0) {
            throw new Error("El precio debe ser mayor a 0");
            return;
        }
        this.#precio = nuevoPrecio;
    }
    set tiempoPreparacion(nuevoTiempo) {
    // VALIDAR: tiempo debe ser mayor a 0
    if (nuevoTiempo < 0) {
        throw new Error("el tiempo de preparacion debe ser mayor a 0    ");
        return;
        
    }
    this.calcularTiempoTotal(cantidad);
        this.#tiempoPreparacion * cantidad;
    
    }
    set nombre(nuevoNombre) {
    
    if (nuevoNombre.trim().length === 0) {
        throw new Error("El nombre no puede estar vacío o solo espacios");
        return;
    }
    this.#nombre = nuevoNombre.trim();
    }


    calcularTiempoTotal(cantidad) {
        return this.#tiempoPreparacion * cantidad;
    }
}

export class Comida extends producto  {
    #ingredientes = [];
    #calorias = 0;
    constructor(nombre, precio, tiempoPreparacion,ingredientes, calorias ) {
        super(nombre, precio, tiempoPreparacion);
        this.#ingredientes = Array.isArray(ingredientes) ? ingredientes : ingredientes.split(",").map(i => i.trim());
        this.#calorias = calorias;
    }
    info(){
        return `${this.nombre} de precio: ${this.precio} con ${this.ingredientes.length} ingredientes y ${this.calorias} calorias`;
    }
    
    get ingredientes() {
        return this.#ingredientes;
    }
    set ingredientes(nuevoIngredientes) {
        if(nuevoIngredientes.length === 0){
            throw new Error("No puedes poner ingredientes vacios");
        }
        this.#ingredientes = nuevoIngredientes;
    }
    get calorias() {
        return this.#calorias;
    }
    set calorias(nuevoCalorias) {
        if (nuevoCalorias < 0) {
            throw new Error("Las calorías deben ser mayores o iguales a 0");
        }
        this.#calorias = nuevoCalorias;
    }

}
export class hamburguesa extends Comida {
    #tamanio;
    constructor(nombre, precio, tiempoPreparacion, ingredientes, calorias, tamanio) {
        super(nombre, precio, tiempoPreparacion, ingredientes, calorias);
        this.#tamanio = tamanio;
    }
    info(){
        return `${super.info()} y tiene un tamaño ${this.#tamanio}`;
    }
    get tamanio() {
        return this.#tamanio;
    }
    set tamanio(nuevoTamanio) {
        if(!nuevoTamanio || nuevoTamanio.trim().length === 0){
            throw new Error("El tamaño no puede estar vacío");
        }
        this.#tamanio = nuevoTamanio.trim();
    }
}

export class pizza extends Comida {
    #tamanio;
    constructor(nombre, precio, tiempoPreparacion, ingredientes, calorias, tamanio) {
        super(nombre, precio, tiempoPreparacion, ingredientes, calorias);
        this.#tamanio = tamanio;
    }
    info(){
        return `${super.info()} y tiene un tamaño ${this.#tamanio}`;
    }
    get tamanio() {
        return this.#tamanio;
    }
    set tamanio(nuevoTamanio) {
        if(!nuevoTamanio || nuevoTamanio.trim().length === 0){
            throw new Error("El tamaño no puede estar vacío");
        }
        this.#tamanio = nuevoTamanio.trim();
    }
}

export class ensalada extends Comida{
    constructor(nombre, precio, tiempoPreparacion, ingredientes, calorias){
        super(nombre, precio, tiempoPreparacion,ingredientes, calorias);

    }
    info(){
        return `${super.info()} y tiene una salsa deliciosa`;
    }
}


export class bebida extends producto {
    #volumen;
    constructor(nombre, precio, volumen) {
        super(nombre, precio);
        this.#volumen = volumen;
    }
    info(){
        return `${this.nombre} de precio ${this.precio} y tiene un volumen de ${this.#volumen}`;
    }
    get volumen() {
        return this.#volumen;
    }
    set volumen(nuevoVolumen) {
        if(nuevoVolumen < 0){
            throw new Error("El volumen no puede ser negativo");
        }
        this.#volumen = nuevoVolumen;
    }
}

export class gaseosa extends bebida {
    #sabor;
    constructor(nombre, precio, volumen, sabor) {
        super(nombre, precio, volumen);
        this.#sabor = sabor;
    }
    info(){
        return `${super.info()} y tiene un sabor ${this.#sabor}`;
    }
    get sabor() {
        return this.#sabor;
    }
    set sabor(nuevoSabor) {
        if (!nuevoSabor || nuevoSabor.trim().length === 0) {
            throw new Error("El sabor no puede estar vacío");
        }
        this.#sabor = nuevoSabor.trim();
    }
}

class jugo extends bebida {
    #fruta;
    constructor(nombre, precio, volumen, fruta) {
        super(nombre, precio, volumen);
        this.#fruta = fruta; // inicializar correctamente
    }
    info() {
        return `${super.info()} y tiene un sabor ${this.#fruta}`;
    }
    get fruta() {
        return this.#fruta;
    }
    set fruta(nuevaFruta) {
        if (!nuevaFruta || nuevaFruta.trim().length === 0) {
            throw new Error("La fruta no puede estar vacía");
        }
        this.#fruta = nuevaFruta.trim();
    }
}

export class agua extends bebida{
    constructor(nombre,precio,volumen) {
        super(nombre,precio,volumen);
    }
    info(){
        return `${super.info()} y tiene un sabor delicioso`
    }
}

// Inicializar productos del menú
export const menuInicial = [
    // Hamburguesas
    new hamburguesa(
    "Hamburguesa Clásica",
    15000,
    12,
    "carne, lechuga, tomate, cebolla, queso",
    650,
    "Mediana"
    ),
    new hamburguesa(
        "Hamburguesa BBQ",
        18000,
        15,
        "carne, tocino, cebolla caramelizada, queso cheddar, salsa BBQ",
        750,
        "Grande"
    ),
    new hamburguesa(
        "Hamburguesa de Pollo",
        16000,
        13,
        "pollo, lechuga, tomate, mayonesa",
        600,
        "Mediana"
    ),

    
    // Pizzas
    new pizza(
    "Pizza Margarita",
    25000,
    18,
    "mozzarella, tomate, albahaca",
    800,
    "Mediana"
    ),
    new pizza(
        "Pizza Pepperoni",
        28000,
        18,
        "mozzarella, pepperoni, orégano",
        900,
        "Grande"
    ),
    new pizza(
        "Pizza Hawaiana",
        27000,
        18,
        "mozzarella, jamón, piña",
        850,
        "Mediana"
    ),

    
    // Ensaladas
    new ensalada(
    "Ensalada César",
    14000,
    8,
    "lechuga romana, pollo, crutones, queso parmesano, aderezo césar",
    350
    ),
    new ensalada(
    "Ensalada Mixta",
    12000,
    6,
    "lechuga, tomate, zanahoria, pepino, maíz",
    250
    ),

    
    // Gaseosas
    new gaseosa("Coca-Cola", 5000, 2, "Cola"),
    new gaseosa("Sprite", 5000, 2, "Lima-Limón"),
    new gaseosa("Fanta", 5000, 2, "Naranja"),

    
    // Jugos
    new jugo("Jugo de Naranja", 7000, 5, "Naranja"),
    new jugo("Jugo de Fresa", 7000, 5, "Fresa"),
    new jugo("Limonada", 6000, 4, "Limón"),

    
    // Agua
    new agua("Agua Mineral", 3000, 1),

];



