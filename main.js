const carrito = document.getElementById('carrito');
const template = document.getElementById('template');
const footer = document.getElementById('footer');
const templateFooter = document.getElementById('templateFooter');
const fragment = document.createDocumentFragment();

document.addEventListener('click',e => {

    
    if (e.target.matches(".card .btn-outline-primary")) {	
        agregarAlCarrito(e)
    }
    
    if (e.target.matches(".list-group-item .btn-success")) {
        btnAumentar(e)
    }

    if (e.target.matches(".list-group-item .btn-danger")) {
        bntDisminuir(e)
    }
    
});


let carritoObjetos = []

const agregarAlCarrito = (e) => {

const producto = {
    titulo: e.target.dataset.comida,
    id: e.target.dataset.comida,
    cantidad: 1,
    precio: parseInt( e.target.dataset.precio)
    };
   
    const indice = carritoObjetos.findIndex(item => item.id === producto.id);

   
    if (indice === -1) {
        carritoObjetos.push(producto)
    } else {
        carritoObjetos[indice].cantidad ++;
        
    }

    pintarCarrito()
    

};






const pintarCarrito = () =>{

    carrito.textContent = "";

    carritoObjetos.forEach((item) => {
        const clone= template.content.cloneNode(true);
        clone.querySelector(".text-white .lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent = item.precio * item.cantidad;

        clone.querySelector(".btn-danger").dataset.id = item.id;
        clone.querySelector(".btn-success").dataset.id = item.id;

        fragment.appendChild(clone)
    })
    carrito.appendChild(fragment)

    pintarFooter()
};

const pintarFooter = () => {
    footer.textContent = "";

    const total = carritoObjetos.reduce(
        (acc , current) => acc + current.cantidad * current.precio, 0
    );

    
    
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("span").textContent = total;
    footer.appendChild(clone)



};

const btnAumentar = (e) => {

    carritoObjetos = carritoObjetos.map(item => {
        if (item.id === e.target.dataset.id) {
            item.cantidad ++;
        }
        return item;
    })
    pintarCarrito()

};

const bntDisminuir = (e) => {

    carritoObjetos = carritoObjetos.filter((item) => {
        if (item.id === e.target.dataset.id) {
            if(item.cantidad > 0){
                item.cantidad --;
            if(item.cantidad === 0) return;
                return item;
            }
        }else{
            return item;
        }
    })
    pintarCarrito()



};
