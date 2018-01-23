import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Carousel, Icon } from 'antd';

import styles from './Index.less';
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', fontSize: 50, width: 50, height: 50, left: -50 }}
      onClick={onClick}
    >
      <Icon type="left" style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
    </div>
  );
}
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', fontSize: 50, width: 50, height: 50, right: -50 }}
      onClick={onClick}
    >
      <Icon type="right" style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
    </div>
  );
}

// const 
export default class CustomCarouser extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
    })).isRequired,
    visible: PropTypes.bool,
    currentIndex: PropTypes.number,
    hideCarouser: PropTypes.func
  }
  static defaultProps = {
    images: [{ src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
    { src: 'https://images.unsplash.com/photo-1453550486481-aa4175b013ea?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
    { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
    { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
    { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
    { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
    { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
    { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
    { src: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' }
    ],
    visible: false,
    currentIndex: 0,
    hideCarouser: () => { }
  }

  showModal = (index) => {
    this.setState({
      modalVisible: true,
      currentIndex: index
    });
  }
  hideModal = (currentIndex) => {
    this.setState({
      modalVisible: false,
    });
  }
  render() {
    const { images, visible, currentIndex, hideCarouser } = this.props;
    // logs('images', images);
    const carouselProps = {
      arrows: true,
      adaptiveHeight: true,
      initialSlide: currentIndex,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      infinite: false
    };
    return (
      <Modal
        title={null}
        width={700}
        visible={visible}
        footer={null}
        destroyOnClose={true}
        onCancel={() => hideCarouser()}
      >
        <div style={{ padding: '16px 24px 16px' }}>
          <Carousel {...carouselProps}>
            {
              images.map((img, i) =>
                <div key={i}>
                  <div className="image-modal-container" >
                    <img src={img.src} style={{ width: '100%' }} />
                  </div>
                </div>
              )
            }
          </Carousel>
        </div>
      </Modal>
    );
  }
}
