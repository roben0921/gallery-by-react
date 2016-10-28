require('normalize.css/normalize.css');
require('styles/App.css');
import React from 'react';

let yeomanImage = require('../images/1.jpg');
// 获取图片相关信息
var imageDatas =require('../data/imageData.json')

// function getImgURL(imageDatas){
// 	for (var i=0; i<=imageDatas.length;i++){
// 		var singleImageData =imageDatas[i]
// 		singleImageData.imageURL =require('../images/'+singleImageData.fileName)
// 		imageDatas[i]=singleImageData;
// 	}
// 	return imageDatas
// }

//将图片名信息转换为URL路径信息
// getImgURL(ArrImageData)=>{
// 	for (let i of ArrImageData){
// 		i.imageURL =require('../images/'+i.fileName)
// 	}
// 	return ArrImageData
// }

// imageDatas=getImgURL(imageDatas)

class AppComponent extends React.Component {
  render() {
    return (
      <section>
      	
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
