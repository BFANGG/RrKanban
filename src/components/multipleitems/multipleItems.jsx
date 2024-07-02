import React, { Component } from 'react'
import { Carousel } from 'antd';
import "./multipleitems.css";
import home1 from './mutipleimg/home1.png';
import home2 from './mutipleimg/home2.png';
import home3 from './mutipleimg/home3.png';
import home4 from './mutipleimg/home4.png';

export default class MultipleItems extends Component {
	onChange = (index) => {
		console.log(index)
	}
	render() {
		return (
			<div className='scrollImg'>
				<div className='scroll_box'>
					<Carousel afterChange={this.onChange}>
					<div>
					<img className='home1' src={home1} alt=''></img>
					</div>
					<div>
					<img className='home2' src={home2} alt=''></img>
					</div>
					<div>
					<img className='home3' src={home3} alt=''></img>
					</div>
					<div>
					<img className='home4' src={home4} alt=''></img>
					</div>
					</Carousel>
				</div>
			</div>
		)
	}
}

