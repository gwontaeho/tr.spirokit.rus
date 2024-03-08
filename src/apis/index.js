import axios from "axios";
import { getCookie } from "cookies-next";

const baseURL = process.env.NEXT_PUBLIC_API_PROD;
// const baseURL = process.env.NEXT_PUBLIC_API_DEV;

export const axiosInstance = axios.create({ baseURL });

const accessHeader = () => !!getCookie("accessToken") && { headers: { Authorization: `Bearer ${getCookie("accessToken")}` } };
export const refreshHeader = () => !!getCookie("refreshToken") && { headers: { Authorization: `Bearer ${getCookie("refreshToken")}` } };

export const signin = async ({ loginId, password }) => {
    const { data } = await axiosInstance.post("/v1/auth/sign-in", { loginId, password });
    return data;
};

export const getMe = async (accessToken) => {
    const { data } = await axiosInstance.get("/v1/auth/me", { headers: { Authorization: `Bearer ${accessToken}` } });
    return data;
};

export const signup = async ({ name, loginId, password, confirmPassword, roleId }) => {
    const { data } = await axiosInstance.post("/v1/auth/sign-up", { name, loginId, password, confirmPassword, roleId });
    return data;
};

export const checkid = async (loginId) => {
    const { data } = await axiosInstance.post("/v1/auth/check-id", { loginId });
    return data;
};

export const getCountries = async () => {
    const { data } = await axiosInstance.get("/v1/countries?status=enabled");
    return data;
};

export const getClinics = async (alpha2) => {
    const { data } = await axiosInstance.get(`/v1/countries/${alpha2}/clinics?status=enabled`);
    return data;
};

export const getRoles = async (clinicId) => {
    const { data } = await axiosInstance.get(`/v1/clinics/${clinicId}/roles`);
    return data;
};

export const getSubjects = async ({ chartNumber, page, size }) => {
    const { data } = await axiosInstance.get(`/v3/subjects?search=${chartNumber}&page=${page}&size=${size}`, accessHeader());
    return data;
};

export const getSubject = async (chartNumber) => {
    const { data } = await axiosInstance.get(`/v1/subjects/${chartNumber}`, accessHeader());
    return data;
};

export const getHistories = async ({ chartNumber, from, to }) => {
    const { data } = await axiosInstance.get(`/v1/subjects/${chartNumber}/histories?from=${from}&to=${to}`, accessHeader());
    return data;
};

export const getResults = async ({ chartNumber, type, date }) => {
    const { data } = await axiosInstance.get(`/v3/subjects/${chartNumber}/types/${type}/results/${date}`, accessHeader());
    return data;
};

export const getTrends = async ({ chartNumber, from, to, resultFilter }) => {
    const { data } = await axiosInstance.get(
        `/v1/subjects/${chartNumber}/types/fvc/trends?from=${from}&to=${to}&result-filter=FVC,FEV1,PEF,FEF25_75,FEV1PER`,
        accessHeader()
    );
    return data;
};

export const getPredictTrends = async ({ chartNumber, date }) => {
    const { data } = await axiosInstance.get(
        `/v1/subjects/${chartNumber}/types/fvc/predict-trends/${date}?result-filter=FVC,FEV1,PEF,FEF25_75,FEV1PER`,
        accessHeader()
    );
    return data;
};

export const getClinicians = async ({ name, page, size }) => {
    const { data } = await axiosInstance.get(`/v2/clinicians?name=${name}&page=${page}&size=${size}`, accessHeader());
    return data;
};

export const getDevices = async () => {
    const { data } = await axiosInstance.get("/v1/devices", accessHeader());
    return data;
};

export const getCalibrations = async (serialNumber) => {
    const { data } = await axiosInstance.get(`/v1/devices/${serialNumber}/calibrations`, accessHeader());
    return data;
};

export const getCalibration = async (calibrationId) => {
    const { data } = await axiosInstance.get(`/v1/calibrations/${calibrationId}`, accessHeader());
    return data;
};

export const updateClinicianStatus = async ({ clinicianId, status }) => {
    const { data } = await axiosInstance.put(`/v1/clinicians/${clinicianId}`, { status }, accessHeader());
    return data;
};

export const createSubject = async (values) => {
    const { data } = await axiosInstance.post("/v1/subjects", values, accessHeader());
    return data;
};

export const updateSubject = async ({ chartNumber, values }) => {
    const { data } = await axiosInstance.put(`/v1/subjects/${chartNumber}`, values, accessHeader());
    return data;
};
