// Creo las variables del contenedor por ID
const contenedor = document.getElementById("container")
const carritoContainerDOM = document.getElementById("carrito-modal");
let total = 0

// Funcion para actualizar el storage
const refreshStorage= (carrito) => {
    localStorage.setItem("Carrito", JSON.stringify(carrito))
}

 // Funcion para borrar producto
 const removeProduct = (indice) => {
    const productoChosen = carrito[indice];
    if (productoChosen) {
      carrito.splice(indice, 1);
      refreshStorage(carrito);
      mostrarcarrito(carrito);
      const totalCompra = document.querySelector(".Total-content")
      if (totalCompra) {
        totalCompra.innerHTML = `Total a Pagar $ ${total}`
      }
    }
  };

// Funcion para mostrar el carrito en el DOM
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
  

// Por cada producto, que me cree una tarjeta de boostrap
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


// Aray vacio de carrito
let carrito = [];
// Guardo el carrito en el local storage, cosa que si salen, sigue estando el carrito
if (localStorage.getItem("Carrito")) {
    const carritoStorage = localStorage.getItem("Carrito");
    if (carritoStorage) {
    carrito = JSON.parse(carritoStorage);
    }
    mostrarcarrito(carrito);

}

//Pusheo el carrito - chequeo si ya esta el producto
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

const emailButton = document.getElementById("btn-comprar");
emailButton.addEventListener("click", async () => {
  const { value: email } = await Swal.fire({
    title: 'Completar correo electronico',
    input: 'email',
    inputLabel: 'Tu correo electronico',
    inputPlaceholder: 'Ingrese tu correo electronico',
  });
  
  if (email) {
    Swal.fire(`Factura enviada a: ${email}`);
  }
});







