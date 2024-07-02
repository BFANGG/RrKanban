import React, { useState } from 'react'
import "./ChangeAvatar.css";

import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import axios from 'axios';

export default function ChangeAvatar(props) {

    const [fileList, setFileList] = useState([]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };


    const handleUpload = () => {
        if (fileList.length) {
            const formData = new FormData();
            formData.append('image', fileList[0].originFileObj);
            axios.post("/api/upload/avatar", formData)
                .then(res => {
                    props.setIsChangeAvatar()
                })
                .catch(err => console.log(err));
        }
    }
    const beforeUpload = (file) => {//控制上传图片格式
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            console.log('您只能上传JPG/PNG 文件!');
            return;
        }
    }

    return (
        <div className='ChangeAvatar'>
            <div className='title'>Change your avatar</div>
            <ImgCrop rotationSlider>
                <Upload
                    customRequest={({ onSuccess }) =>
                        onSuccess("ok")}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    beforeUpload={beforeUpload}
                >
                    {fileList.length < 1 && '+ Upload'}
                </Upload>
            </ImgCrop>
            <button className='cancelbtn' onClick={props.setIsChangeAvatar}>Cancel</button>
            <button className='uploadbtn' onClick={handleUpload}>Upload</button>
        </div>
    )

}
