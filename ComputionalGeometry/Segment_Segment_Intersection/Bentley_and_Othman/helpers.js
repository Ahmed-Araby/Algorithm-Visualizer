const eps = 1e-6;

function draw_point(p)
{
    //console.log(p);
    cntx1.fillStyle = pointColor;
    cntx1.fillRect(p.x, p.y, pointLineWidth, pointLineWidth);
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

function get_line_slope(line)
{
    var slope = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
    return slope;
}

function orientation_test_3_points(p1 , p2, p3)
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

function check_segment_segment_intersection(segment1, segment2)
{
    // segment 1 to segment 2 
    var ori1 = orientation_test_3_points(segment1.p1, segment1.p2,
                                        segment2.p1);
    var ori2 = orientation_test_3_points(segment1.p1, segment1.p2,
                                        segment2.p2);
    
    if(ori1 == ori2)
        return false;
    
    var ori3 = orientation_test_3_points(segment2.p1, segment2.p2,
                                        segment1.p1);
    var ori4 = orientation_test_3_points(segment2.p1, segment2.p2,
                                        segment1.p2);
    if(ori3 == ori4)
        return false;
    
    return true;
}

function get_segment_segment_intersection(segment1, segment2, refPoint)
{
    /*
    * point of intersection if exist will be in refpoint.
    * return true, false depends on the existance of the intersection point.
    
    - neat cases.
    - both are vertical.
    - one of them is vertical.
    - parallel lines.
    - otherwise just solve the equations.
    */
    
    var vert1 = false, vert2 = false;
    
    if(segment1.p1.x == segment1.p2.x)
        vert1 = true;
    if(segment2.p1.x == segment2.p2.x)
        vert2 = true;
    
    // case both are vertical 
    if(vert1 && vert2){
        return false;
    }
    
    // case no intersection with orientation test  
    if(check_segment_segment_intersection(segment1, segment2) == false){
        return false;
    }
    
    
    // get the lines equations
    var slope1 , slope2 , b1, b2;
    if(!vert1){
        slope1 = get_line_slope(segment1);
        b1 = segment1.p1.y - slope1 * segment1.p1.x;
    }
    if(!vert2){
        slope2 = get_line_slope(segment2);
        b2 = segment2.p1.y - slope2 * segment2.p1.x;
    }
    
    // case they are parallel lines
    if(Math.abs(slope1 - slope2) <=eps){
        return false;
    }
    
    // get the intersection point 
    var interX ,interY;
    
    // case one of them is vertical
    if(vert1 || vert2)
    {
        if(vert1){
            interX = segment1.p1.x;
            interY = slope2 * interX + b2; 
        }
        else if(vert2){
            interX = segment2.p1.x;
            interY = slope1 * interX + b1;
        }
    }
    
    else{ // normal case
        // solve the 2 equations
        interX = (b2-b1) / (slope1 - slope2);
        interY = slope1 * interX + b1;
    }    
    
    refPoint.x = interX;
    refPoint.y = interY;
    return true;
}

function custom_point_sort(p1 , p2)
{
    if(Math.abs(p1.x - p2.x) <=eps)
    {
        if(Math.abs(p1.y - p2.y) <=eps)
            return 0;
        if(p1.y < p2.y)
            return -1;
        else 
            return 1;
    }
    else if(p1.x <p2.x)
        return -1;
    else 
        return 1;
}