// upload组件使用
import { Button, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
//引入上传的接口
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./FileEdit.css";
import axios from 'axios';



// import {
//     upload,
//   } from "@/api/upload.js"; //引入上传的接口


/*定义允许上传的文件后缀*/
const filePostfix =
    "'jpg', 'jpeg', 'png','bmp','svg','gif', 'doc','docx', 'xls', 'xlsx', 'ppt','pptx','pdf'";

export default function FileInfo(props) {

    const [form] = Form.useForm();
    //上传文件列表
    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    // 文件上传预处理事件
    const beforeUploadHandler = (file) => {
        let splitByDot = file.name.split(".");
        //取最后一个“.”后的内容：1.1.jpg
        let postfix = splitByDot[splitByDot.length - 1];
        const check = fileList.length < 5;
        // 控制上传文件类型
        if (!check) {
            message.warning("最多上传五个文件");
        } else {
            if (filePostfix.indexOf(postfix) > -1) {
                fileList.push(file);
            } else {
                message.warning(
                    "文件格式不正确: 仅支持图片、word、ppt、excel类型的文件！"
                );
            }
        }
        return false;
    };
    // 删除文件处理事件
    // 删除文件处理事件
    const handleRemove = (file) => {
        let idx = fileList.indexOf(file);
        let arr = [];
        for (let i = 0; i < fileList.length; i++) {
            arr[i] = fileList[i];
        }
        while (idx !== fileList.length - 1) {
            arr[idx] = fileList[idx + 1];
            idx++;
        }
        if (idx == fileList.length - 1) {
            arr.pop();
        }
        setFileList(arr);
        return true;
    };

    const uploadFile = () => {
        if (fileList.length) {
            fileList.map((file => {
                const formData = new FormData();
                formData.append('file', file.originFileObj);
                axios.post(`/api/upload/file/${props.cardId}`, formData)
                    .then(res => {
                        message.success(res.data.message);
                        setFileList([]); // 文件列表清空
                        props.setRefreshCard();
                        props.setIsFileEdit();
                    })
                    .catch((error) => {
                        message.error(error);
                        console.log(error);
                    });
            }))
        }
    }

    return (
        <div className='FileEdit'>
            <div className='title'>File</div>
            <button className='closebtn' onClick={props.setIsFileEdit} ><AiOutlineClose className='icon' /></button>
            <div className='text1'>Add a file from your computer</div>

            <div>
                <Upload
                    customRequest={({ onSuccess }) =>
                        onSuccess("ok")}
                    accept={filePostfix}
                    fileList={fileList}
                    showUploadList={true}
                    onRemove={handleRemove}
                    onChange={onChange}
                >

                    <Button
                        className="uploadbtn"
                        icon={<UploadOutlined />}
                    >
                        {fileList.length < 5 && 'Click To Upload'}
                    </Button>
                </Upload>
                <div className="btnbox" style={{ marginBottom: "10px" }}>
                    <Button className="submitbtn" type="primary" onClick={uploadFile}>
                        submit
                    </Button>
                </div>
            </div>
        </div>
    )
};
