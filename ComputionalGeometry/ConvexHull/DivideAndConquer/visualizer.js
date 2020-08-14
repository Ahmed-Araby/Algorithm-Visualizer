class screenshoot
{
    constructor(startIndex , endIndex)
    {
        this.startIndex  = startIndex;
        this.endIndex = endIndex;
        return ;
    }
}

 
class visualizer
{


    DivideAndConquer(startIndex, endIndex, H, stack)
    {   
        console.log(startIndex, endIndex);
        // base case 
        var numOfPoints = endIndex - startIndex + 1;
        if(numOfPoints==1)
            return ;

        if(numOfPoints == 2)
        {
            H.next[startIndex] = endIndex;
            H.prev[startIndex] = endIndex;

            H.next[endIndex] = startIndex;
            H.prev[endIndex] = startIndex;
            
            stack.pop();
            popCount +=1;
            return ;
        }

        else if(numOfPoints == 3)
        {
            var orientation = orientation_test(H.points[startIndex],
                                              H.points[startIndex+1], 
                                              H.points[endIndex]);
            if(orientation=='ccw'){
                H.next[startIndex] = startIndex+1;
                H.next[startIndex+1] = endIndex;
                H.next[endIndex] = startIndex;

                H.prev[endIndex] = startIndex +1;
                H.prev[startIndex+1] = startIndex;
                H.prev[startIndex] = endIndex;
            }

            else{
                /*
                col may produce a bug

                */
                H.next[endIndex] = startIndex+1;
                H.next[startIndex+1] = startIndex;
                H.next[startIndex] = endIndex;

                H.prev[startIndex] = startIndex+1;
                H.prev[startIndex+1] = endIndex;
                H.prev[endIndex] = startIndex;
            }

            stack.pop();
            popCount +=1;
            return ;
        }

        // get split 
        var medianIndex = parseInt((endIndex + startIndex) / 2);


        // visualize current subproblem 
            
        // reinitialize the screen 
        cntx1.fillStyle = initialColor;
        cntx1.fillRect(0, 0, canvasWidth, canvasHeight);
        draw_points(H.points);
        
        // render the vertical lines boundries
        var leftBorderUp = new point(H.points[startIndex].x, 0);
        var leftBorderDown = new point(H.points[startIndex].x, window.innerHeight-1);

        var splitLineUp = new point(H.points[medianIndex].x , 0);
        var splitLineDown = new point(H.points[medianIndex].x , window.innerHeight-1);

        var rightLineUp = new point(H.points[endIndex].x , 0);
        var rightLineDown = new point(H.points[endIndex].x , window.innerHeight-1);

        draw_line(leftBorderUp, leftBorderDown, VericalLineColor, verticalLineWidth);

        draw_line(splitLineUp, splitLineDown, VericalLineColor, verticalLineWidth);

        draw_line(rightLineUp, rightLineDown, VericalLineColor, verticalLineWidth);
        // end of visualization 


        // store screen shoots for the subproblems
        stack.push(new screenshoot(medianIndex+1 , endIndex));
        stack.push(new screenshoot(startIndex, medianIndex));

        return ;
    }

    merge(startIndex, endIndex, H, stack)
    {
        var medianIndex = parseInt((endIndex + startIndex) / 2);
        var lpIndex = medianIndex;
        var rpIndex = medianIndex+1;
        var cw = 1;

        while(cw==1)
        {
            this.render(startIndex, endIndex, H.points[lpIndex],
                        H.points[rpIndex], H.points[medianIndex],
                        H.points[medianIndex+1], H);
            cw = 0;
            // right to left
            var prevrpIndex = H.prev[rpIndex];
            var orientation = orientation_test(H.points[prevrpIndex], 
                                               H.points[rpIndex],
                                               H.points[lpIndex]);
            if(orientation == 'cw'){
                rpIndex = prevrpIndex;
                cw = 1;
            this.render(startIndex, endIndex, H.points[lpIndex],
                       H.points[rpIndex], H.points[medianIndex],
                       H.points[medianIndex+1], H);
            }

            // left to right
            var nextlpIndex = H.next[lpIndex];
            orientation = orientation_test(H.points[rpIndex],
                                           H.points[lpIndex],
                                           H.points[nextlpIndex]);
            if(orientation =='cw'){
                lpIndex = nextlpIndex;
                cw = 1;
            }
        }

        // redirect
        var rightPUtang = rpIndex;
        var leftPUtang = lpIndex;
        
        // end points of the bridge
        lpIndex = medianIndex;
        rpIndex = medianIndex+1;
        cw = 1;

        /*
        get the lower tangent of the merged 
        hull 
        */

        while(cw == 1)
        {
           this.render(startIndex, endIndex, H.points[leftPUtang],
                       H.points[rightPUtang], H.points[lpIndex],
                       H.points[rpIndex], H);

            cw = 0;

            // right to left 
            var nextrpIndex = H.next[rpIndex];
            var orientation = orientation_test(H.points[lpIndex], 
                                              H.points[rpIndex], 
                                              H.points[nextrpIndex]);
            console.log("lower , ", orientation, lpIndex , rpIndex,H.next[rpIndex]);
            if(orientation=='cw'){
                rpIndex = nextrpIndex;
                cw = 1;
            }

            // left to right 
            var prevlpIndex = H.prev[lpIndex];
            orientation = orientation_test(H.points[prevlpIndex], 
                                          H.points[lpIndex], 
                                          H.points[rpIndex]);
            if(orientation=='cw'){
                lpIndex = prevlpIndex;
                cw = 1;
            }
            this.render(startIndex, endIndex, H.points[leftPUtang],
                       H.points[rightPUtang], H.points[lpIndex],
                       H.points[rpIndex], H);
        }

        // redirect 
        H.next[rightPUtang] = leftPUtang;
        H.prev[leftPUtang] = rightPUtang;

        H.next[lpIndex] = rpIndex;
        H.prev[rpIndex] = lpIndex;
        console.log("borders 1", lpIndex , rpIndex);

        return ;
    }

    render(startIndex, endIndex, tangentUpLeft, tangentUpRight,
          tangentDownLeft, tangentDownRight, H)
    {
        var medianIndex = parseInt((endIndex + startIndex) / 2);
        
        // reinitialize the screen 
        cntx1.fillStyle = initialColor;
        cntx1.fillRect(0, 0, canvasWidth, canvasHeight);
        draw_points(H.points);
        
        // render the vertical borders 
        // visualize current subproblem 
        var leftBorderUp = new point(H.points[startIndex].x, 0);
        var leftBorderDown = new point(H.points[startIndex].x, window.innerHeight-1);

        var splitLineUp = new point(H.points[medianIndex].x , 0);
        var splitLineDown = new point(H.points[medianIndex].x , window.innerHeight-1);

        var rightLineUp = new point(H.points[endIndex].x , 0);
        var rightLineDown = new point(H.points[endIndex].x , window.innerHeight-1);

        draw_line(leftBorderUp, leftBorderDown, VericalLineColor, verticalLineWidth);

        draw_line(splitLineUp, splitLineDown, VericalLineColor, verticalLineWidth);

        draw_line(rightLineUp, rightLineDown, VericalLineColor, verticalLineWidth);
        // end of visualization 

        var medianIndex = parseInt((endIndex + startIndex) / 2);

        // render the left convex hull 
        build_convex_hull_from_index_pointers(startIndex , medianIndex , H, hullSegmentColor, hullLineWidth);

        // redner the right convex hull 
        build_convex_hull_from_index_pointers(medianIndex+1, endIndex, H,
                                             hullSegmentColor, hullLineWidth);

        // render the tangent lines 
        draw_line(tangentUpLeft, tangentUpRight, upperTangentColor,
                 tangentLineWidth);

        draw_line(tangentDownLeft, tangentDownRight, lowerTangentColor, 
                 tangentLineWidth);

        return;
    }
}