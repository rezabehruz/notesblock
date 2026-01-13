
function renderNormalNote(i){
    return `            
            <section class="note">
              <h3 class="roboto-medium collapsible">${notes[i][0]}</h3>
              <p class="open-sans-medium">${notes[i][1]}</p>
              <div class="cruid-options">
                <button onclick=archiveNote(${i})>
                  <i class="fa fa-archive" aria-hidden="true"></i>
                </button>
                <button onclick=renderEditDialog(${i})>
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button onclick=moveToTrash(${i})><i class="fa fa-trash" aria-hidden="true"></i></button>
              </div>
            </section>`;
}

function renderArchiveNote(i){
    return `
            <section class="note">
              <h3 class="roboto-medium">${notes[i][0]}</h3>
              <p class="open-sans-medium">${notes[i][1]}</p>
              <div class="cruid-options">
                <button onclick=moveBack(${i})>
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                <button onclick=renderEditDialog(${i})>
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button onclick=moveToTrash(${i})><i class="fa fa-trash" aria-hidden="true"></i></button>
              </div>
            </section>
`;
}

function renderTrashNote(i){
    return `
            <section class="note">
              <h3 class="roboto-medium">${notes[i][0]}</h3>
              <p class="open-sans-medium">${notes[i][1]}</p>
              <div class="cruid-options">
                <button onclick=moveBack(${i})>
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                <button onclick=renderEditDialog(${i})>
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button onclick=deleteNote(${i})><i class="fa fa-trash" aria-hidden="true"></i></button>
              </div>
            </section>
`;
}

