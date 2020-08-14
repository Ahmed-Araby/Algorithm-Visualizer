class SortingAlgorithms
{

    constructor(compFunction)
    {
        this.compFunction = compFunction;
    }
    
    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }
      
    bubbleSort(array, drawerObj) 
    { 
        /*
        the inner structure is called game loop structure 
        */
        var i = 0;
        var j = 0;
        

        function update()
        {
            // update the algorithm
            j +=1;
            if(j == array.length - 1 - i)
            {
                j = 0;
                i+= 1;
            }
        }

        function draw(j)
        {
            // reflect the logic on the screen
            var comRes = array[j].height > array[j+1].height ? 1 : -1;

            if(comRes == 1){
                // swap 
                var tmpValue = array[j];
                array[j] = array[j+1];
                array[j+1] = tmpValue;
                
                // render
                drawerObj.render(array);
            }
            return ;
        }

        function loop()
        {
            update();
            draw(j);

            if(i < array.length)
                window.requestAnimationFrame(loop);
            else
                console.log("sorting is done");
        }
        window.requestAnimationFrame(loop);
        return ;
    }

    mergeSort()
    {

    }
}