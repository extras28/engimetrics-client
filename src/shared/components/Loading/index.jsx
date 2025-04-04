import PropTypes from 'prop-types';

Loading.propTypes = {
    message: PropTypes.string,
    showBackground: PropTypes.bool,
};

function Loading({ message = 'Loading', showBackground = true }) {
    return (
        <div className={`blockui ${!showBackground ? 'bg-light-primary shadow-none' : ''}`}>
            <span className={`${!showBackground ? 'text-primary' : ''}`}>{`${message}...`}</span>
            <span className="spinner spinner-loader spinner-primary"></span>
        </div>
    );
}

export default Loading;
