var pointColor = '#FF0000';
var pointSideWidth = 5;

var hullSegmentColor  =  '#FFFF00';
var hullLineWidth = 3;

var upperTangentColor = '#0000ff';
var lowerTangentColor = '#008000';
var tangentLineWidth = 3;

var VericalLineColor = '#FFFFFF';
var verticalLineWidth = 3;

var canvas1 = document.getElementById('can1');
canvas1.width = window.innerWidth - 300;
canvas1.height = window.innerHeight - 300;

var canvasHeight = canvas1.height;
var canvasWidth = canvas1.width;
var cntx1 = canvas1.getContext('2d');
var initialColor = 'black';

var points = []
for(var i = 0; i<50; i+=1){
    var y = Math.random() * canvasHeight;
    var x = Math.random() * canvasWidth;
    points.push(new point(x, y));
}

var H = new hull(points);


var stack = []
var visuals = new visualizer();
var popCount = 0;

stack.push(new screenshoot(0 , points.length-1));


function next()
{
    if(stack.length==0)
    {
        build_convex_hull_from_index_pointers(0, H.points.length-1 , H, 
                                             hullSegmentColor, hullLineWidth);
        return ;
    }
    var len = stack.length-1;
    console.log("stack length ", stack.length);
    
    var startIndex = stack[len].startIndex;
    var endIndex = stack[len].endIndex;
    
    // merge
    if(popCount >=2){
        visuals.merge(startIndex, endIndex, H, stack);
        popCount-=2;
        
        stack.pop();
        popCount += 1;
    }
    
    // divide into more subproblems
    else 
        visuals.DivideAndConquer(startIndex, endIndex, H, stack);
    
    return ;
}


draw_points(points);

var HullAlgo = new convexhullAlgorithm();

HullAlgo.divide_and_conquer(0 , H.points.length-1 , H);
 build_convex_hull_from_index_pointers(0, H.points.length-1 , H, 
                                             hullSegmentColor, hullLineWidth);