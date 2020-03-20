const num_col=60;
const num_row=18;

const P_1=0;
const P_2=1;
const P_3=2;
const D=3;

var c_width=100/num_col;
var c_height='35px';

const c_direction={
    up:{i:-1,j:0},
    down:{i:1,j:0},
    left:{i:0,j:-1},
    right:{i:0,j:1}
};

function initNodes(){
    var nodes=[];
    for(var i=0;i<num_row;i++){
        var node=[];
        for(var j=0;j<num_col;j++){
            var n={};
            n.direction={
                up:false,
                down:false,
                right:false,
                left:false
            };
            n.styles={
                height:c_height,
                width:c_width+'%',
                'float':'right',
                'background-color':'lightgrey',
                'border-top':'1px solid black',
                'border-bottom':'1px solid black',
                'border-left':'1px solid black',
                'border-right':'1px solid black',
                'box-sizing':'border-box'

            }
            n.i=i;
            n.j=j;
            node.push(n)
        }
        nodes.push(node)
    }
    return nodes
}

function generateCoor(){
    var c_col=Math.floor(Math.random()*num_col);
    var c_row=Math.floor(Math.random()*num_row);

    return {
        col:c_col,row:c_row
    }
}

function checkNodes(node,listNodes){
    var check=listNodes.find((a)=>a===node);
    if(check)
        return true;
    return false;
}

function pushIfNotExists(node,arr){
    var check=checkNodes(node,arr);
    if(!check){
        arr.push(node);
    }
}

function getPossibleNode(node,nodes,visitedNodes,doneNodes){
    var listNodes=[];
    var curr_i=node.i;
    var curr_j=node.j;

    for(var i in c_direction){  
        var direction=c_direction[i];
        var next_i=curr_i+direction.i;
        var next_j=curr_j+direction.j;
        var next_node=nodes[next_i]?nodes[next_i][next_j]:null;
        if(next_node && !checkNodes(next_node,visitedNodes) && !checkNodes(next_node,doneNodes)){
            listNodes.push({direction:i,node:next_node})
        }
    }

    return listNodes;

}

function getRandomPossibleNodes(nodes){

    if(nodes.length===1)
        return nodes[0];
    else{
        var randomIndex=Math.floor(Math.random()*nodes.length);
        return nodes[randomIndex];
    }
}

function setPath(curr_node,n_node_obj){
    var direction=n_node_obj.direction;
    var next_node=n_node_obj.node;
    switch(direction){
        case 'up':

            curr_node.direction.up=true;
            curr_node.styles['border-top']='none';

            next_node.direction.down=true;
            next_node.styles['border-bottom']='none';
            
        break;
        case 'down':
           
            curr_node.direction.down=true;
            curr_node.styles['border-bottom']='none';

            next_node.direction.up=true;
            next_node.styles['border-top']='none';
        break;
        case 'left': 
           
            curr_node.direction.left=true;
            curr_node.styles['border-left']='none';

            next_node.direction.right=true;
            next_node.styles['border-right']='none';
        break;
        case 'right':
           
            curr_node.direction.right=true;
            curr_node.styles['border-right']='none';

            next_node.direction.left=true;
            next_node.styles['border-left']='none';
        break;
    }
}

function generateMaze(){
    var nodes=initNodes();
    var coord=generateCoor();
    var m_col=coord.col;
    var m_row=coord.row;
    var visitedNodes=[];
    var doneNodes=[];
    var m_curr=nodes[m_row][m_col];
    var totalNodes=num_row*num_col;

    do{
        if(!checkNodes(m_curr,doneNodes))
            pushIfNotExists(m_curr,visitedNodes);

        var listPossibleNodes=getPossibleNode(m_curr,nodes,visitedNodes,doneNodes);
        if(listPossibleNodes.length!==0){
            var n_node_obj=getRandomPossibleNodes(listPossibleNodes);
            setPath(m_curr,n_node_obj);
            m_curr=n_node_obj.node;
        }
        else{
            pushIfNotExists(m_curr,doneNodes);
            visitedNodes.pop();
            m_curr=visitedNodes.pop();
        }
    }while(doneNodes.length!==totalNodes);

    return nodes

}

function generatePlayer(char,flag){
    var pos={
        i:-1,
        j:-1
    };

    switch(flag){
        case P_1:
            pos.i=0;
            pos.j=0;
        break;
        case P_2:
            pos.i=0;
            pos.j=num_col-1;
        break;
        case P_3:
            pos.i=num_row-1;
            pos.j=0;
        break;
        case D:
            pos.i=Math.floor(num_row/2);
            pos.j=Math.floor(num_col/2);
        break;
    }

    var charHTML='<span style="font-size: 15px;margin-right:20px;margin-top:10px;">'+char+'</span>'

    return {
        char:charHTML,
        pos:pos
    };
}

function generateNodeVertex(col,row){
    var result=[];
    for(var i=0;i<num_row;i++){
        for(var j=0;j<num_col;j++){
            var obj={};
            obj.known=false;
            obj.cost=i===row && j===col?0:Infinity;
            obj.path=null;
            obj.i=i;
            obj.j=j;
            result.push(obj);
        }
    }
    return result;
}

function getCheapestVertex(vertices){
    var cost=Infinity;
    var v=null;
    var cheapest_vertex=null;

    for(var i=0;i<vertices.length;i++){
        v=vertices[i];
        if(v.cost<cost && v.known===false ){
            cost=v.cost;
            cheapest_vertex=v;
        }
    }
    return cheapest_vertex;
}

function getNeighboors(curr_vertex,vertices,nodes){
    var listVertices=[];
    var curr_node=nodes[curr_vertex.i][curr_vertex.j];
    for(var i in c_direction){
        var dir=c_direction[i];
        var next_i=curr_vertex.i+dir.i;
        var next_j=curr_vertex.j+dir.j;
        var next_node=nodes[next_i]?nodes[next_i][next_j]:null;
        var next_vertex=findVertex(vertices,next_i,next_j);
        if((next_node && curr_node.direction[i]) && (next_vertex && next_vertex.known===false )){
            next_vertex.dir=i;
            listVertices.push(next_vertex);
        }
    }
    return listVertices;
}

function findVertex(vertices,i,j){
    return vertices.find(v=>v.i===i && v.j===j );
}

function spList(destination_vertex,vertices,nodes){
    var curr=destination_vertex;
    var result=[];

    while(curr){
        var path=curr.path;
        var node=nodes[curr.i][curr.j];
        node.isSP=true;
        result.push(curr);
     

        if(path)
            curr=findVertex(vertices,path.i,path.j);
        else
            curr=null;
    }
    return result;
}

function getShortestPath(start,destination,nodes){
    var vertices=generateNodeVertex(start.j,start.i);
    var curr_vertex=null;
    var neighboors=null;
    var cost=0;
    curr_vertex=getCheapestVertex(vertices);

    do{
        curr_vertex.known=true;
        neighboors=getNeighboors(curr_vertex,vertices,nodes);
        cost=curr_vertex.cost;

        for(var i=0;i<neighboors.length;i++){
            var neighboor=neighboors[i];
            if(neighboor.cost>cost+1){
                neighboor.cost=cost+1;
                neighboor.path={i:curr_vertex.i,j:curr_vertex.j};
            }
        }
        curr_vertex=getCheapestVertex(vertices);

    }while(curr_vertex!==null);

    var destination_vertex=findVertex(vertices,destination.i,destination.j);

    return spList(destination_vertex,vertices,nodes);
}

export default {
    make:generateMaze,
    initNodes:initNodes,
    generatePlayer,
    getShortestPath,
    c_width,
    c_height,
    num_col,
    num_row,
    P_1,
    P_2,
    P_3,
    D
}