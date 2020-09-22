/*

*/
class priority_queue
{
    constructor(size){
        this.size = size;
        var array = new Array(size);
        
    }
    
    enlarge(){
        var tmpArray = new Array(this.size*2);
        for(var index = 0; index<this.size(); index+=1)
            tmpArray[index] = this.array[index];
        this.array = tmpArray;
        this.size = this.size * 2;
        return ;
    }
    
    insert()
    {    
    }
    
    top()
    {
    }
    
    pop()
    {   
    }
    
    up()
    {
        
    }
    
    down()
    {
    }
}