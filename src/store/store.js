import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    tableNameList: [],
    nowTag: {name:'',id:null},
    isMobile: false
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
      console.log(state.tableNameList,obj)
      if(!obj) return
      let ind = 0;
      state.tableNameList.forEach((ele,index)=>{
        console.log(ele._id,obj._id)
        if(ele._id == obj._id) {
          ind = index;
        }
      })
      if(ind == -1) return
      state.tableNameList.splice(ind,1);
    },
    changeNowTag(state, obj) {
      state.nowTag.name = obj.name;
      state.nowTag.id = obj.id;
    },
    judgeIsMobile(state, bol) {
      state.isMobile = bol;
    }
  }
})
