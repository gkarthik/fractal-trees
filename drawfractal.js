var SVG = d3.select("body").append("svg").attr({"height":window.innerHeight-20,"width": window.innerWidth-20});
var globalDepth = 40;
var radius = 60;
var thickness = 10;
var rootX = window.innerWidth;
var rootY = window.innerHeight;
var maxBranchNo = 3;
var randomBranch = Math.floor(Math.random()*(maxBranchNo-1));
var treeStruct = {
    x1: rootX,
    y1: rootY,
    x2: rootX,
    y2: 2*rootY/3,
    angle: 0,
    thickness: thickness,
    children: []
};

var nodes = [{
    x1: rootX,
    y1: rootY,
    x2: rootX,
    y2: 2*rootY/3,
    thickness: thickness,
}];

var angle = 0;
var randomno = 0;
var flag = 1;
function addChild(node, depth, i){
    if(node.children.length < maxBranchNo){
        flag = (node.children.length > (maxBranchNo/2)-1) ? 1 : -1;
	randomno = 1;
    console.log(flag);
    angle = node.angle +((node.children.length-(maxBranchNo/2)+0.5) * Math.PI/(2*maxBranchNo));
	node.children.push({
	    x1: node.x2,
	    y1: node.y2,
        x2: (node.x2) + (Math.cos(parseFloat(angle))* (radius/depth)),
        y2: (node.y2) + (Math.sin(parseFloat(angle))* (radius/depth)),
	    angle: angle,
	    thickness: node.thickness - (depth * 0.2 ),
	    children: []
	});
	nodes.push({
	    x1: node.x2,
	    y1: node.y2,
	    x2: node.children[node.children.length-1].x2,
	    y2: node.children[node.children.length-1].y2,
	    thickness: (node.thickness - (depth * 2)+1),
        depth: depth * (i+1)
	});
     } else {
	 depth++;
	for(var j=0;j<maxBranchNo;j++){
	    addChild(node.children[j], depth, i);
	}
    }
}

var treeCollection = [];
var nodesCollection = [];
var treeNo = (window.innerWidth/200)*(window.innerHeight/200);
var seedX = Math.random() * window.innerWidth;
var seedY = 0;
var level = 0;
for(var i =0; i<treeNo; i++){
    seedX = ((Math.random() * (window.innerWidth/5)) + seedX);
    seedY = (((Math.random() * ( window.innerHeight/treeNo))) + ((level * (window.innerHeight-200)/3))) + 200;
    
    if(seedX>window.innerWidth-150){
        level++;
        seedX = 100 + (Math.random() * 100);
    } else if(seedX<100) {
	seedX = 150;
    }

    if(seedY>window.innerHeight){
        seedY = window.innerHeight-10;
    }
    treeStruct = {
    x1: seedX,
    y1: seedY,
    x2: seedX,
    y2: seedY-100,
    angle: -Math.PI/2,
    thickness: thickness,
    children: [],
    depth: i
    };
    nodes.push({
	x1: treeStruct.x1,
    y1: treeStruct.y1,
    x2: treeStruct.x2,
    y2: treeStruct.y2,
    thickness: thickness,
    depth: i
    });
    for(var ctr =0; ctr<15;ctr++){
	addChild(treeStruct, 1, i);
    }
    treeCollection.push(treeStruct);
}

drawTrees(nodes);

function drawTrees(root){
    var nodes = SVG.selectAll(".branch").data(root).enter().append("line","g")
    .attr("class","branch")
    .attr("x1",function(d){return d.x1})
    .attr("y1",function(d){return d.y1})
    .attr("x2",function(d){return d.x1})
    .attr("y2",function(d){return d.y1})
    .attr("stroke","#c1c1c1")
    .attr("stroke-width",function(d){return d.thickness; })
    .transition()
    .delay(function(d,i){
            return (d.depth) * 500;
	})
    .attr("x2",function(d){return d.x2})
    .attr("y2",function(d){return d.y2});
}
