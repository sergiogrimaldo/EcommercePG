export function openModal(payload){
    return({type:'OPEN_MODAL', payload})
}

export function closeModal(){
    return({type:'CLOSE_MODAL'})
}