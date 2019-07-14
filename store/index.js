export const state = () => ({
    record: ''
});

export const mutations = {
    setRecord (state, id) {
        state.record = id;
    }
};

export const getters = {
    getRecord (state) {
        return state.record;
    }
};

export const actions = {
    /*nuxtServerInit ({commit}, {req}) {
        //console.log(req)
        console.log(444);
    },
    setsrecord ({commit}, {id}) {
        console.log(id);
        commit('setRecord', id)
    },
    deletesrecord ({commit}) {
        commit('setRecord', null)
    }*/
}
