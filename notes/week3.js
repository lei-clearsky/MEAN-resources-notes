// Jan 29th workshop review - selector
var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];
  
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // if (matchFunc(startEl))
  //   resultSet.push(startEl);

  // your code here
  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements

  // solution 1 : use level order traversel
  // var q = [];
  // var head = 0;
  // q.push(startEl);

  // while(head <= q.length - 1){

  //   var node = q[head];

  //   if(matchFunc(node)){
  //     resultSet.push(node);
  //   }
  //   if(!!node.children.length){
  //     for (var i = 0; i < node.children.length; i ++) {
  //       q.push(node.children[i]);
  //     }
  //   }
  //   head ++;
  // }

  // solution 2: use pre-order traversal
  // function preorder(matchFunc, startEl){
  //   if (matchFunc(startEl))
  //     resultSet.push(startEl);
  //   console.log(startEl);
  //   if (!!startEl.children.length){
  //     for (var i = 0; i < startEl.children.length; i ++) {
  //       if (matchFunc(startEl))
  //         resultSet.push(startEl.children[i]);
  //       preorder(matchFunc, startEl.children[i]);
  //     }
  //   }
  // }
  
  // preorder(matchFunc, startEl);

  //solution 3: walkTheDom by Douglas Crockford
  //http://www.javascriptcookbook.com/article/Traversing-DOM-subtrees-with-a-recursive-walk-the-DOM-function
  // function walkTheDOM(node, func) {
  //   if (func(node)){
  //     resultSet.push(node);
  //   }
  //   node = node.firstChild;
  //   while (node) {
  //       walkTheDOM(node, func);
  //       node = node.nextSibling;
  //   }
  // }

  // walkTheDOM(startEl, matchFunc);

  //solution 4: walkTheDom by Douglas Crockford
  var child, childResultSet;
  if (matchFunc(startEl)){
    resultSet.push(startEl);
  }
  child = startEl.firstChild;
  while (child) {
      childResultSet = traverseDomAndCollectElements(matchFunc, child);
      resultSet = resultSet.concat(childResultSet);
      child = child.nextSibling;
  }

  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag
//
var selectorTypeMatcher = function(selector) {
  // your code here
  var type;
  // selector[0] === "#"
  if (selector.charAt(0) === "#"){
    type = 'id';
  } else if (selector.charAt(0) ==="."){
    type = 'class';
  } else {
    type = 'tag';
    // if (selector.match('/*\.*/')){
    // if (selector.split(".").length === 2)
    // if (selector.match(/\w+\.\w+/))
    if (selector.indexOf(".") !== -1){
      type += '.class';
    }
  }
  return type;
};

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    // define matchFunction for id
    var id = selector.slice(1);
    matchFunction = function (el) {
      return el.id === id;
    } 

  } else if (selectorType === "class") {
    // define matchFunction for class
     matchFunction = function (el) {
      if (el.nodeType === 3)
        return false;
      else{
        // Array.prototype.slice.call(...classList, 0);
        // [].slice.call(...classList, 0);
        return el.classList.contains(selector.slice(1));
      }
    }    
  } else if (selectorType === "tag.class") {
    // define matchFunction for tag.class
    matchFunction = function (el) {
      if (el.nodeType === 3)
        return false;
      else{      
        var selectorEls = selector.split('.');
        return el.tagName.toLowerCase() === selectorEls[0] && el.classList.contains(selectorEls[1]);
      }
    }     
  } else if (selectorType === "tag") {
    // define matchFunction for tag
    matchFunction = function (el) {
      if (el.nodeType === 3)
        return false;
      else{
        return el.tagName.toLowerCase() === selector.toLowerCase();
      }
    }     
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};


// Jan 31st workshop review - Sorting
function bubbleSort (arr) {
  var swaps;

  function swap(a,b) {
    var x = arr[a];
    arr[a] = arr[b];
    arr[b] = x;
  }

  while (swaps != 0) {
    swaps = 0;
    for (var i = 0; i < arr.length-1; i++) {
      if (arr[i] > arr[i+1]) {
        swap(i,i+1);
        swaps++;
      }
    }
  }

  return arr;
}

// merge sort functions
function split(arr) {
  if (arr.length === 1) return [[], arr];
  var halfwayPoint = Math.floor(arr.length/2);
  var right = arr.splice(halfwayPoint);
  return [arr, right];
}

function merge(left,right) {
  var merged = [];
  while(left.length > 0 || right.length > 0) {
    if (left.length && !right.length) {
      return merged.concat(left);
    } else if (right.length && !left.length){
      return merged.concat(right);
    } else {
      if (left[0] < right[0]) {
        merged.push(left.shift());
      } else {
        merged.push(right.shift());
      }
    }
  }
  return merged;
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  var splitHalves = split(arr);
  var left = splitHalves[0];
  var right = splitHalves[1];

  var leftSorted = mergeSort(left);
  var rightSorted = mergeSort(right);

  return merge(leftSorted, rightSorted);
}