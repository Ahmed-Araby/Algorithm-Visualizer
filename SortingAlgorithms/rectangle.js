class Rectangle
{
    constructor(height, width, color)
    {
        this.height = height;
        this.color = color;
        this.width = width;
    }
  
}

function rectCompFunction(rect1, rect2)
{
    if(rect1.height == rect2.height)
        return 0;
    else if(rect1.height < rect2.height)
        return 1;
    return -1;
}