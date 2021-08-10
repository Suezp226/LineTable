<template>
  <div class="mainBox">
    <div class="title">平平无奇的表格</div>
    <ul>
      <li @click="goTablePage(item)" v-for="item in tableList" :key="item.path">
        <div class="tableName">{{ item.name }}</div>
        <div class="btnBox">
          <span class="bgRed" @click.stop="deleteTable(item)">
            <i class="el-icon-delete-solid"></i>
          </span>
          <span class="bgGreen" @click.stop="openEditForm(item)">
            <i class="el-icon-s-tools"></i>
          </span>
        </div>
      </li>
      <li class="addLi" @click="openAddForm">
        <div class="tableName">+</div>
      </li>
    </ul>
    <!-- 弹窗表单 -->
    <el-dialog :title="doneType=='add'?'新增表格':'编辑表格'" v-model="showDialog" top="12vh">
      <el-form :model="form" :label-width="84" label-position="left" @click="inputVisible=false;toolInputVisible=false">
        <el-form-item label="表格名称">
          <el-input
            v-model="form.name"
            size="small"
            style="width: 300px"
            maxlength="15"
            show-word-limit
            placeholder="请输入表格名称(禁止重复)"
          ></el-input>
        </el-form-item>
        <el-divider />

        <el-form-item label="表格数据项">
          <div class="tagBox">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag.value }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              placeholder="回车确定"
              ref="saveTagInput"
              size="small"
              @click.stop
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click.stop="showInput"
              >+ New Tag</el-button
            >
          </div>
        </el-form-item>
        <el-divider />

        <el-form-item label="工具栏">
          <div>
            <span class="subTips">关键字搜索</span>
            <el-checkbox-group v-model="form.keywordsList" style="display:inline-block;">
              <el-checkbox v-for="item in dynamicTags" :key="item.key" :label="item.key">{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <el-divider style="margin:10px 0;" />
          <!-- 其他工具栏选项 -->
          <span class="subTips">其他搜索</span>
          <div class="tagBox">
            <el-tag
              :key="item.tag"
              v-for="item in toolTags"
              closable
              :disable-transitions="false"
              @close="toolHandleClose(item)"
            >
              {{ options[(item.type*1) -1].label + ':' + item.value }}
            </el-tag>
            <!-- 占位按钮 无功能 -->
            <el-button
              v-if="toolInputVisible"
              style="opacity:0;" 
              class="button-new-tag"
              size="small"
              disabled
              ></el-button>
            <div class="addToolBox" v-if="toolInputVisible">
              <el-select
                v-model="nowTool.tag"
                style="width: 100%"
                size="small"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in dynamicTags"
                  :key="item.value"
                  :label="item.value"
                  :value="item"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="nowTool.type"
                style="width: 100%"
                size="small"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button style="width:46%" @click="toolHandleInputClose" size="small">取消</el-button>
              <el-button style="width:46%" @click="toolHandleInputConfirm" size="small" type="primary">确定</el-button>
            </div>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              :autofocus="true"
              @click.stop="toolShowInput($event)"
              >+ New Tool Tag</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" :loading="addBtnLoading" @click="confirmDone"
            >{{doneType=='add'?'确定添加':'确定'}}</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch, getCurrentInstance } from "vue";
import sha256 from 'crypto-js/sha256';
import { useRouter } from "vue-router";
import store from "../store/store";
import http from "../http/http";
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  name: "Home",
  props: {},
  setup(props,func) {
    console.log(func,'emit')
    // 路由
    const router = useRouter();
    let tableList = ref([]);

    // Stroe
    const testStore = async function (obj) {
      let jud = true;
      store.commit("changeNowTag", obj.name);
      await store.state.tableNameList.forEach((ele) => {
        if (ele.name === obj.name) {
          jud = false;
        }
      });
      if (obj && jud) {
        store.commit("addTableName", obj);
      }
    };

    // 获取列表显示数据
    const queryData = function () {
      tableList.value = [];
      http.get("/table").then((res) => {
          console.log(res.data,'获取列表')
          tableList.value = res.data.list;
      })
    };
    queryData();



    // 添加表单数据内容
    let addBtnLoading = ref(false); // 添加按钮loading
    let form = reactive({
      name: "",
      tableTags: [],
      toolTags: [],
      keywordsList: []  // 保存的为 列表项的 key 值
    });

    // 列表项设置参数
    let dynamicTags = ref([]),
      inputVisible = ref(false),
      inputValue = ref("");

    const handleClose = function (tag) {
      dynamicTags.value.indexOf(tag)==-1?'':dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
      form.keywordsList.indexOf(tag.key)==-1?'':form.keywordsList.splice(form.keywordsList.indexOf(tag.key),1)
    };

    const showInput = function () {
      inputVisible.value = true;
    };

    const handleInputConfirm = function () {
      let beforeKey = dynamicTags.value.length>0?(dynamicTags.value[dynamicTags.value.length-1].key.split('_')[1]): 0;
      let oldValue = inputValue;
      if (oldValue.value) {
        dynamicTags.value.push({value:oldValue.value,key:'perKey_' + (+beforeKey+1)});
      }
      inputVisible.value = false;
      inputValue.value = "";
    };

    // 工具栏设置
      // 当前新增的工具选择框
    let nowTool = reactive({tag:null,type:'1'});
    let toolTags = ref([]),
      toolInputVisible = ref(false);

    const toolHandleClose = function (tag) {
      toolTags.value.indexOf({...nowTool.tag,type:nowTool.type})==-1?'':
      toolTags.value.splice(toolTags.value.indexOf(tag), 1);
    };

    const toolShowInput = function (event) {
      toolInputVisible.value = true;
    };

    // 工具栏确认
    const toolHandleInputConfirm = function () {
      console.log(nowTool)
      if (nowTool.tag && nowTool.type) {
        toolTags.value.push({...nowTool.tag,type:nowTool.type});
      }
      toolInputVisible.value = false;
      nowTool.tag = null;
    };

    //  工具栏取消
    const toolHandleInputClose = function () {
      toolInputVisible.value = false;
      nowTool.tag = null;
    };

    // 弹窗相关参数
    let showDialog = ref(false); // 操作ref 类型数据 要使用 .value
    let doneType = ref('add');  // 判断当前操作类型

    // 点击编辑表格
    const openEditForm = function(item) {
      console.log(item);
      toolHandleInputClose();
      doneType.value = 'edit';
      this.showDialog = true;
      let {name,tableTags,keywordsList,_id} = item;
      dynamicTags.value = tableTags;
      toolTags.value = item.toolTags;

      form.name = name;
      form.tableTags = tableTags;
      form.toolTags = item.toolTags;
      form.keywordsList = keywordsList;
      form._id = _id;
    }

    // 点击新增表格
    const openAddForm = function () {
      toolHandleInputClose();
      doneType.value = 'add';
      form.name = '';
      form.tableTags = [];
      form.toolTags = [];
      form.keywordsList = [];
      delete form._id;

      dynamicTags.value = [];
      toolTags.value = [];
      showDialog.value = true;
    };

    // 确认添加表格
    const confirmAddTable = function () {
      form.toolTags = toolTags.value;     // 工具栏项
      form.tableTags = dynamicTags.value; //数据项
      addBtnLoading.value = true;
      console.log(form,'form')
      http.post("/table/addTable",form).then((res) => {
        if(res.data.code == 200) {
          ElMessage({
            type: 'success',
            message: '添加成功!'
          });
          showDialog.value = false;
          addBtnLoading.value = false;
          tableList.value = [];
          queryData();
        }
        console.log('添加表格',res.data)
      });
    };

    // 确定编辑表格
    const confirmEditTable = function() {
      form.toolTags = toolTags.value;     // 工具栏项
      form.tableTags = dynamicTags.value; //数据项
      addBtnLoading.value = true;
      console.log(form,'form编辑')
      http.post("/table/editTable",form).then((res) => {
        if(res.data.code == 200) {
          ElMessage({
            type: 'success',
            message: '修改成功!'
          });
          showDialog.value = false;
          addBtnLoading.value = false;
          tableList.value = [];
          queryData();
        }
        console.log('编辑表格',res.data)
      });
    }

    // 点击确定按钮
    const confirmDone = function() {
      // 校验数据  表明 数据项 搜索条件  关键字包含

      if(form.name.trim() == '') {
        ElMessage.warning({
          message: '请填写表名称',
          type: 'warning'
        });
        return
      }

      console.log(doneType);
      if( doneType.value == 'add') {
        confirmAddTable();
      } else {
        confirmEditTable();
      }
    }

    // 删除 表格
    const deleteTable = function(item) {
      ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: true,
          type: 'warning'
        }).then(() => {
          http.post('/table/deleteTable',{_id:item._id}).then(res=>{
            if(res.data.code == 200) {
              queryData();
              ElMessage({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              ElMessage({
                type: 'info',
                message: '服务异常，请稍后再试'
              });
            }
          })
        }).catch(() => {
          // ElMessage({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    }


    //跳转表格内容
    const goTablePage = function (item) {
      testStore(item);
      router.push({
        path:"/tablePage",
        query: {id:item._id}
      });
    };

    return {
      showDialog,
      form,
      dynamicTags,
      inputVisible,
      inputValue,
      toolTags,
      toolInputVisible,
      queryData,
      openAddForm,
      openEditForm,
      handleClose,
      showInput,
      handleInputConfirm,
      toolHandleClose,
      toolShowInput,
      toolHandleInputConfirm,
      toolHandleInputClose,
      confirmAddTable,
      deleteTable,
      confirmDone,
      goTablePage,
      tableList,
      testStore,
      options: [
        {
          value: "1",
          label: "普通文字",
        },
        {
          value: "2",
          label: "时间选择器",
        },
        {
          value: "3",
          label: "下拉框选择",
        },
      ],
      nowTool,
      addBtnLoading,
      doneType
    };
  },
};
</script>
<style lang="less" scoped>
.mainBox {
  .title {
    margin-bottom: 20px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      height: 100px;
      width: 130px;
      border-radius: 2px;
      background-color: #409eff;
      cursor: pointer;
      box-sizing: border-box;
      font-size: 16px;
      margin-right: 15px;
      margin-bottom: 15px;
      box-shadow: 0px 2px 8px rgb(0 0 0 / 35%);
      // transition: all 0.2s ease-in-out 0s;
      transition-property: box-shadow, transform, background-color, height;
      transition-duration: 0.2s, 0.2s, 0.2s, 0.2s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s, 0s, 0s, 0.4s;
      overflow: hidden;
      .tableName {
        width: 100%;
        height: 100px;
        padding: 14px;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }
      .btnBox {
        display: flex;
        overflow: hidden;
        height: 30px;
        width: 100%;
        background-color: #409eff;
        color: rgb(226, 221, 221);
        font-size: 13px;
        text-align: center;
        line-height: 30px;
        span {
          flex: 1;
        }
        span:hover {
          color: #fff;
        }
      }
    }
    li:hover {
      transform: translateY(-2px);
      background-color: #0b7df0;
      box-shadow: 0px 3px 8px rgb(0 0 0 / 55%);
      height: 130px;
    }
    .addLi {
      background-color: #67c23a;
      .tableName {
        font-size: 30px;
      }
    }
    .addLi:hover {
      background-color: #0b7df0;
      height: 100px;
    }
  }
}
.tagBox {
  display: inline-block;
  position:relative;
  padding-top:5px;
}
.addToolBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  display: inline-block;
  padding: 5px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 1px 5px #0000007c;
}
.subTips{
  display: inline-block;
  width: 80px;
  margin-right: 10px;
  vertical-align: top;
}
.el-tag {
  margin-right: 10px;
  vertical-align: top;
}
.button-new-tag {
  vertical-align: top;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  vertical-align: top;
  width: 90px;
}
.bgRed {
  background: #f63f5a;
}
</style>