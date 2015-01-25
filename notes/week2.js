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
