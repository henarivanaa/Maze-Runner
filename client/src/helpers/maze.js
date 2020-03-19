const num_col=15;
const num_row=8;

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

    var charHTML='<span style="font-size: 15px;text-align:center;margin-top:10px;">'+char+'</span>'

    return {
        char:charHTML,
        pos:pos
    };

}

export default {
    make:generateMaze,
    initNodes:initNodes,
    generatePlayer,
    c_width,
    c_height,
    num_col,
    num_row,
    P_1,
    P_2,
    P_3,
    D
}