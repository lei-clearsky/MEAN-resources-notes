<h1>Data Structure</h1>
<p>Memory, booleans, integer, floating point, arrays(why index start from 0), dynamic arrays(javascript/ruby)</p>
<p>Linked Lists - a sequence of data nodes, each contains data fields and a pointer to next node. Searching in linked list is very expensive. 
Doubly Linked Lists - store one more pointer
</p>
<p>Binary Search Tree - first node add is the root, the order the notes are added is important
. If a node is equal added to the tree, it always goes to the right. The depth of the tree is the maximen steps you need to search in the tree (log base 2 - keep cutting the search result half). Compared to linked list, the insert time involves more steps.</p>

<p>Hash Tables - what if log n time is still too slow? What if we wanted super fast look up. Benefit, it takes very short time to find, but take large space to store. Hashing - a function convert a string to a unique code. Lookup in hash table is O(1) time.</p>
<p>The following function only works for English languages: </p>
function hash_me(value, array_size){
	var asciiSum = 0;
	for (var i = 0; i <value.length; i++){
		asciiSum += value.charCodeAt(i);
	}
	return asciiSum % array_size;
}
<p>Hash table is expensive since it takes lots of space to store data.</p>
<p>Collisions in Hash tables - use linkedlist or other data structure to store key value pairs with colissions.</p>
<p>Binary Search Trees vs Hash Tables (HT becomes much more popular especially when memory gets cheaper)</p>
