alert("welcome to algorithm visualizer App");

function chooseAlgorithm()
{
    var docObj = document.getElementById("algoCategory");
    algorithmCategory = docObj.options[docObj.selectedIndex].value;
    
    window.location.href = './' + algorithmCategory + '/index.html';
    return ;
}