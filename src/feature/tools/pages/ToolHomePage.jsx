import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import ToastHelper from '../../../shared/helper/ToastHelper';
import { thunkReviewProject } from '../../projects/project.slice';

ToolHomePage.propTypes = {
    projectId: PropTypes.number,
    onSubmit: PropTypes.func,
};

function ToolHomePage(props) {
    // MARK: --- params ---
    const { projectId, onSubmit } = props;
    const refFormik = useRef();
    const { tools } = useSelector((state) => state.tool);
    const dispatch = useDispatch();

    // MARK: --- functions ---
    function handleSubmit(values) {
        const params = { ...values };

        if (params.toolIds.length === 0) {
            return ToastHelper.showWarning('Bạn chưa chọn tool nào');
        }

        if (onSubmit) {
            onSubmit();
        }

        dispatch(thunkReviewProject({ projectId }));

        return;
    }

    // MARK: --- hooks ---

    return (
        <Formik
            initialValues={{
                projectId: projectId,
                toolIds: [],
            }}
            validationSchema={Yup.object({
                projectId: Yup.number().required(),
            })}
            enableReinitialize
            onSubmit={handleSubmit}
        >
            {(formikProps) => {
                refFormik.current = formikProps;

                return (
                    <div className="px-4 py-6 d-flex flex-column h-100">
                        <h3 className="font-weight-bolder">Tools</h3>
                        <div className="flex-grow-1 d-flex flex-column gap-3">
                            {tools.map((tool) => (
                                <label
                                    key={tool.id}
                                    className={`checkbox ${!projectId ? 'checkbox-disabled' : ''}`}
                                >
                                    <input
                                        disabled={!projectId}
                                        type="checkbox"
                                        checked={
                                            !!formikProps
                                                .getFieldProps('toolIds')
                                                .value.find((id) => id == tool.id)
                                        }
                                        name={`checkbox_${tool?.id}`}
                                        onChange={(e) => {
                                            let prevValues =
                                                formikProps.getFieldProps('toolIds').value;
                                            if (e.target.checked) {
                                                prevValues = prevValues.concat(tool.id);
                                            } else {
                                                prevValues = prevValues.filter(
                                                    (value) => value != tool.id
                                                );
                                            }
                                            formikProps
                                                .getFieldHelpers('toolIds')
                                                .setValue(prevValues);
                                        }}
                                    />
                                    <span className="mr-3"></span>
                                    {tool?.name}
                                </label>
                            ))}
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <button
                                type="submit"
                                onClick={(e) => {
                                    formikProps.handleSubmit();
                                }}
                                className="btn btn-light-primary"
                                disabled={!projectId}
                            >
                                Đánh giá
                            </button>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export default ToolHomePage;
