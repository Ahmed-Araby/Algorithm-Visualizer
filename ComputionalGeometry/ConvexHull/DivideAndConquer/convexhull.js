class point
{
    // in coordiantes 
    constructor(x, y)
    {
        this.x = x; // Horizontal direction
        this.y = y; // vertical direction
    }
}


class hull
{
    constructor(points){
        this.points = points;
        this.next = new Array(points.length);
        this.prev = new Array(points.length);
        this.points.sort(custom_sort_point);
    }
}



class convexhullAlgorithm
{
    constructor()
    {
    }
    
    divide_and_conquer(startIndex , endIndex , H)
    {
        // base case 
        var numOfPoints = endIndex - startIndex + 1;
        
        console.log(numOfPoints)
        
        if(numOfPoints==1){
            console.log("un expected case");
            return ;
        }
        
        if(numOfPoints == 2)
        {
            H.next[startIndex] = endIndex;
            H.prev[startIndex] = endIndex;
            
            H.next[endIndex] = startIndex;
            H.prev[endIndex] = startIndex;
        
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
            return ;
        }
        
        // get split 
        var medianIndex = parseInt((endIndex + startIndex) / 2);
        
        // solve subproblems
        this.divide_and_conquer(startIndex , medianIndex, H);
        this.divide_and_conquer(medianIndex + 1 , endIndex , H);
        
        // merge the two convex hulls using the 2 finger algorithm 
        this.merge(startIndex , medianIndex , endIndex , H);
        return ;
    }
    
    merge(startIndex , medianIndex , endIndex , H)
    {
        /*
        medianIndex is the forntier point from the left side.
        mediaIndex + 1 is the forntier point from the right side. 
        */
        
        /*
        get the upper tangent of the merged 
        hull
        */
        
        /*
        end points of the bridge
        */
        var lpIndex = medianIndex;
        var rpIndex = medianIndex+1;
        var cw = 1;
        
        while(cw==1)
        {
            cw = 0;
            // right to left
            var prevrpIndex = H.prev[rpIndex];
            var orientation = orientation_test(H.points[prevrpIndex], 
                                               H.points[rpIndex],
                                               H.points[lpIndex]);
            if(orientation == 'cw'){
                rpIndex = prevrpIndex;
                cw = 1;
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
        /*
        // this is the bug
        
        H.next[rpIndex] = lpIndex;
        H.prev[lpIndex] = rpIndex;
        */
        
        //console.log("borders 1", lpIndex , rpIndex);
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
        }
        
        // redirect 
        H.next[rightPUtang] = leftPUtang;
        H.prev[leftPUtang] = rightPUtang;
        
        H.next[lpIndex] = rpIndex;
        H.prev[rpIndex] = lpIndex;
        console.log("borders 1", lpIndex , rpIndex);
        
        return ;
    }
}