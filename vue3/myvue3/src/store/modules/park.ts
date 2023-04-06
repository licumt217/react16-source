import { cloneDeep } from 'lodash';

export default {
    state: {
        parkData: {
            parkName: '',
            pmParkId: '',
            isCloud: '',
        },
        baseData: {
            parkAttrs: [],
            stabilityList: [],
            parkYTList: [],
            categoryList: [],
            parkTypes: [],
            companyList: []
        }
    },
    mutations: {
        setParkData(state: any, data: any) {
            state.parkData = cloneDeep(data)
        },
        setBaseData(state: any, data: any) {
            state.baseData = cloneDeep(data)
        }
    }
};
