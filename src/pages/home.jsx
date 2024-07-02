import React, { Component } from 'react';
import "./home.css";
import { BsKanban } from 'react-icons/bs';
import image1 from '../images/homeimg1.png';
import image2 from '../images/homeimg2.png';
import MultipleItems from '../components/multipleitems/multipleItems';
import Navbar from '../components/Navbar/Navbar';

export default class Home extends Component {
    render() {
        return (
            <div className='homebox'>
                <Navbar/>
                <div className='box1'>
                    <div className="smallbox1">
                        <BsKanban className='icon' />
                    </div>
                    <div className='smallbox2'>
                        <h1 className='appname'>RrKanban</h1>
                        <h1 className='appname1'>对对看板</h1>
                        <h3 className='appintro'>一个可视化项目协作工具</h3>
                        <h4 className='appintro1'>让每个愿意提升效率的新手快速加入，成为效率达人！</h4>
                    </div>
                </div>
                <div className='box2'>
                    <p className='introtitle'>任务协作常见痛点</p>
                    <div className='introduction'>
                        <li>任务太多难跟进：在工作群、邮件或用口头布置任务时，易遗忘难追踪</li>
                        <li>执行情况难掌握：无法掌握团队具体任务进展，如果不主动追问就拖延</li>
                        <li>推诿扯皮难追责：责任划分不清晰，协作过程没留痕，出现问题就扯皮</li>
                    </div>
                    <div className='pic1'>
                        <img className='img1' src={image2} alt=''></img>
                    </div>
                </div>
                <div className='box3'>
                    <div className='pic2'>
                        <img className='img2' src={image1} alt=''></img>
                    </div>
                    <div className='smallbox'>
                        <p className='introtitle'>Rrkanban如何解决</p>
                        <div className='introduction'>
                            <li>任务汇总管理：同步团队任务做全生命周期管理，实时跟进，永久留存</li>
                            <li>进度时刻掌握：通过看板、甘特图、仪表盘全局掌握人和事的进度数据</li>
                            <li>过程透明可追溯：任务均可指派到人，协作过程全留痕，助力复盘改进</li>
                        </div>
                    </div>
                </div>
                <div className='box4'><MultipleItems /></div>
                <div className='box5'>
                    <div className='small1'>
                        <BsKanban className='icon1' />
                        <h2 className='appname'>Rrkanban</h2>
                        <h3 className='appname1'>对对看板</h3>
                        <h3 className='intro'>一个可视化项目协作工具</h3>
                    </div>
                    <div className='small2'>
                        <h4>产品</h4>
                        <a className='a1' href='##'>首页</a>
                        <a className='a2' href='##'>解决方案</a>
                        <a className='a3' href='##'>博客</a>
                    </div>
                    <div className='small3'>
                    <h4>帮助</h4>
                        <a className='a1' href='##'>帮助手册</a>
                        <a className='a2' href='##'>上手视频</a>
                        <a className='a3' href='##'>反馈问卷</a>
                    </div>
                    <div className='small4'>
                    <h4>关于</h4>
                        <a className='a1' href='##'>关于我们</a>
                        <a className='a2' href='##'>合作</a>
                    </div>
                </div>
            </div>
        )
    }
}
