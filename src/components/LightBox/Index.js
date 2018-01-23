import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Carousel, Icon } from 'antd';

import CustomCarouser from './Carouser';

import styles from './Index.less';

export default class Index extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
    })).isRequired
  }
  static defaultProps = {
    images: [{ src: 'https://ssl-img.che300.com/inception_img/PHOTO_1502782621405.jpg', name: '车架号' },
    { src: 'https://ssl-img.che300.com/inception_img/PHOTO_1502782574909.jpg', name: '发动机舱' },
    { src: 'https://ssl-img.che300.com/inception_img/PHOTO_1502782529640.jpg', name: '铭牌' },
    { src: 'https://ssl-img.che300.com/inception_img/PHOTO_1502782501665.jpg', name: '右A柱与右B柱' },
    { src: 'https://ssl-img.che300.com/inception_img/PHOTO_1502782470766.jpg', name: '右 C 柱' },
    { src: 'https://ssl-img.che300.com/inception_img/PHOTO_1502782452711.jpg', name: '右后 45 度' },
    { src: 'https://ssl-img.che300.com/inception_img/PHOTO_1502782420819.jpg', name: '后备箱' },
    { src: 'https://ssl-img.che300.com/inception_img/PHOTO_1502782410009.jpg', name: '后备箱底板' },
    { src: 'https://ssl-img.che300.com/inception_img/PHOTO_1502782205406.jpg', name: '中控台' }
    ]
  }
  state = {
    modalVisible: false,
    currentIndex: 0
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
    const { images } = this.props;
    const { modalVisible, currentIndex } = this.state;
    return (
      <div className={styles.lightBoxWrap}>
        <Row gutter={10}>
          {
            images.map((image, i) => {
              return (
                <Col key={`img_${i}`} xs={12} sm={8} md={6} xl={4} style={{ marginBottom: 16 }} >
                  <div className={styles.imgWrap} onClick={() => { this.showModal(i) }}>
                    <div className={styles.imgBox}>
                      <img src={image.src} />
                      <span className={styles.listItemAction}>
                        <Icon type="eye-o" style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: 16 }} />
                      </span>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      {
                        image.name
                      }
                    </div>
                  </div>
                </Col>
              )
            })
          }
        </Row>
        {
          images.length > 0 ? (
            <CustomCarouser
              visible={modalVisible}
              images={images}
              currentIndex={currentIndex}
              hideCarouser={this.hideModal}

            />
          ) : null
        }
      </div>
    );
  }
}
