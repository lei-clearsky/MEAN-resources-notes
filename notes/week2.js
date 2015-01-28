// review assessment 00 solution on 01/24/2015
var isVowel = function(char){
	var vowels = "aeiou";
	return vowels.indexOf(char) > -1; // or != -1
}

var vowelsCount = function(str) {
	var count = 0;
	str = toLowerCase();
	for (var i = 0; i < str.length; i++) {
		if( isVowel(str.charAt(i)) )
			count ++;
	}	
	return count;
		
}

var vowelsCountR = function(str) {
	var strArr = str.match(/[aeiou]/ig);
	if(strArr){		
		return strArr.length;
	}else{
		return 0;
	}
} 

var stringAdditionR = function(str) {
	var numArr = str.match(/\d+/g);
	var num = 0;
	if(numArr){
		var numArrLen = numArr.length;
		while(numArrLen --){
			num += Number(numArr[numArrLen]);
		}
	}
	
	return num;
}

var stringAddition = function(str) {
	var sum = 0;
	var j;
	var nums = [];
	var strLen = str.length;
	for(var i = 0; i < strLen; i++) {
		j = i;
		var numStr = "";
		while(!isNaN(str[j])){
			numStr += str[j];
			j++;
			i++;
		}
		if(numStr != ""){
			nums.push(parseInt(numStr));
		}

	}
	var l = nums.length;
	while(l--){
		sum += nums[l];
	}
	return sum;
}

// review queue and linkedlist implementation on 01/24/2015
// implementing Queue in javascript
function Queue() {
	this.head = null;
	this.tail = null;
	this.queueObj = {};
}

Queue.prototype.enqueue = function(data){
	if (this.head === null) {
		this.head = 0;
		this.tail = 0;
	}else{
		this.tail ++;
	}
	this.queueObj[this.tail] = data;
}

Queue.prototype.dequeue = function(){
	if (this.head === null) {
		return undefined;
	} else if (this.head === this.tail){
		delete this.queueObj[this.head];
		this.head = null;
		this.tail = null;
	} else {
		var deleteEl = this.queueObj[this.head];
		delete this.queueObj[this.head];
		this.head ++;
		return deletedEl;
	}
}

Queue.prototype.size = function(){
	if(this.head === null) {
		return 0;
	} else {
		return this.tail - this.head + 1;
	}	
}
// implementing LinkedList in javascript
function LinkedList(){
	this.head = undefined;
	this.tail = undefined;

}

function Node(val){
	this.val = val;
	this.next = null;
	this.previous = null;
}

LinkedList.prototype.isEmpty = function(){
	return typeof this.head === "undefined";
}

LinkedList.prototype.addToTail = function(val){
	var newNode = new Node(val);
	if (this.isEmpty()) {
		this.head = this.tail = newNode;
	} else{
		// var currentTail = this.tail;
		// currentTail.next = newNode;
		// newNode.previous = currentTail;
		// this.tail = newNode;
		this.tail.next = newNode;
		newNode.previous = this.tail;
		this.tail = newNode;
	}

}
LinkedList.prototype.addToHead = function(val){
	var newNode = new Node(val);
	if (this.isEmpty()) {
		this.head = this.tail = newNode;
	} else{
		// var currentHead = this.head;
		// currentHead.previous = newNode;
		// newNode.next = currentHead;
		// this.head = newNode;
		this.head.previous = newNode;
		newNode.next = this.head;
		this.head = newNode;
	}

}
LinkedList.prototype.removeTail = function(){
	var deleteTail = this.tail;
	
	if (this.isEmpty()) {
		return undefined;
	} else if (this.head === this.tail) {

		this.head = this.tail = undefined;
	} else {
		var newTail = this.tail.previous;
		newTail.next = null;
		this.tail = newTail;
		// this.tail = this.tail.previous;
		// this.tail.next = null;
	}
	var deleteVal = deleteTail.val;
	delete deleteTail;
	return deleteVal;

}
LinkedList.prototype.removeHead = function(){
	var deleteHead = this.head;
	
	if (this.isEmpty()) {
		return undefined;
	} else if (this.head === this.tail) {

		this.head = this.tail = undefined;
	} else {
		var newHead = this.head.next;
		newHead.previous = null;
		this.head = newHead;
	}
	var deleteVal = deleteHead.val;
	delete deleteHead;
	return deleteVal;

}
LinkedList.prototype.search = function(val){
	var searchVal = this.head;
	var searchFunc = function(val){
		if (searchVal.val === val)
			return val;
		else if (searchVal.next === null)
			return null;
		else{
			searchVal = searchVal.next;
			return searchFunc(val);
		}
	}
	return searchFunc(val);

}
// Hash Table Javascript Implementation
function Hash() {
	this.numBuckets = 25;
	this.hashArr = [];

}
Hash.prototype._hash = function(key){
	var sum = 0;
	for (var i = 0; i < key.length; i++) {
		sum += key.charCodeAt(i);
	}
	return sum % this.numBuckets;
}
Hash.prototype.set = function(key, value){

	if (typeof key !== 'string'){
		throw "Keys must be strings";
	}
	var hashResult = this._hash(key);
	if (this.hashArr[hashResult] === undefined){
		this.hashArr[hashResult] = new LinkedList();
		this.hashArr[hashResult].addToHead(new HashData(key, value));
	}else{
		var hashLinkedList = this.hashArr[hashResult];
		hashLinkedList.searchOrReplace(key, value);

	}

}
Hash.prototype.get = function(key){
	var hashResult = this._hash(key);
	var returnLinkedList = this.hashArr[hashResult];
	if (returnLinkedList.search(key)){
		return returnLinkedList.search(key);
	}		

}
Hash.prototype.hasKey = function(key){
	var hashResult = this._hash(key);
	var returnLinkedList = this.hashArr[hashResult];
	//return returnLinkedList.search(key) === key? true: false;
	return !!returnLinkedList.search(key);
}

function HashData(key, value){
	this.key = key;
	this.value = value;
}

// Linkedlist
function LinkedList () {
}

function Node (value) {
  this.value = value;
  this.next = null;
  this.previous = null;
}

function makeNode(value) {
  return {
    value: value,
    next: null,
    previous: null
  }
}

LinkedList.prototype.isEmpty = function() {
  return typeof this.head == "undefined";
}

LinkedList.prototype.addToTail = function(value) {
  var nodeToAdd = new Node(value);
  if(this.isEmpty()) {
    this.head = nodeToAdd;
    this.tail = nodeToAdd;
  } else {
    this.tail.next = nodeToAdd;
    nodeToAdd.previous = this.tail;
    this.tail = nodeToAdd;
  }
};

LinkedList.prototype.addToHead = function(value) {
  var nodeToAdd = new Node(value);
  if(this.isEmpty()) {
    this.head = nodeToAdd;
    this.tail = nodeToAdd;
  } else {
    nodeToAdd.next = this.head;
    this.head.previous = nodeToAdd;
    this.head = nodeToAdd;
  }
};

LinkedList.prototype.removeHead = function() {
  var currentHead = this.head;

  if (this.isEmpty()) {
    // if empty
    return undefined;
  } else if (this.head === this.tail) {
    // if one item in LL
    this.head = undefined;
    this.tail = undefined;
  } else {
    // if more than one item in LL
    this.head = this.head.next;
    this.head.previous = null;
  }
  var value = currentHead.value;
  delete currentHead;
  return value;
};

LinkedList.prototype.removeTail = function() {
  var currentTail = this.tail;

  if (this.isEmpty()) {
    // if empty
    return undefined;
  } else if (this.head === this.tail) {
    // if one item in LL
    this.head = undefined;
    this.tail = undefined;
  } else {
    // if more than one item in LL
    this.tail = this.tail.previous;
    this.tail.next = null;
  }
  var value = currentTail.value;
  delete currentTail;
  return value;
};

// iterative search
LinkedList.prototype.search = function(value) {
  var currHead = this.head;
  while(currHead) {
    if (currHead.value == value) {
      return value;
    } else {
      currHead = currHead.next;
    }
  }
  return null;
};

LinkedList.prototype.search = function(key, startNode) {
  if (typeof startNode == "undefined") {
    startNode = this.head;
  }

  if (startNode.value.key === key) {
    return startNode.value.value;
  } else if( startNode.next === null) {
    return null;
  } else {
    return this.search(key, startNode.next);
  }

};

LinkedList.prototype.searchOrReplace = function(key, value, startNode) {
  if (typeof startNode == "undefined") {
    startNode = this.head;
  }

  if (startNode.value.key === key) {
    startNode.value.value = value;
  } else if( startNode.next === null) {
    this.addToHead(new HashData(key, value));
  } else {
    return this.search(key, value, startNode.next);
  }

};


