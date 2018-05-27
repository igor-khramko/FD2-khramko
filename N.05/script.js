function treeSum(data){
    var sum = 0;
    for(var i = 0; i < data.length; i++){
        if(typeof data[i] == "object"){
            sum+= treeSum(data[i]);
        } else{
            sum+= data[i];
        }
    }
    return sum;
}
console.log(treeSum([ 5, 7, [ 4, [2], 8, [1,3], 2 ], [ 9, [] ], 1, 8]));
