import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { thunkGetListTool } from '../../feature/tools/tool.slice';

DataCommonListener.propTypes = {};

function DataCommonListener(props) {
    // MARK: --- params ---
    const dispatch = useDispatch();
    // MARK: --- hooks ---
    useEffect(() => {
        dispatch(thunkGetListTool());
    }, []);
    return <></>;
}

export default DataCommonListener;
