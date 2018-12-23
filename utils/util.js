function convertToStarsArray(stars){
  var num1 = stars.toString().substring(0,1);
  var num2 = stars.toString().substring(1,2);
  var array=[];
  var tag = 0;
  for(var i=1;i<=5;i++){
    if(i<=num1){
      array.push(1);
      tag++;
    }
    else if(num2==5&&tag==num1){
      array.push(2);
      tag++;
    }
    else{
      array.push(0);

    }
  }
  // console.log(array);
  return array;
}
 function http(url,callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": ""
    },
    success: function (res) {
      callback(res.data);
    },
    fail: function (error) {
      console.log(error)
    },
  })
}
function convertToCastString(casts){
  var castsjoin ="";
  for(var idx in casts){
    castsjoin = castsjoin + casts[idx].name +"/";
  }
  return castsjoin.substring(0,castsjoin.length-2);
}
function convertToCastInfos(casts){
  var castsArray = []
  for (var idx in casts){
    var cast ={
      img:casts[idx].avatars?casts[idx].avatars.large:"",
      name:casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}
module.exports = {
 convertToStarsArray:convertToStarsArray,
 http:http,
  convertToCastString:convertToCastString,
  convertToCastInfos: convertToCastInfos
}