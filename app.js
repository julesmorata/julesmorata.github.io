/************************************************
 * CYTOSCAPE
 ************************************************/

const cy = cytoscape({

container: document.getElementById('cy'),

elements:[

    /***********************
     * QGD
     ***********************/
    { data:{ id:'qgd', label:'d4/d5', type: 'qgd' } },

    { data:{ id:'carlsbad', label:'Carlsbad', parent:'qgd' } },
    { data:{ id:'iqp', label:'IQP', parent:'qgd' } },
    { data:{ id:'hanging', label:'Pions pendants', parent:'qgd' } },

    { data:{ id:'e1', source:'carlsbad', target:'iqp' } },
    { data:{ id:'e2', source:'iqp', target:'hanging' } },
    { data:{ id:'e3', source:'hanging', target:'carlsbad' } },


    /***********************
     * Sicilienne
     ***********************/
    { data:{ id:'sicilienne', label:'Sicilienne Ouverte', type: 'sicilienne' } },

    { data:{ id:'naj1', label:'Najdorf 1', parent:'sicilienne' } },
    { data:{ id:'naj2', label:'Najdorf 2', parent:'sicilienne' } },

    { data:{ id:'b1', source:'naj1', target:'naj2' } },

    /***********************
     * Benoni
     ***********************/
    { data:{ id:'benoni', label:'Benoni', type: 'benoni' } },

    { data:{ id:'sym', label:'Benoni Symétrique', parent:'benoni' } },
    { data:{ id:'asym', label:'Benoni Asymétrique', parent:'benoni' } },


    /***********************
     * KID
     ***********************/
    { data:{ id:'kid', label:'Est-Indienne', type: 'kid' } },

    { data:{ id:'kid1', label:'Est-Indienne Type I', parent:'kid' } },
    { data:{ id:'kid2', label:'Est-Indienne Type II', parent:'kid' } },
    { data:{ id:'kid3', label:'Est-Indienne Type III', parent:'kid' } },
    { data:{ id:'kid_op', label:'Est-Indienne Ouverte', parent:'kid' } },
    { data:{ id:'kid_comp', label:'Le Complexe Est-Indien', parent:'kid' } },

    /***********************
     * French
     ***********************/
    { data:{ id:'french', label:'Française', type: 'french' } },

    { data:{ id:'fr1', label:'Française Type I', parent:'french' } },
    { data:{ id:'fr2', label:'Française Type II', parent:'french' } },
    { data:{ id:'fr3', label:'Française Type III', parent:'french' } },

        

],

style:[

{
    selector:'node',
    style:{
        'label':'data(label)',
        'text-valign':'center',
        'text-halign':'center',
        'background-color': function(ele){
            const id = ele.id();
            if(id === 'carlsbad' || id === 'iqp' || id === 'hanging') return '#4472C4';
            if(id === 'naj1' || id === 'naj2') return '#C47272';
            return '#4472C4';
        },
        'color':'white',
        'font-size':'14px',
        'width':'120px',
        'height':'50px'
    }
},

{
    selector:':parent',
    style:{
        'background-color': function(ele){
            const id = ele.id();
            if(id === 'qgd') return '#d9e2f3';
            if(id === 'sicilienne') return '#f3e2e2';
            if(id === 'benoni') return '#f3e2e2';
            if(id === 'kid') return '#f3e2e2';
            if(id === 'french') return '#f3e2e2';
            return '#d9e2f3';
        },
        'border-width':3,
        'border-color': function(ele){
            const id = ele.id();
            if(id === 'qgd') return '#5b9bd5';
            if(id === 'sicilienne') return '#d59b9b';
            if(id === 'benoni') return '#d59b9b';
            if(id === 'kid') return '#d59b9b';
            if(id === 'french') return '#d59b9b';
            return '#5b9bd5'
        },
        'text-valign':'top',
        'text-halign':'center',
        'color':'black',
        'padding':'25px'
    }
},


{
    selector:'edge',
    style:{
        'curve-style':'bezier',
        'target-arrow-shape':'triangle',
        'line-color':'#666',
        'target-arrow-color':'#666',
        'width':2
    }
}

],

layout:{
    name:'breadthfirst',
    directed:true,
    spacingFactor:1.8,
    padding:50,
    avoidOverlap:true
}

});


/************************************************
 * MODALE
 ************************************************/

const modal = document.getElementById("structureModal");
const closeBtn = document.querySelector(".close");

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = e => {
    if(e.target === modal){
        modal.style.display = "none";
    }
};


/************************************************
 * CHESSBOARD
 ************************************************/

let board = null;

function renderBoard(fen) {

    if (board) board.destroy();

    board = Chessboard('board', {
        position: fen,
        pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
    });
}


/************************************************
 * UI HELPERS
 ************************************************/

function fillList(id,data){

    const ul=document.getElementById(id);
    ul.innerHTML="";

    data.forEach(item=>{
        const li=document.createElement("li");
        li.textContent=item;
        ul.appendChild(li);
    });
}


/************************************************
 * OUVERTURE STRUCTURE
 ************************************************/

function openStructure(structure){

    document.getElementById("title").textContent = structure.title;

    fillList("advantages",structure.advantages);
    fillList("drawbacks",structure.drawbacks);
    fillList("plans",structure.plans);
    fillList("openings",structure.openings);

    renderBoard(structure.fen);

    modal.style.display="block";
}


/************************************************
 * CLICK CYTOSCAPE
 ************************************************/

cy.on('tap','node',evt=>{

    const id = evt.target.id();

    if(structures[id]){
        openStructure(structures[id]);
    }

});