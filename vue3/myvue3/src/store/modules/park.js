import cloneDeep from 'lodash.clonedeep';

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
        setParkData(state, data) {
            state.parkData = cloneDeep(data)
        },
        setBaseData(state, data) {
            state.baseData = cloneDeep(data)
        }
    }
};
