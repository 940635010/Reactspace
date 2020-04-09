import React, {Component} from 'react'
import { Upload,Icon, Modal } from 'antd';
export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false, //标识是否显示大图预览Modal
    previewImage: '',//大图的url
    fileList: [
      {
        uid: '-1', //每个file都有自己唯一的id
        name: 'image.png', //图片文件名
        status: 'done',//图片状态   done  以上传  uploading 正在上传中
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
      console.log(file)
      //显示指定file对应的大图
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
      
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/api/manage/img/upload" //上传图片的接口地址
          accept='image/*'  //只接收图片格式
          name='image'  //请求参数
          listType="picture-card"  //卡片样式
          fileList={fileList} //所有已上传图片文件对象的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

