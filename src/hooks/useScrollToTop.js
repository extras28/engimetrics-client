import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Call hook to scroll to top
 */
function useScrollToTop() {
    const location = useLocation();

    useLayoutEffect(() => {
        // Scroll to top
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [location.pathname]);
}

export default useScrollToTop;
