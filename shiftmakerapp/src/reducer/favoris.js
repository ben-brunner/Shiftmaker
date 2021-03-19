export default function(favorisList = [], action){
    if(action.type === 'saveFavoris'){
        return action.favorisActivites
    } else if(action.type === 'deleteFavoris'){
        var favorisCopy = [...favorisList]

        var position = null

        for (let i = 0; i < favorisCopy.length; i++) {
            if(favorisCopy[i]._id == action.idFavoris){
                position = i
            } 
        }

        if(position !== null){
            favorisCopy.splice(position, 1)
        }

        return favorisCopy

    } else if (action.type === 'addToFav') {
        if (!favorisList.includes(action.fiche)) {
            const favorisCopy = [...favorisList, action.fiche];
            return favorisCopy
        } else {
            return favorisList
        }
    } else {
        return favorisList
    }   
}