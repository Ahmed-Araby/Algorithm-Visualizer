// handling the mouse clicks 
var can1 = document.getElementById('can1');
var cntx1 = can1.getContext('2d');
can1.addEventListener('click', handle_mouse_click)
can1.height = window.innerHeight - 200;
can1.width = window.innerWidth - 15;

var pointColor = '#FF0000';
var pointLineWidth = 10;

// for the sweep line Algorithm
var points = []
var segments = []
var eventQueue = new AVLTree(compare_function_events);
var sweptSegments = new AVLTree(compare_function_sweepLine);
var sweepLinePosition = 0;

// for visualization 
var intersectionPoints = new Array();
var linesColors = new Array();
var colors = ['#000000', '#2ECC71', '#A569BD'];

/*
Handle user inputs
*/

function handle_mouse_click(event)
{
    
    var clickX = event.x - can1.offsetLeft;
    var clickY = event.y - can1.offsetTop;
    
    var p = new point(clickX, clickY);
    
    draw_point(p);
    points.push(p);
    if(points.length==2)
    {
        points.sort(custom_point_sort);
        segments.push(new segment(points[0] , points[1]));
        draw_line(points[0] , points[1], '#FFFFFF', 2);
        points.length = 0;
        
        //console.log(segments);
    }
    
    return ;
}

function build_evnet_queue(){
    if(eventQueue.length()!=0)
        return ;
    
    for(var index = 0; index<segments.length; index+=1)
    {
        var seg = segments[index]; 
        var newEvent = new events(-1, seg.p1, index);
        eventQueue.insert(newEvent);
        newEvent = new events(1, seg.p2, index);
        eventQueue.insert(newEvent);
        
        //linesColors.push(0);
    }
    console.log("event queue have ", eventQueue.length(),  " events ");
}




function step_forward()
{
    if(eventQueue.length()==0)
    {
        alert("we are done here go fuck UR self");
    }
    else{
        // send the event to the algorithm
        var minEvent = eventQueue.min_value();
        sweepLinePosition = minEvent.p.x;
        eventQueue.pop();
        
        Bentley_Ottmann_algorithm(minEvent,
                                  intersectionPoints,
                                  sweptSegments,
                                  eventQueue,
                                  linesColors,
                                  segments);
        console.log(sweptSegments)
        render_visuals();
    }
}

function render_visuals()
{
    // reinitialize the screen 
    cntx1.fillStyle = '#000000';
    cntx1.fillRect(0, 0, can1.width, can1.height);
    
    // draw the segmetns 
    for(var index=0; index <segments.length; index+=1)
    {
        var tmpSegment = segments[index];
        draw_point(tmpSegment.p1);
        draw_point(tmpSegment.p2);
        
        draw_line(tmpSegment.p1, tmpSegment.p2,
                 "#FFFFFF",
                 3);
    }
    
    // draw intersection points
    for(var index=0; index <intersectionPoints.length; index+=1)
    {
        var tmpPoint = intersectionPoints[index];
        draw_point(tmpPoint.p);
        
    }
    
    // draw the sweep line 
    draw_line(new point(sweepLinePosition, 100),
              new point(sweepLinePosition, can1.height-100),
             '#FFD700', 
             5);
    
}