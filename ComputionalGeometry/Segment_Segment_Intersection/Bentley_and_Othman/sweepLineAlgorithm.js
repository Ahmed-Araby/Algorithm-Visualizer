class events
{
    constructor(eventType, p, line1Index, line2Index=-1)
    {
        /*
        -1 for start 
        0 for intersection 
        1 for end
        */
        
        this.eventType = eventType;
        this.p = p;
        this.line1Index = line1Index;
        
        // in case that we have intersection event
        this.line2Index = line2Index;
    }
}

class sweptLine
{
    constructor(line, lineIndex)
    {
        this.line = line;
        this.lineIndex = lineIndex;
        return ;
    }
}

class intersection
{
    constructor(line1Index, line2Index, p)
    {
        this.line1Index = line1Index;
        this.line2Index = line2Index;
        this.p = p;
        
        return ;
    }
}

function compare_function_events(event1, event2)
{
    // compare based on the x axis 
    if(event1.p.x == event2.p.x)
        return 0;
    if(event1.p.x < event2.p.x)
        return -1;
    else
        return 1;
}

function compare_function_sweepLine(sweptLine1 , sweptLine2)
{
    /*
    currentX is the x of p1 of segment 2 
    */
    
    var segment1 = sweptLine1.line;
    var segment2 = sweptLine2.line;
    
    if(segment1.compare_function(segment2) == 0)
    {
        /*
        same segment for delation
        */
        
        return 0;
    }
    
    var currentX = segment2.p1.x;
    
    if(segment1.type =='V')
    {
        /*
        will not happen as the segmetn1 then
        will be deleted right after being inserted
        or then we will have identical segments
        */
        return -1;
    }
    
    var slope1 = segment1.get_slope();
    var Yinter1 = segment1.get_Yintersection();
    
    var Y1 = currentX * slope1 + Yinter1;
    
    /*
    I guess this is the issue 
    that the algo is constrained about
    */
    
    if(Y1==segment2.p1.y){
        /*
        compare on the end points of the 2 segments
        this will solve the tie when we reinsert the swaped segments
        */
        
        if(segment1.p2.y  == segment2.p2.y)
            return 0;
        else if(segment1.p2.y < segment2.p2.y)
            return -1;
        else 
            return 1;
    }
    else if(Y1 < segment2.p1.y)
        return -1;
    else 
        return 1;
}


function Bentley_Ottmann_algorithm(currentEvent, intersectionsRef, sweptSegmetns, eventQueue, linesColorref, segments)
{
    /*
    intersectionsRef contains all the intersections points with the lines that do this intersection
    
    sweptSegments contain all the segments been touched  by the sweep line 
    and didn't end yet
    
    linesColorsRef mark the selected lines for intersection checking
    */
    
    if(currentEvent.eventType == -1)
    {
        console.log("start event")
        
        var tmpSegment = segments[currentEvent.line1Index];
        var tmpSweptLine = new sweptLine(tmpSegment, currentEvent.line1Index);
        
        sweptSegmetns.insert(tmpSweptLine);
        
        var beforeRef = sweptSegmetns.before(tmpSweptLine);
        var afterRef = sweptSegmetns.after(tmpSweptLine);
        
        if(beforeRef !=null)
        {
            // check for intersection
            var interPointRef = new point(-1, -1);
            var interRes = get_segment_segment_intersection(tmpSegment, beforeRef.value.line, interPointRef);
            
            if(interRes==true)
            {
                intersectionsRef.push(new intersection(beforeRef.value.lineIndex, currentEvent.line1Index, interPointRef));
        
                // insert the intersection event
                var tmpEvent = new events(0, interPointRef,                                           beforeRef.value.lineIndex,                                   currentEvent.line1Index);
                eventQueue.insert(tmpEvent);
            } 
        }
        
        if(afterRef!=null)
        {
            // check for intersection
            var interPointRef = new point(-1, -1);
            var interRes = get_segment_segment_intersection(tmpSegment, afterRef.value.line, interPointRef);
            if(interRes==true)
            {
                intersectionsRef.push(new intersection(currentEvent.line1Index, afterRef.value.lineIndex, interPointRef));
                
                // insert the intersection event
                var tmpEvent = new events(0, interPointRef,                                           currentEvent.line1Index,
                                          afterRef.value.lineIndex);
                eventQueue.insert(tmpEvent);
            } 
        }
        
    }
    else if(currentEvent.eventType == 1)
    {
        console.log("end event");
        
        // end
        var tmpSegment = segments[currentEvent.line1Index];
        var tmpSweptLine = new sweptLine(tmpSegment, currentEvent.line1Index);
        
        var beforeRef = sweptSegmetns.before(tmpSweptLine);
        var afterRef = sweptSegmetns.after(tmpSweptLine);
        
        sweptSegmetns.remove(tmpSweptLine);
        
        if(beforeRef !=null && afterRef!=null)
        {
            // check for intersection
            var interPointRef = new point(-1, -1);
            var interRes = get_segment_segment_intersection(afterRef.value.line, beforeRef.value.line, interPointRef);
            if(interRes==true)
            {
                intersectionsRef.push(new intersection(beforeRef.value.lineIndex, afterRef.value.lineIndex, interPointRef));
            
                // insert the intersection event
                var tmpEvent = new events(0, interPointRef,
                                          beforeRef.value.lineIndex,
                                          afterRef.value.lineIndex);
                eventQueue.insert(tmpEvent);
            }   
            
        }
    }
    
    else
    {
        console.log("intersection event");
        /*
        buggy 
        */
        // intersection point
        // swap the lines 
        // check for intersection 
        
        /*
        1st line is always less in y
        */
        var line1Index = currentEvent.line1Index;
        var line2Index = currentEvent.line2Index;
        
        // get segments
        var segment1 = segments[line1Index];
        var segment2 = segments[line2Index];
        
        // get sweptlines 
        var sweptLine1 = new sweptLine(segment1, line1Index);
        var sweptLine2 = new sweptLine(segment2, line2Index);
        
        var beforeRef = sweptSegmetns.before(sweptLine1);
        var afterRef = sweptSegmetns.after(sweptLine2);
        
        //console.log("before swaping", compare_function_sweepLine())
        // check intersection 
        
        var interPointRef = new point(-1 , -1);
        if(afterRef!=null){
            var interRes = get_segment_segment_intersection(segment1, afterRef.value.line, interPointRef);
            if(interRes==true)
                intersectionsRef.push(new intersection(line1Index, afterRef.value.lineIndex, interPointRef));
            
            // insert the intersection event
            var tmpEvent = new events(0, interPointRef,
                                      line1Index,
                                      afterRef.value.lineIndex);
            eventQueue.insert(tmpEvent);
            
            
        }
        
        if(beforeRef!=null){
            var interRes = get_segment_segment_intersection(beforeRef.value.line, segment2, interPointRef);
            if(interRes==true)
                intersectionsRef.push(new intersection(beforeRef.value.lineIndex, line2Index, interPointRef));
            
            // insert the intersection event
            var tmpEvent = new events(0, interPointRef,
                                      beforeRef.value.lineIndex,
                                      line2Index);
            eventQueue.insert(tmpEvent);
        }
        
        // delete 
        sweptSegmetns.remove(sweptLine1);
        sweptSegmetns.remove(sweptLine2);
        
        // swap their order 
        
        /*
        take care UR working with references !???
        which mean when I was updating the line points directly 
        this affects the original segments I have.
        */
        
        sweptLine1.line = new segment(currentEvent.p, sweptLine1.line.p2);
        sweptLine2.line = new segment(currentEvent.p, sweptLine2.line.p2);
        
        // add new 
        sweptSegmetns.insert(sweptLine1);
        sweptSegmetns.insert(sweptLine2);
        
        return ;
    }
    
    return ;
}