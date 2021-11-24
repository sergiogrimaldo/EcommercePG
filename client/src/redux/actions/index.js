export function openModal(payload){
    return({type:'OPEN_MODAL', payload})
}

export function closeModal(){
    return({type:'CLOSE_MODAL'})
}

export function getShoes() {
    return async function(dispatch){
  await fetch('http://localhost:3000/allShoes.json').then((res) => res.json()).then((response) =>{dispatch({ type: "GET_SHOES" , payload: response})})}
}