let notes = [];


function addNote() {
    let titleInput = $("#titleInput").val();
    let textInput = $("#noteField").val();
    
    
    if (titleInput.length > 0 && textInput.length > 0) {

        let note = {
            title: titleInput,
            text: textInput
        }

        notes.push(note);
        addNoteToDB(note);
        
    } else {
        alert("Please enter title and text.");
    }

    renderList();
    renderTitleList();
}

async function addNoteToDB(note) {
    let result = await fetch("/rest/notes", {
        method: "POST",
        body: JSON.stringify(note)
    });
}

function renderList() {
    let list = $("#notesList");
    list.empty();
    
     for (everyNote of notes) {
        list.append(`<li><h3>${everyNote.title}</h3><br> 
                    <p>${everyNote.text}</p><button class="trashBtn"><i class ="fas fa-trash"></i></button></li>`);
    }
    
}

function renderTitleList() {
    let listOfTitles = $("#titleList");
    listOfTitles.empty();
    
    for (everyTitle of notes) {
        listOfTitles.append(`<li><h4> ${everyTitle.title} </h4></li>`);
    }
    
    deleteFunction();
}


async function deleteNote(note) {
    
    let result = await fetch("/rest/notes/id", {
        method: "DELETE",
        body: JSON.stringify(note)
    });
}

function deleteFunction() {
    let deleteBtn = $(".trashBtn");
    deleteBtn.empty();
    
    for (let i = 0; i < deleteBtn.length; i++) {
        $(deleteBtn[i]).click(function () {
            let parentElement = this.parentElement;
            parentElement.style.display = "none";
            deleteNote(notes[i]);
            notes.splice(i,1); 
        })
    }
}



// DELETE FROM LOCAL STORAGE
/* function deleteNote(note) {
    
      let notes = localStorage.getContent("notes");
      if (notes == null) {
        posts = [];
      } else {
        posts = JSON.parse(notes);
      }
    
      notes.splice(index, 1);
      localStorage.setContent("notes", JSON.stringify(note));
      showNotes();
    }
 */

 //FALL-EFFECT
/* 
function deleteNotes(e) {
    let post = e.target;

    if(post.classList[0] === 'deleteButton') {
        let addNote = notes.parentElement;
        addNote.classList.add("fall")
        addNote.addEventListener('falling', function() {
            addNote.remove();
        })
    }
} */