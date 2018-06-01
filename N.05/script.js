function treeSum(tree){
    var sum = 0;
    for(var i = 0; i < tree.length; i++){
        if(typeof tree[i] == "object"){
            sum+= treeSum(tree[i]);
        } else{
            sum+= tree[i];
        }
    }
    return sum;
}
var tree = [ 5, 7, [ 4, [2], 8, [1,3], 2 ], [ 9, [] ], 1, 8];
console.log(treeSum(tree));
