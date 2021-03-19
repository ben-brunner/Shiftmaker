export default function note(notesList = [], action){
    if(action.type === 'saveNotes'){
        return action.notes
    } else if(action.type === 'deleteNotes'){
        var notesCopy = [...notesList]
        var position = null
        for (let i = 0; i < notesCopy.length; i++) {
            if(notesCopy[i]._id === action.idNote){
                position = i
            } 
        }

        if(position != null){
            notesCopy.splice(position, 1)
        }

        return notesCopy

    }else if(action.type === 'addNotes'){
        var notesListCopy = [...notesList]

        var findNote = false

        for (let i = 0; i < notesListCopy.length; i++) {
            if(notesListCopy[i].title === action.noteInput.title && notesListCopy[i].content === action.noteInput.content ){
                findNote = true
            }   
        }

        if(!findNote){
            notesListCopy.push(action.noteInput)
        }
        return notesListCopy 
    }else{
        return notesList
    }
}