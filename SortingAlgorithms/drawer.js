class Drawer
{

    drawRectangle(index, width, height, color)
    {
        // (col , row) = (x , y) = (width X height)

        var startPixel_col  = index * width;
        var startPixel_row = canvasHeight - height;

        var ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(startPixel_col, startPixel_row, width, height);
        ctx.save();
        return ;
    }

    clearRectangle(index, width, height)
    {

        var startPixel_col  = index * width;
        var startPixel_row = canvasHeight - height;

        var ctx = canvas.getContext('2d');
        ctx.clearRect(startPixel_col, startPixel_row, width, height);
    }

    render(array)
    {
        // clear the screen 
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // render rectangles
        for(var i=0; i<array.length; i++){
            var rectHeight = array[i].height;
            var rectHexColor = array[i].color;
            var rectWidth = array[i].width;

            this.drawRectangle(i, rectWidth, rectHeight, rectHexColor);
        }
        return ;
    }
}