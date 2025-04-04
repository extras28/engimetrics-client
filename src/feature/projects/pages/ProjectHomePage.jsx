import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KeenSearchBarNoFormik from '../../../shared/components/Keens/KeenSearchBarNoFormik';
import Pagination from '../../../shared/components/Pagination';
import SearchField from '../../../shared/components/SearchField';
import ToolHomePage from '../../tools/pages/ToolHomePage';
import { thunkGetListProject } from '../project.slice';
import Global from '../../../shared/utils/Global';
import { unwrapResult } from '@reduxjs/toolkit';
import Utils from '../../../shared/utils/Utils';
import ModalScanResult from '../components/ModalScanResult';

const sTag = '[ProjectHomePage]';

function ProjectHomePage(props) {
    // MARK: --- params ---
    const { projects, pagination, isGettingProjects } = useSelector((state) => state.project);

    const [selectedProject, setSelectedProject] = useState(null);
    const [filters, setFilters] = useState(Global.gFiltersProjectList);
    const refLoading = useRef(false);
    const needToRefreshData = useRef(projects?.length === 0);
    const [showingResult, setShowingResult] = useState(false);

    const dispatch = useDispatch();

    // MARK: --- functions ---
    function handleProjectClicked(project) {
        if (selectedProject?.id === project.id) {
            setSelectedProject(null);
            return;
        }

        setSelectedProject(project);
    }

    async function getListProject() {
        refLoading.current = true;
        try {
            const res = unwrapResult(await dispatch(thunkGetListProject(filters)));
        } catch (error) {
            console.log(`${sTag} get project list error: ${error.message}`);
        }
        refLoading.current = false;
    }

    // MARK: --- hooks ---
    useEffect(() => {
        if (
            !refLoading.current &&
            (needToRefreshData.current || Global.gNeedToRefreshProjectList)
        ) {
            getListProject();
            Global.gNeedToRefreshProjectList = false;
        }
    }, [filters]);

    const languages = {
        C: 9.8,
        JavaScript: 0.35,
        HTML: 0.31,
        'C++': 0.23,
        Shell: 0.09,
    };

    return (
        <div className="row h-100">
            <div className="col-lg-8 col-md-6">
                <div id="kt_app_toolbar" className="app-toolbar  py-3 py-lg-6 ">
                    <div
                        id="kt_app_toolbar_container"
                        className="app-container  container-xxl d-flex flex-stack "
                    >
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3 ">
                            <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
                                Projects
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header border-0 bg-white">
                        {/* header toolbar */}
                        <div className="d-flex flex-wrap gap-2">
                            <KeenSearchBarNoFormik
                                name="query"
                                placeholder="Tìm kiếm"
                                value={''}
                                onSubmit={(text) => {
                                    setFilters({ ...filters, q: text });
                                }}
                            />

                            {/* <SearchField
                                searchable={true}
                                currentValue={filters.userId}
                                name="userId"
                                selectClassName="h-100"
                                options={[
                                    { name: 'Tất cả', value: '' },
                                    { name: 'test', value: 1 },
                                ]}
                                onValueChanged={(newValue) => {
                                    setFilters({ ...filters, userId: newValue });
                                }}
                            /> */}
                        </div>
                    </div>
                    <div className="card-body">
                        {projects.map((project, index) => {
                            const total = Object.values(languages).reduce(
                                (acc, val) => acc + val,
                                0
                            );
                            return (
                                <div
                                    key={project.id}
                                    onClick={() => handleProjectClicked(project)}
                                    className={`d-flex flex-row justify-content-between align-items-center font-weight-bolder cursor-pointer text-hover-primary py-3 ${
                                        index === 0 ? '' : 'border-top'
                                    }`}
                                >
                                    <div className="d-flex flex-row align-items-center">
                                        <div
                                            className="bg-warning d-flex justify-content-center align-items-center font-size-h2 mr-6 text-body"
                                            style={{
                                                height: '48px',
                                                width: '48px',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            {project.name.split('')[0]}
                                        </div>
                                        <div
                                            className={`${
                                                selectedProject?.id === project.id
                                                    ? 'text-primary'
                                                    : ''
                                            }`}
                                        >
                                            {project.name}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '400px',
                                            height: '10px',
                                        }}
                                        className="rounded"
                                    >
                                        {Object.entries(languages).map(([key, value]) => (
                                            <div
                                                key={key}
                                                style={{
                                                    height: '10px',
                                                    width: `${(value / total) * 100}%`,
                                                    backgroundColor: Utils.getLanguageColor(key), // Hàm lấy màu
                                                }}
                                                title={`${key}: ${value.toFixed(2)}%`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="px-3">
                        {/* Pagination */}
                        {pagination && projects?.length > 0 && (
                            <div className="d-flex align-items-center justify-content-center mt-3">
                                <Pagination
                                    rowsPerPage={pagination?.perPage}
                                    rowCount={pagination?.total}
                                    currentPage={pagination?.currentPage}
                                    onChangePage={(newPage) => {
                                        let iNewPage = parseInt(newPage);
                                        iNewPage -= 1;
                                        if (iNewPage < 0) {
                                            iNewPage = 0;
                                        }
                                        needToRefreshData.current = true;
                                        Global.gFiltersProjectList = { ...filters, page: iNewPage };
                                        setFilters({
                                            ...filters,
                                            page: iNewPage,
                                        });
                                    }}
                                    onChangeRowsPerPage={(newPerPage) => {
                                        const iNewPerPage = parseInt(newPerPage);
                                        dispatch(setPaginationPerPage(iNewPerPage));
                                        needToRefreshData.current = true;
                                        Global.gFiltersProjectList = {
                                            ...filters,
                                            limit: iNewPerPage,
                                        };
                                        setFilters({
                                            ...filters,
                                            limit: iNewPerPage,
                                            page: 0,
                                        });
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 bg-white min-vh-100">
                <ToolHomePage
                    projectId={selectedProject?.id}
                    onSubmit={() => {
                        setShowingResult(true);
                    }}
                />
            </div>
            {/* <AppOffcanvas id="app-offcanvas" toggleByElementId="test" position="right">
                <ToolHomePage />
            </AppOffcanvas> */}
            <ModalScanResult
                project={selectedProject}
                show={showingResult}
                onClose={() => {
                    setShowingResult(false);
                }}
            />
        </div>
    );
}

export default ProjectHomePage;
