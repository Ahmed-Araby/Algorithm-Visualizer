alert("welcome to algorithm visualizer App");

function chooseAlgorithm()
{
    var docObj = document.getElementById("algoCategory");
    algorithmCategory = docObj.options[docObj.selectedIndex].value;
    if(algorithmCategory == "SortingAlgorithms" ) // sorting algo 
        window.location.href = './' + algorithmCategory + '/index.html';
    else // convex hull
        window.location.href = './' + algorithmCategory + '/ConvexHull/DivideAndConquer/index.html';
    return ;
}
