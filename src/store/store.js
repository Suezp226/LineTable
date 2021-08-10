import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    tableNameList: [],
    nowTag: {name:'',id:null},
  },
  mutations: {
    increment (state) {
      state.count++
    },
    addTableName (state,obj) {
      if(!obj) return
      state.tableNameList.push(obj);
    },
    deleteTableName(state,obj) {
      if(!obj || state.tableNameList.indexOf(obj) == -1) return
      state.tableNameList.splice(state.tableNameList.indexOf(obj),1);
    },
    changeNowTag(state, obj) {
      state.nowTag.name = obj.name;
      state.nowTag.id = obj.id;
    }
  }
})
