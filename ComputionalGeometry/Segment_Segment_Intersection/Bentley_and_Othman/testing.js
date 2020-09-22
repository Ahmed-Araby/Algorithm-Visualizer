/*
orientation is reused [tested before]
segment-segment intersection check []
- parallel 
- same line 
- vertical 
- 1 vertical , 1 H touched and not touched
- 1 V , tileted
- 1H, tilted
- 2 tilted

// this one is neat case 
var s1 = new point(3,5);
var e1 = new point(7,10);

var s2 = new point(2, 6);
var e2 = new point(8, 12);

var seg1 = new segment(s1, e1);
var seg2 = new segment(s2, e2);

var res = check_segment_segment_intersection(seg1, seg2);
console.log(res);
*/


/*
// test balanced binary search tree 
// as BST only not balanced 

// insert and remove 
/// remove don't keep track of the min and max values nodes
*/


/*
bst.insert(1);
bst.insert(5);
bst.insert(0);
bst.insert(1);
bst.insert(10);
bst.insert(-1);
bst.insert(7);
bst.insert(6);
bst.insert(8);
*/
/*
function compare_function(x, y)
{
    if(x>y)
        return 1;
    else if(x<y)
        return -1;
    return 0;
}

var bst = new AVLTree(compare_function);

var arr = [1, 0, -1, 5, 10, 11, 7, 6, 8];

for(elem of arr){
    console.log(bst.insert(elem));
}

bst.dfs();

//console.log("again")
//bst.dfs();

var x = 55 ;
console.log(x);
var beforeReference = bst.after(x);

if(beforeReference==null)
    console.log("Iam the biggest one ");
else 
    console.log("after me is ", beforeReference.value);
*/