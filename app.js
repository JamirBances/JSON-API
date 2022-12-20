let newArray = [
  { id: 1, 
    title: "Casa", 
    description: "Limpiar sala y comedor", 
    status: true 
  },
  {
    id: 3,
    title: "Comprar",
    description: "Pan, galletas y aceite de olvida",
    status: true,
  }
];

const index = newArray.findIndex(e => {
  return e.id === 1
});
/* newArray.splice(index, 1, {...newArray, newArray[index].status = false});
 */


newArray[index].status = false;

console.log(newArray);