/************************************************
 * CYTOSCAPE
 ************************************************/

const cy = cytoscape({

container: document.getElementById('cy'),

elements:[

    /***********************
     * QGD
     ***********************/
    { data:{ id:'qgd', label:'d4/d5', type: 'qgd' }},

    { data:{ id:'iqp', label:'IQP', parent:'qgd' }, position:{x:100, y:100}  },
    { data:{ id:'hanging', label:'Pions pendants', parent:'qgd' }, position:{x:300, y:100}  },
    { data:{ id:'carlsbad', label:'Carlsbad', parent:'qgd' }, position:{x:100, y:220} },
    { data:{ id:'slav', label:'Formation Slave', parent:'qgd' }, position:{x:300, y:220} },
    { data:{ id:'ck', label:'Formation Caro-Kann', parent:'qgd' }, position:{x:100, y:340}  },
    { data:{ id:'stonewall', label:'Stonewall', parent:'qgd' }, position:{x:300, y:340}  },
    { data:{ id:'grunfeld', label:'Centre Grünfeld', parent:'qgd' }, position:{x:200, y:460}  },

    { data:{ id:'a1', source:'carlsbad', target:'iqp' } },
    { data:{ id:'a2', source:'iqp', target:'hanging' } },


    /***********************
     * Sicilienne
     ***********************/
    { data:{ id:'sicilienne', label:'Sicilienne Ouverte', type: 'sicilienne' }},

    { data:{ id:'naj1', label:'Najdorf type I', parent:'sicilienne' }, position:{x:700, y:100}  },
    { data:{ id:'naj2', label:'Najdorf type II', parent:'sicilienne' }, position:{x:900, y:100}  },
    { data:{ id:'hedgehog', label:'Le hérisson', parent:'sicilienne' }, position:{x:700, y:240}  },
    { data:{ id:'maroczy', label:'Le Maroczy', parent:'sicilienne' }, position:{x:900, y:240}  },

    { data:{ id:'b1', source:'naj2', target:'naj1' } },

    /***********************
     * Benoni
     ***********************/
    { data:{ id:'benoni', label:'Benoni', type: 'benoni' } },

    { data:{ id:'sym', label:'Benoni symétrique', parent:'benoni' }, position:{x:100, y:700} },
    { data:{ id:'asym', label:'Benoni asymétrique', parent:'benoni' }, position:{x:300, y:700} },


    /***********************
     * KID
     ***********************/
    { data:{ id:'kid', label:'Est-Indienne', type: 'kid' } },

    { data:{ id:'kid1', label:'Est-Indienne type I', parent:'kid' }, position:{x:700, y:700} },
    { data:{ id:'kid2', label:'Est-Indienne type II', parent:'kid' }, position:{x:900, y:700} },
    { data:{ id:'kid3', label:'Est-Indienne type III', parent:'kid' }, position:{x:700, y:840} },
    { data:{ id:'kid_op', label:'Est-Indienne ouverte', parent:'kid' }, position:{x:900, y:840} },
    { data:{ id:'kid_comp', label:'Le complexe Est-Indien', parent:'kid' }, position:{x:800, y:980} },

    /***********************
     * French
     ***********************/
    { data:{ id:'french', label:'Française', type: 'french' } },

    { data:{ id:'fr1', label:'Française type I', parent:'french' }, position:{x:1300, y:700} },
    { data:{ id:'fr2', label:'Française type II', parent:'french' }, position:{x:1500, y:700} },
    { data:{ id:'fr3', label:'Française type III', parent:'french' }, position:{x:1400, y:840} },

        

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
            if(id === 'iqp' || id === 'hanging' || id === 'ck' || id === "slav" || id === 'carlsbad' || id === 'stonewall' || id === 'grunfeld') return '#4DA3FF';
            if(id === 'naj1' || id === 'naj2' || id === 'hedgehog' || id === 'maroczy') return '#FF6B6B';
            if(id === 'sym' || id === 'asym') return '#51CF66';
            if(id === 'kid1' || id === 'kid2' || id === 'kid3' || id === 'kid_op' || id === 'kid_comp') return '#FCC419';
            if(id === 'fr1' || id === 'fr2' || id === 'fr3') return '#A970FF';
            return '#4472C4';
        },
        'color':'white',
        'font-size':'14px',
        'width':'150px',
        'height':'50px'
    }
},

{
    selector:':parent',
    style:{
        'background-color': function(ele){
            const id = ele.id();
            if(id === 'qgd') return '#E6F4FF';
            if(id === 'sicilienne') return '#FFE8E8';
            if(id === 'benoni') return '#E8F8EC';
            if(id === 'kid') return '#FFF4CC';
            if(id === 'french') return '#F3E8FF';
            return '#d9e2f3';
        },
        'border-width':3,
        'border-color': function(ele){
            const id = ele.id();
            if(id === 'qgd') return '#0052CC';
            if(id === 'sicilienne') return '#C92A2A';
            if(id === 'benoni') return '#2B8A3E';
            if(id === 'kid') return '#E67700';
            if(id === 'french') return '#6F42C1';
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

// layout:{
//     name:'breadthfirst',
//     directed:true,
//     spacingFactor:1.8,
//     padding:50,
//     avoidOverlap:true
// }

layout: {
    name: 'preset'
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