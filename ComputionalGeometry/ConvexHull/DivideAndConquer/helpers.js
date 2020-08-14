const eps = 1e-6;

function draw_points(points)
{
    
    cntx1.fillStyle = pointColor;
    for(p of points){
        cntx1.fillRect(p.x, p.y, pointSideWidth, pointSideWidth);
    }
    return ;
}


function connect_points(points)
{
    cntx1.beginPath();
    cntx1.strokeStyle = HullSegmentColor;
    cntx1.lineWidth = 1;
    for (var index = 0; index<points.length; index++){
        var currentPoint = points[index];
        var nextPoint = points[(index+1) % points.length];
        
        cntx1.moveTo(currentPoint.x , currentPoint.y);
        cntx1.lineTo(nextPoint.x, nextPoint.y);
        cntx1.stroke();
    }
    return ;
}

function draw_line(p1 , p2, color , lineWidth)
{
    cntx1.beginPath();
    cntx1.strokeStyle = color;
    cntx1.lineWidth = lineWidth;
    
    cntx1.moveTo(p1.x, p1.y);
    cntx1.lineTo(p2.x, p2.y);
    cntx1.stroke();
    return ;
}

function custom_sort_point(p1 , p2)
{
    if(Math.abs(p1.x - p2.x) <=eps)
    {
        if(Math.abs(p1.y - p2.y) <=eps)
            return 0;
            
        else if(p1.y < p2.y)
            return -1;
        else
            return 1;
    }
    
    else if(p1.x > p2.x)
        return 1;
    
    return -1;

}

function build_convex_hull_from_index_pointers(startIndex , endIndex, H, 
                                               color, lineWidth)
{
   // reinitialize the screen 
    cntx1.fillStyle = initialColor;
    cntx1.fillRect(0, 0, canvasWidth, canvasHeight);
    draw_points(H.points);
        
    var index = startIndex;
    cntx1.beginPath();
    cntx1.strokeStyle = color;
    cntx1.lineWidth = lineWidth;
    
    while(true){
        var curPoint = H.points[index];
        var nextPoint = H.points[H.next[index]];
        
        cntx1.moveTo(curPoint.x, curPoint.y);
        cntx1.lineTo(nextPoint.x , nextPoint.y);
        cntx1.stroke();
        
        index = H.next[index];
        if(index==startIndex)
            break;
    }
    return ;
}

function orientation_test(p1 , p2 , p3)
{
    /*
    the points are in order of the walking direction
    */
    var p1p2 = new point(p2.x-p1.x , p2.y-p1.y);
    var p1p3 = new point(p3.x-p1.x , p3.y-p1.y);
    
    var signedArea = p1p2.x * p1p3.y - p1p2.y * p1p3.x;
    if(signedArea == 0)
        return 'col';
    
    /*
    theses 2 are reversed because we have the coordinate system 
    vertically flipped
    */
    else if(signedArea > 0)
        return 'cw' //'ccw';
    
    else 
        return 'ccw';
}