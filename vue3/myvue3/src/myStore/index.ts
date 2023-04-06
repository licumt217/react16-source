import { defineStore } from 'pinia';

export const useLiStore = defineStore('li', {
    state: () => {
        return {
            count: 1
        }
    },
    getters: {
        double: (state) => {
            return state.count * 2;
        }
    },
    actions: {
        increment() {
            this.count++;
        }
    }
})