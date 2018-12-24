import React from 'react';
import {Button, message, Upload, Steps, Icon, Divider} from 'antd';
import reqwest from 'reqwest';

import {url} from "../config";
import "./excel.css";

const Step = Steps.Step;

const Dragger = Upload.Dragger;

class ExcelPage extends React.Component {

    state = {
        fileList: [],
        uploading: false
    };

    beforeUpload1 = (file) => {
        this.setState(state => ({
            fileList: [...state.fileList, file],
        }));
    };

    handleUpload = () => {
        const formData = new FormData();
        this.state.fileList.forEach((file) => {
            formData.append('files[]', file);
        });
        alert(JSON.stringify(formData));
        this.setState({ uploading: true });
        reqwest({
            url: 'http://' + url + '/exec?_mt=excel.uploadExcel',
            method: 'post',
            crossOrigin: true,
            withCredentials: true,
            processData: false,
            data: formData,
        }).then((data) => {
            if (data.code === global.respCode.noLogin) {
                this.setState({ noLoginRedirect: true });
            } else if (data.code !== global.respCode.success) {
                message.error('上传失败：' + data.msg);
            } else {
                this.setState({ fileList: [] });
                message.success('上传成功');
            }
        }, (err, msg) => {
            message.error('上传失败：' + msg);
        }).always(() => {
            this.setState({ uploading: false });
        });
    };

    render() {

        const props = {
            name: 'file',
            multiple: false,
            beforeUpload: this.beforeUpload1,
            customRequest: this.handleUpload,
        };
        
        return (
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger>
        );
    }
}


export default ExcelPage;