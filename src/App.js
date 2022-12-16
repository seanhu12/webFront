
import './App.css';
import React,{useEffect,useState} from 'react';


import {Table,Button,Icon,Modal} from "semantic-ui-react"
import {map} from "lodash";
import axios from 'axios';


function App() {

  const [bolet,setbolet] = useState([])
  const [boletSelec,setboletSelect] = useState([])

  const [pedido,setPedido] = useState([])
  const [pedidoSelect,setPedidoSelect] = useState([])
  const [product,setProduct] = useState([])
  const [open, setOpen] = React.useState(false)

  
 
  
  const url1 = "http://192.168.1.117:8000/api"

  useEffect(()=>{
    (async () => {
     await getBoletaaApi()
     await getPedidosApi()
     await  getProducgApi()

      
    })()
  },[])


  async function getBoletaaApi(){
    try {
       const url = `${url1}/boletas/`;    
        const response = await fetch(url);
        const result = await response.json();
        setbolet(result)
        
    } catch (error) {
        throw error;
    }
  }

  async function getPedidosApi(){
  try {
     const url = `${url1}/pedidos/`;    
      const response = await fetch(url);
      const result = await response.json();
      setPedido(result)  
  } catch (error) {
      throw error;
  }
  }
  async function getProducgApi(){
    try {
      const url = `${url1}/products/`;    
        const response = await fetch(url);
        const result = await response.json();
        setProduct(result)
        
    } catch (error) {
        throw error;
    }
  }

  function filter(id){
    setOpen(true)
    const array = []
    const array2 = []

  
    for (let i = 0; i < pedido.length; i++) {

      if(pedido[i].boleta_id == id){
        array.push({
          product_id: pedido[i].product_id,
          cant: pedido[i].cant

        })
        
      }
    }

    for (let i = 0; i < product.length; i++) {
      for (let j = 0; j < array.length; j++) {

         if(product[i].id == array[j].product_id){
            array2.push({
              name: product[i].name,
              price: product[i].price,
              cant: array[j].cant
            })
         }
      }
      
    }
    setPedidoSelect(array2)
    console.log(array2);


    
    

  }

  return (
    <div>
                <Table >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell> ID Boleta</Table.HeaderCell>
                    <Table.HeaderCell> MESA </Table.HeaderCell>
                    <Table.HeaderCell> PRODUCTOS</Table.HeaderCell>
                    <Table.HeaderCell> TOTAL</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    

                </Table.Row>

            </Table.Header>

            <Table.Body>
                {map(bolet, (bolet) => (
                    <Table.Row key={bolet.id}>
                        <Table.Cell >
                            {bolet.id}
                        </Table.Cell>
                        <Table.Cell >
                            {bolet.table_id}
                        </Table.Cell>
                        <Table.Cell >
                        <Button icon onClick={() =>   filter(bolet.id) } >
                            <Icon name='pencil' />
                        </Button>
                          

                        </Table.Cell>
                        <Table.Cell >
                          {bolet.total}
                        </Table.Cell>
                        <Action bolet ={bolet} />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>

        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
         size='small'
                          >
          <Modal.Content>
                <div>
                  {map(pedidoSelect,(product,index) => (
                    <h1> nombre: {product.name} / precio: {product.price} / cantidad: {product.cant} </h1>
                  ))}
                </div>
            </Modal.Content>
            <Modal.Actions>
            <Button color='green' inverted onClick={() => setOpen(false) }>
            <Icon name='checkmark' /> Yes
            </Button>
            </Modal.Actions>
            </Modal>                                
                  
    </div>    
  );

}

function Action(props){
  const {bolet} = props
  return(
      <Table.Cell textAlign='right' >
          <Button icon onClick={() => console.log("Atender")} >
              <Icon name='pencil' />
          </Button>
          <Button icon negative onClick={() => console.log("Eliminar")} >
              <Icon name='close' />
          </Button>

      </Table.Cell>
  )
}

export default App;
