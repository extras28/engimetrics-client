import axiosClient from './axios.client';

const projectApi = {
    list: (params) => {
        const url = '/project/list';
        return axiosClient.get(url, { params });
    },
    review: (params) => {
        const url = `/project/check/${params.projectId}`;
        return axiosClient.get(url);
    },
};

export default projectApi;
