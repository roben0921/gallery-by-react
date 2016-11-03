require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import ReactDOM from 'react-dom'
// 获取图片相关信息
let imageDatas = require('json!../data/imageData.json')
imageDatas=((ArrImageData) => {
	for (let i of ArrImageData){
		i.imageURL =require('../images/'+i.fileName)
	}
	return ArrImageData
})(imageDatas)

/*
*获取区间内的一个随机值
*/
let getRangeRandom = (low,high) =>{
	return Math.ceil(Math.random()*(high - low) + low)
}

//获取 一个任意 0-30度的正负值
let get30DegRandom = () => {
  let deg = '';
  deg = (Math.random() > 0.5) ? '+' : '-'
  return deg + Math.ceil(Math.random() * 30)
}

class ImgFigure extends React.Component{
	constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
		//imgFigure 的点击处理函数
	}
	handleClick(e){
		if (this.props.arrage.isCenter) {
      this.props.inverse()
    } else {
      this.props.center();
    }
		e.stopPropagation()
		e.preventDefault()
	}
	render(){
		let styleObj ={}
		//如果props属性中指定了这张图片的位置，则使用
		if(this.props.arrage.pos){
			styleObj =this.props.arrage.pos
		}
		 //如果图片的旋转角度不为0 ，添加旋转角度
		if(this.props.arrage.rotate){
			(['MozTransform','WibkitTransform','MsTransform','transform']).forEach((value) =>{
				styleObj[value] ='rotate(' +this.props.arrage.rotate +'deg)'
			})
		}
		if (this.props.arrage.isCenter) {
      styleObj.zIndex = 11;
    }
		let imgFigureClassName = 'img-figure'
		imgFigureClassName += this.props.arrage.isInverse ? ' is-inverse' : ''
		return(
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-tit"> {this.props.data.title}</h2>
					<div className='img-back' onClick={this.handleClick}>
						 <p>
						 	{this.props.data.dsc}
						 </p>
					</div>
				</figcaption>
			</figure>
		);
	}
}

//控制组件
class ControllerUnit extends React.Component {
	constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		//如果点击的是当前选中态的图片，将图片居中，否则将图片居中
		if(this.props.arrage.isCenter)
		{
			this.props.inverse()
		}else{
			this.props.center()
		}
		e.stopPropagation()
		e.preventDefault()
	}
	render(){
		let controllerUnit ='controller-unit'
		if(this.props.arrage.isCenter)
		{
			controllerUnit += ' is-center'
			if(this.props.arrage.isInverse)
			{
				controllerUnit += ' is-inverse'
			}
		}
		return(
			<span className={controllerUnit} onClick={this.handleClick}></span>
		)
	}
}


class AppComponent extends React.Component {

constructor(props) {
  super(props);
	this.Constant={
		centerPos:{
			left:0,
			top:0
		},
		hPosRange:{			//水平方向取值范围
			leftSecX:[0,0],
			rightSecX:[0,0],
			y:[0,0]
		},
		vPosRange:{			//垂直方向取值范围
			x:[0,0],
			topY:[0,0]
		}
	}

	this.state = {
		imgsArrageArr:[
		// 	pos:{
		// 		left:'0',
		// 		top:'0'
		// }
		]
	}
}
	/*
	*翻转图片
	*@param index 输入当前被执行inverse操作对应图片信息的index值
	*@return {function} 只是一个闭包函数,其内ruturn 一个被执行的函数
	*/
	inverse(index){
		return () =>{
			let imgsArrageArr =this.state.imgsArrageArr
			imgsArrageArr[index].isInverse =!imgsArrageArr[index].isInverse

			this.setState({
				imgsArrageArr:imgsArrageArr
			})
		}
	}

  /*
   *利用rearramhe函数
   *居中对应index的图片
   */
  center(index) {
    return () => {
      this.reArrage(index);
    }
  }

	/*
	*重新布局所有图片
	*@param centerIndex 指定居中排布那个图片
	*/
	reArrage(centerIndex) {
		let imgsArrageArr =this.state.imgsArrageArr
		let Constant =this.Constant
		let centerPos =Constant.centerPos
		let hPosRange =Constant.hPosRange
		let vPosRange =Constant.vPosRange
		let hPosRangeLeftSecX =hPosRange.leftSecX
		let hPosRangeRightSecX =hPosRange.rightSecX
		let hPosRangeY =hPosRange.y
		let vPosRangeTopY =vPosRange.topY
		let vPosRangeX =vPosRange.x

		let imgsArrageTopArr =[]
		let topImgNum =Math.floor(Math.random() * 2)  //取1个或不取
		let topImgSpliceIndex =0
		let imgsArrageCenterArr =imgsArrageArr.splice(centerIndex,1)

		//首先居中 centerIndex 图片
		//imgsArrageCenterArr[0].pos = centerPos
		imgsArrageCenterArr[0] ={
			pos:centerPos,
			rotate:0,
			isCenter:true
		}
		//取出要布局上侧的图片的状态信息
		topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrageArr.length - topImgNum))
		imgsArrageTopArr = imgsArrageArr.splice(topImgSpliceIndex,topImgNum)
		//布局位于上侧的图片
		imgsArrageTopArr.forEach((value,index) =>{
			imgsArrageTopArr[index] = {
				pos:{
					top: getRangeRandom(vPosRangeTopY[0] ,vPosRangeTopY[1]),
					left:getRangeRandom(vPosRangeX[0] ,vPosRangeX[1])
				},
				rotate: get30DegRandom(),
				isCenter: false
			}
		})
		//部剧两侧的图片
		for(let i =0, j =imgsArrageArr.length,k =j/2 ; i < j ; i++){
			let hPosRangeLORX =null
			//前半部分布局左边 后半部分布局右边
			if(i < k){
				hPosRangeLORX =hPosRangeLeftSecX
			}else{
				hPosRangeLORX =hPosRangeRightSecX
			}
			imgsArrageArr[i]={
				pos :{
					top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
					left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
				},
				rotate: get30DegRandom(),
        isCenter: false
			}
		}

		if(imgsArrageTopArr && imgsArrageTopArr[0]){
			imgsArrageArr.splice(topImgSpliceIndex,0,imgsArrageTopArr[0])
		}
		imgsArrageArr.splice(centerIndex,0,imgsArrageCenterArr[0])
		this.setState({
			imgsArrageArr:imgsArrageArr
		})

	}
	//组件加载以后，为每张图片计算其位置范围
	componentDidMount() {
		//拿到舞台的大小
		let stageDOM = ReactDOM.findDOMNode(this.refs.stage)
		let stageW = stageDOM.scrollWidth
		let stageH = stageDOM.scrollHeight
		let halfStageW = Math.ceil(stageW/2)
		let halfStageH = Math.ceil(stageH/2)
		//拿到imagefig的大小
		let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0)
		let imgW = imgFigureDOM.scrollWidth
		let imgH = imgFigureDOM.scrollHeight
		let halfImgW = Math.ceil(imgW/2)
		let halfImgH = Math.ceil(imgH/2)
		//计算中心点的位置
		this.Constant.centerPos = {
			left:halfStageW - halfImgW,
			top:halfStageH - halfImgH
		}
		//计算左侧右侧图片的排布取值范围
		this.Constant.hPosRange.leftSecX[0] = -halfImgW
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW
		this.Constant.hPosRange.y[0] = -halfImgH
		this.Constant.hPosRange.y[1] = stageH - halfImgH

		//计算上侧图片的排布取值范围
		this.Constant.vPosRange.topY[0] = -halfImgH
		this.Constant.vPosRange.topY[1] = halfStageH -halfImgH * 3
		this.Constant.vPosRange.x[0] = halfStageW - imgW
		this.Constant.vPosRange.x[1] = halfStageW
		//this.reArrage(0)
		let num = Math.floor(Math.random() * 10);
    this.reArrage(num);
	}
  render() {
  	let controlUnits=[]
  	let imgFigures =[]
  	// imageDatas.forEach(function(value,index){
  	// 	imgfigures.push(<Imgfigure data={value}/>)
  	// });  错误写法❌
  	imageDatas.forEach((value, index) => {
  		if(!this.state.imgsArrageArr[index]){
  			this.state.imgsArrageArr[index] = {
  				pos:{
  					left:0,
  					top:0
  				},
  				rotate:0,
  				isInverse:false,
  				isCenter:false
  			}
  		}

      imgFigures.push( <ImgFigure data= {value} key={index} ref={'imgFigure'+index}
      arrage ={this.state.imgsArrageArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>)
      controlUnits.push( <ControllerUnit data= {value} key={index} arrage ={this.state.imgsArrageArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>)

    });
    return (
      <section className="stage" ref="stage">
      	<section className="img-sec">
      		{imgFigures}
      	</section>
      	<nav className="controller-nav">
      		{controlUnits}
      	</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
