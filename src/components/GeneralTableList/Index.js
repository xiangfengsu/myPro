import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'antd';

import styles from './Index.less';
export default class TableList extends PureComponent {
    static propTypes = {
        dataSource: PropTypes.array,
        columns: PropTypes.array,
        bordered: PropTypes.bool,
        size: PropTypes.oneOf(['default', 'small']),
        handleTableChange: PropTypes.func
    }
    static defaultProps = {
        dataSource: [],
        columns: [],
        bordered: true,
        size: 'default',
        handleTableChange: () => { }
    }
    constructor(props) {
        super(props);
    }
    render() {
        const { size, dataSource, columns, bordered, pagination, loading, handleTableChange } = this.props;
        // logs('pagination', pagination);
        return (
            <div className={styles.tableListWrap}>
                <Table
                    bordered={bordered}
                    dataSource={dataSource}
                    columns={columns}
                    loading={loading}
                    rowKey={record => record.id}
                    size={size}
                    pagination={false}
                />
                <Pagination
                    className="ant-table-pagination"
                    {...pagination}
                    onChange={handleTableChange}
                />
            </div>

        );
    }
} 
