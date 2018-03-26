import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Upload, Icon, Button, Modal, message } from 'antd';
import CustomCarouser from '../LightBox/Carouser';
export default class UploadImg extends Component {
  constructor(props) {
    super(props);
    const value = this.props.value || {};
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: value.fileList || [],
      carouserImages: [],
      carouserFirstIndex: 0
    };
    this.uploadTotalCounts = 0;
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    // logs('currFile', file);
    if (!file.thumbUrl) return;
    if (!/^image\/(gif|png|jpe?g)$/.test(file.type)) {
      message.error(`该文件不是图片类型，无法预览`);
      return
    }
    const { fileList } = this.state;
    const carouserImages = fileList.filter(file => {
      return file.status === 'done' && /^image\/(gif|png|jpe?g)$/.test(file.type)
    }).map(file => {
      return {
        src: file.url || file.thumbUrl,
        uid: file.uid
      }
    });
    const carouserFirstIndex = carouserImages.findIndex(cfile => {
      return cfile.uid === file.uid
    });
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
      carouserImages,
      carouserFirstIndex: carouserFirstIndex === -1 ? 0 : carouserFirstIndex
    });
  }

  handleChange = ({ file, fileList }) => {
    if (file.flag) return;
    const { listType } = this.props;
    const status = file.status;
    if (status === 'done') {
      message.success(`${file.name} 上传成功！.`);
    } else if (status === 'error') {
      message.error(`${file.name} 上传失败`);
    }
    fileList = fileList.filter((file) => {
      if (file.status) {
        return file.status !== 'error';
      }
      return true;
    });
    if (listType === 'text') {
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
    }

    logs(fileList);
    if (!('value' in this.props)) {
      this.setState({ fileList });
    }
    this.triggerChange({ fileList });
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      if (value) {
        this.setState(value);
      } else {
        this.setState({ fileList: [] });
      }
    }
  }
  triggerChange = (changedValue) => {
    // logs('changedValue', changedValue);
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, changedValue));
    }
  }
  beforeUpload = (file, fileList) => {
    const { size } = file;
    const { maxFileSize, maxFileCounts } = this.props;
    const maxSize = maxFileSize * 1024 * 1024;
    const preFileListLength = this.state.fileList.length;
    const currFileListLength = fileList.length;
    const num = preFileListLength + currFileListLength - maxFileCounts;
    const currFileIndex = fileList.findIndex(f => f.uid === file.uid);
    if (size > maxSize) {
      message.error(`文件大小不能超过${maxFileSize}M`);
      file.flag = true;
      return false;
    }
    if (num > 0) {
      const maxCanUploadFileNum = currFileListLength - num;
      for (let i = 0; i < currFileListLength; i++) {
        if (currFileIndex >= maxCanUploadFileNum) {
          message.error(`${file.name}不能上传，最多上传${maxFileCounts}张`);
          file.flag = true;
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  }
  onRemove = (file) => {
    Modal.confirm({
      title: '删除',
      content: '确认要删除该文件吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          this.triggerChange({ fileList: newFileList });
          return {
            fileList: newFileList,
          };
        });
        message.success(`删除成功！`);
      }
    });

    return false;
  }
  renderUploadBtn = () => {
    // 1:text  2:picture 3:picture-card
    const { listType } = this.props;
    let content = null;
    switch (listType) {
      case 'text':
        content = (<div><Button><Icon type="upload" /> 上传文件</Button></div>);
        break;
      case 'picture-card':
        content = (<div> <Icon type="plus" /><div className="ant-upload-text">上传</div></div>);
        break;
      case 'picture':
        content = (<div><Button><Icon type="upload" /> 上传文件</Button></div>);
        break;
    }
    return content;
  }
  render() {
    const { previewVisible, previewImage, fileList, carouserImages, carouserFirstIndex } = this.state;
    const { action, maxFileCounts, multiple, acceptType, listType } = this.props;
    return (
      <div className="clearfix">
        <Upload
          action={action}
          accept={acceptType}
          multiple={multiple}
          listType={listType}
          fileList={fileList}
          onPreview={listType === 'text' ? null : this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
        >
          {fileList.length >= maxFileCounts ? null : this.renderUploadBtn()}
        </Upload>
        {
          carouserImages.length > 0 ? (
            <CustomCarouser
              visible={previewVisible}
              images={carouserImages}
              currentIndex={carouserFirstIndex}
              hideCarouser={this.handleCancel}

            />
          ) : null
        }


      </div>
    );
  }
}