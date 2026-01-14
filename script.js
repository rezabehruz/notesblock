
// #region Variables
const btnNewNote = document.getElementById("btn-new-note");
const newNotSection = document.getElementById("new-note");
const newNoteForm = document.getElementById("new-note-form");
const normalNoteSection = document.getElementById("normal-note-content");
const archiveNoteSection = document.getElementById("archive-note-content");
const trashNoteSection = document.getElementById("trash-note-content");
const archiveNoteTitle = document.getElementById("archive-title");
const trashNoteTitle = document.getElementById("trash-title");
const editDialogRef = document.getElementById("edit-dialog");
const editNoteForm = document.getElementById("edit-note-form");


// #endregion


// #region Local Storage

const localNotes = localStorage.getItem("localNotes");
let notes = JSON.parse(localNotes);

if(notes == null){
    notes = [
             ["Gym", "Bizeps und Rücken trainieren.", "normal", "normal"],
             ["Unterrichtszeiten", "ab 09:15 bis 10:00 Mo-Frei", "normal", "normal"],
             ["Tee trinken", "von Lidl Tee kaufen.", "normal", "normal"],
             ["Unterrichtszeiten", "ab 09:15 bis 10:00 Mo-Frei", "archive","normal"],
             ["Gym", "Bizeps und Rücken trainieren.", "archive", "trash"],
             ["Biliard spielen", "Freunde kontaktieren", "trash", "normal"],
             ["Fußball spielen", "Freunde kontaktieren", "trash", "archive"],
           ];
}

function updateLocalStorage(){
   const jsonNotes = JSON.stringify(notes);
   localStorage.setItem("localNotes", jsonNotes);
}

 document.body.onclick = function(){
    this.style.overflow = "visible";
 }
// #endregion


// #region CRUID Methods

btnNewNote.onclick = function(){
    newNotSection.style.display = "flex";
    this.style.display = "none";
}

/** 
 * New Note adds to Notes Array
 */

newNoteForm.addEventListener("submit" , function (event){
event.preventDefault();

const title = newNoteForm.elements[0].value;
const description = newNoteForm.elements[1].value;

notes.unshift([title, description, "normal", "normal"]);

updateLocalStorage();

this.reset();
newNotSection.style.display = "none";
btnNewNote.style.display = "block";
renderNotes();

});



/**
 * Render Notes to HTML page.
 */

function renderNotes(){
    normalNoteSection.innerHTML = "";
    archiveNoteSection.innerHTML = "";
    trashNoteSection.innerHTML = "";
    archiveNoteTitle.style.display = "none";
    trashNoteTitle.style.display = "none";

    for(let i = 0; i < notes.length; i++){
        if(notes[i][2] == "normal"){
            normalNoteSection.innerHTML += renderNormalNote(i);
        }
        else if (notes[i][2] == "archive"){
            archiveNoteTitle.style.display = "block";
            archiveNoteSection.innerHTML += renderArchiveNote(i);
            
        }
        else {
            trashNoteTitle.style.display = "block";
            trashNoteSection.innerHTML += renderTrashNote(i);
        }
    }
}


/**
 * Archive Note: change type of note to archive.
 */

function archiveNote(i){
    notes[i][2] = "archive";
    updateLocalStorage();
    renderNotes();
}

/**
 * Render Edit Note Dialog
 */
function renderEditDialog(event,i){
    event.stopPropagation();
    editNoteForm.elements[0].value = notes[i][0];
    editNoteForm.elements[1].value = notes[i][1];
    editNoteForm.elements[2].value = i;
    
    document.body.style.overflow = "hidden";    
    editDialogRef.showModal();
  
}

/**
 * Edit Note: edit Title and Description of note.
 */
editNoteForm.addEventListener("submit", function(event){
    const newtitle = editNoteForm.elements[0].value;
    const newDescription=  editNoteForm.elements[1].value;
    const noteIndex = editNoteForm.elements[2].value;
    
    notes[noteIndex][0] = newtitle;
    notes[noteIndex][1] = newDescription;

    updateLocalStorage();

    this.reset();
    document.body.style.overflow = "visible";

    renderNotes();

})

/** 
 * close Edit Dialog 
*/
function closeDialog(event){
    event.preventDefault();
    document.body.style.overflow = "visible";
    editDialogRef.close();
}

/**
 * Move Notes to Trash: Type of note changes to "trash"
 */

function moveToTrash(i){
    if(notes[i][2] == "normal"){
        notes[i][3] = notes[i][2];
        notes[i][2] = "trash";
        }
    else if (notes[i][2] == "archive"){
        notes[i][3] = notes[i][2];
        notes[i][2] = "trash";
    }

    updateLocalStorage();

    renderNotes();
}


/**
 * Delete Note from Trash: delete Note from notes Array. 
 */

function deleteNote(i){
    notes.splice(i,1);
    updateLocalStorage();
    renderNotes();
}

/**
 * Move Note back to last Type
 */

function moveBack(i){
    
    if(notes[i][2] == "archive"){
        notes[i][3] = notes[i][2];
        notes[i][2] = "normal";
    }
    else if (notes[i][3] == "normal"){
        notes[i][3] = notes[i][2];
        notes[i][2] = "normal";
    }
    else if(notes[i][3] == "archive") {
        notes[i][3] = notes[i][2];
        notes[i][2] = "archive";
    }
    else if (notes[i][3] == "trash"){
        notes[i][3] = notes[i][2];
        notes[i][2] = "trash";
    }
    else console.log("Fehler !!");

    updateLocalStorage();

    renderNotes();
 
}

// #endregion
