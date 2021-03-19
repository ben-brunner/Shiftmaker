export default function(idUser = "", action) {
    if(action.type === 'addIdUser'){
        return action.user
    } else if (action.type === 'logout' ) {
        
        return action.user 
    } else {
        return idUser
    }
};