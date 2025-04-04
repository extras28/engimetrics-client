import axiosClient from './axios.client';

const toolApi = {
    getListTool: (params) => {
        const url = '/tool/list';
        return axiosClient.get(url, { params });
    },
};

export default toolApi;
