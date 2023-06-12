# Leonel Ale
---
## CoderHouse
### Comision 51885 
#### Profesor: Omar Manias
##### Tutor: Fernando Moyano
---

## Tercera entrega:
### DOM y Eventos
### Storage and JSON


### Mostrar Productos del Array
```javascript
productos.forEach((productos, indice)=>{
let card = document.createElement("div");
card.classList.add("card","col-sm-12,","col-md-6","col-lg-3",)
card.innerHTML= 
`<img src="${productos.image}" class="card-img-top" alt="foto producto">
  <div class="card-body">
    <h5 class="card-title"> ${productos.product}</h5>
    <p class="card-text">Precio $ ${productos.price}</p>
    <a href="#carrito-contenido" class="btn btn-secondary" onClick="addCart(${indice})">Agregar al carrito</a>
  </div>
</div>
`

contenedor.appendChild(card) /* // Le asigno al contenedor todas las cards*/ 
});
```
---
### Refresh Storage
```javascript
const refreshStorage= (carrito) => {
    localStorage.setItem("Carrito", JSON.stringify(carrito))
}
```
### Mostrar Carrito
```javascript
const mostrarcarrito = () => {
    carritoContainerDOM.innerHTML = "";
    total = carrito.reduce((acc, el) => acc + el.price * el.cantidad, 0);

    carrito.forEach((producto, indice) => {
      const carritoItemContainer = document.createElement("div");
      carritoItemContainer.classList.add("card","col-sm-12,","col-md-6","col-lg-3");
      carritoItemContainer.innerHTML = `
        <h5 class="product-details">Producto: ${producto.product}</h5>
        <spam class="product-details">Cantidad: ${producto.cantidad}</spam>
        <spam class="product-details">Precio: $ ${producto.price}</spam>
        <spam class="product-details">Subtotal: $ ${
          producto.price * producto.cantidad
        }</spam>
        <button class="btn btn-danger" id="remove" onClick="removeProduct(${indice})">
          Eliminar producto
        </button>
      `;
      carritoContainerDOM.appendChild(carritoItemContainer);
    });
    const totalCompra = document.createElement("div")
        totalCompra.className = "Total-content"
        totalCompra.innerHTML = `Total a pagar $ ${total}`;
        carritoContainerDOM.append(totalCompra)
      
 };
``` 
### Agregar Carrito 
```javascript
function addCart(indice) {
    const productoElegido = carrito.findIndex((e) => {
    return e.id === productos[indice].id;
    } );

    if (productoElegido === -1) {
        const productoAgregado = productos[indice];
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
        refreshStorage(carrito)
        mostrarcarrito(carrito)
    } else {
        carrito[productoElegido].cantidad += 1;
        refreshStorage(carrito)
        mostrarcarrito(carrito)
    }
    
}

```
