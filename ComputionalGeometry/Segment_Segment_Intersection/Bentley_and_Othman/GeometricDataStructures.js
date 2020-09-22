class point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        return ;
    }
    
    compare_function(p)
    {
        if(this.x == p.x && this.y == p.y)
            return 0;
        return -1; // undetermined
    }
}


class segment
{
    constructor(p1, p2)
    {
        this.p1 = p1;
        this.p2 = p2;
        this.type = this.line_type(p1, p2);
    }
    line_type(p1, p2)
    {
        if(p1.x == p2.x)
            return 'V';
        else if(p1.y==p2.y)
            return 'H';
        else
            return 'T'; // tilted 
    }
    get_slope()
    {
        if(this.type=='V')
            return 999999999;
        else if(this.type =='H')
            return 0;
        
        var slope = (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
        return slope;
    }
    get_Yintersection()
    {
        if(this.type=='V')
            return 999999;
        else if(this.type=='H')
            return this.p1.y;
        
        var slope = this.get_slope();
        var Yinter = this.p1.y - this.p1.x * slope;
        return Yinter;
    }
    
    compare_function(seg)
    {
        if(this.p1.compare_function(seg.p1) == 0 && 
          this.p2.compare_function(seg.p2) == 0)
            return 0;
        
        return -1; // not determined
    }
}
