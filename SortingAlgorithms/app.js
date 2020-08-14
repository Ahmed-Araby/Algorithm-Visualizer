// global variavbles 
var rectArray = []
var sortingAlgorithmObj = new SortingAlgorithms(rectCompFunction);
var drawerObj = new Drawer();
var canvas = document.getElementById("sortingCanvas");

/* setting the UI */
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 100;
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;


// logic 

function generateArray()
{
    //alert("generate array is entered");

    rectArray = [];

    var arraySize = parseInt(document.getElementById("arraySize").value);
    var rectWidth = Math.floor(canvasWidth / arraySize);
    var diffColors = Math.pow(16, 6);

    console.log(arraySize, rectWidth)
    for(var i=0; i<arraySize; i++){
        // rect height
        var randHeight = Math.random() * canvasHeight;
        
        // rect color
        var randInt = Math.floor(Math.random() * diffColors) + 1048576 ;
        randInt = Math.min(randInt, diffColors-1);
        var randHexColor = '#' + randInt.toString(16);
        
        var rectObject = new Rectangle(randHeight, rectWidth, randHexColor);
        rectArray.push(rectObject);
    }

    drawerObj.render(rectArray);
    return ;
}

function sort()
{
    var domSelect = document.getElementById("sortingAlgorithm");
    var sortAlgo = domSelect.options[domSelect.selectedIndex].value;

    if(sortAlgo=="bubleSort"){
        sortingAlgorithmObj.bubbleSort(rectArray,  drawerObj);
        //window.requestAnimationFrame(loop);
    }
    else{
        alert("not implemeented yet");
    }

    return ;
}