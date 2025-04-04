import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Loading from '../../../../shared/components/Loading';

ModalScanResult.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    project: PropTypes.object,
    result: PropTypes.object,
};

function ModalScanResult(props) {
    // MARK: --- params ---
    const { show, onClose, project, result } = props;
    const { analysing, analytics } = useSelector((state) => state.project);

    // MARK: --- function ---
    function handleClose() {
        if (onClose) {
            onClose();
        }
    }

    return (
        <Modal
            show={show}
            backdrop="static"
            size="lg"
            onHide={handleClose}
            centered
            // onExit={formikProps.handleReset}
            // onExited={handleExistDone}
            enforceFocus={false}
        >
            <Modal.Header className="px-5 py-5">
                <Modal.Title>{project?.name}</Modal.Title>
                <div
                    className="btn btn-xs btn-icon btn-light btn-hover-secondary cursor-pointer"
                    onClick={handleClose}
                >
                    <i className="far fa-times"></i>
                </div>
            </Modal.Header>
            <Modal.Body>
                {analysing ? (
                    <Loading />
                ) : (
                    <div>
                        <h3>SonarQube</h3>
                        <div>
                            <div>{`Security: ${analytics?.component?.measures[5].period.value}`}</div>
                            <div>{`Reliability: ${analytics?.component?.measures[3].value}`}</div>
                            <div>{`Maintainability: ${analytics?.component?.measures[4].value}`}</div>
                            <div>{`hotspots reviewed: ${analytics?.component?.measures[2].period.value}%`}</div>
                            <div>{`Coverage: ${analytics?.component?.measures[0].value}%`}</div>
                            <div>{`Duplications: ${analytics?.component?.measures[1]?.value}%`}</div>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default ModalScanResult;
