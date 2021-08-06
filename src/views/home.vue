<template>
  <div class="mainBox">
    <div class="title">平平无奇的表格</div>
    <ul>
      <li @click="goTablePage(item)" v-for="item in tableList" :key="item.path">
        <div class="tableName">{{ item.name }}</div>
        <div class="btnBox">
          <span class="bgRed" @click.stop>删除</span>
          <span class="bgGreen" @click.stop="openAddForm">编辑</span>
        </div>
      </li>
      <li class="addLi" @click="openAddForm">
        <div class="tableName">+</div>
      </li>
    </ul>
    <!-- 弹窗表单 -->
    <el-dialog title="表格内容填写" v-model="showDialog" top="12vh">
      <el-form :model="form" :label-width="84" label-position="left" @click="inputVisible=false;toolInputVisible=false">
        <el-form-item label="表格名称">
          <el-input
            v-model="form.name"
            size="small"
            style="width: 300px"
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
              {{ tag }}
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
            <span class="subTips">关键字选项</span>
            <el-checkbox-group v-model="form.keywordsList" style="display:inline-block;">
              <el-checkbox v-for="item in dynamicTags" :key="item" :label="item"></el-checkbox>
            </el-checkbox-group>
          </div>
          <el-divider style="margin:10px 0;" />
          <span class="subTips">其他选项</span>
          <div class="tagBox">
            <el-tag
              :key="item.tag"
              v-for="item in toolTags"
              closable
              :disable-transitions="false"
              @close="toolHandleClose(item)"
            >
              {{ options[(item.type*1) -1].label + ':' + item.tag }}
            </el-tag>
          <!-- 其他工具栏选项 -->
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
                  :key="item"
                  :label="item"
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
              <el-button style="width:100%" @click="toolHandleInputConfirm" size="small" type="primary">确定</el-button>
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
          <el-button type="primary" @click="confirmAddTable"
            >确定添加</el-button
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
export default {
  name: "Home",
  props: {},
  setup(props) {
    // 路由
    const router = useRouter();
    let tableList = ref([{ name: "示例", path: "/tablePage" }]);

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
      http.get("/table").then((res) => {
          console.log(res.data,'获取列表')
          tableList.value = tableList.value.concat(res.data.list);
      })
    };
    // queryData();

    // 文本翻译接口
    const getEnglishName = function(str) {
      // sign=sha256(应用ID+input+salt+curtime+应用密钥)
      let curtime = (new Date().valueOf() / 1000).toFixed();
      let sign = sha256('5fd9ea2e1046dcbb七周年客户71262dc5-1812-4586-8cfb-331b25518bd1'+curtime +'FrtE3J8jNoAn6jvtjlRkXMEeUC1P8uKY').toString();
      let param = {
        q: '七周年客户',
        from: 'auto',
        to: 'auto',
        salt: '71262dc5-1812-4586-8cfb-331b25518bd1',  // UUID
        appKey: '5fd9ea2e1046dcbb',  // 应用ID
        signType: 'v3',
        sign:sign,
        curtime: curtime
      }
      http.post('/youda',param).then(res=>{
        console.log(res.data,'翻译')
      })
    }
    getEnglishName();

    // 添加弹窗
    let showDialog = ref(false); // 操作ref 类型数据 要使用 .value
    const openAddForm = function () {
      showDialog.value = true;
    };

    // 添加表单数据内容
    let form = reactive({
      name: "",
      tableTags: [],
      toolTags: [],
      keywordsList: []
    });

    // 列表项设置
    let dynamicTags = ref([]),
      inputVisible = ref(false),
      inputValue = ref("");

    const handleClose = function (tag) {
      dynamicTags.value.splice(dynamicTags.value.indexOf(tag.value), 1);
    };

    const showInput = function () {
      inputVisible.value = true;
    };

    const handleInputConfirm = function () {
      let oldValue = inputValue;
      if (oldValue.value) {
        dynamicTags.value.push(oldValue.value);
      }
      inputVisible.value = false;
      inputValue.value = "";
    };

    // 工具栏设置
      // 当前新增的工具选择框
    let nowTool = reactive({tag:'',type:'1'});
    let toolTags = ref([]),
      toolInputVisible = ref(false);

    const toolHandleClose = function (tag) {
      toolTags.value.splice(toolTags.value.indexOf(tag.value), 1);
    };

    const toolShowInput = function (event) {
      // console.log(event)
      toolInputVisible.value = true;
    };

    // 工具栏确认
    const toolHandleInputConfirm = function () {
      if (nowTool.tag && nowTool.type) {
        toolTags.value.push({...nowTool});
      }
      toolInputVisible.value = false;
      nowTool.tag = '';
    };

    // 确认添加表格
    const confirmAddTable = function () {
      form.tableTags = dynamicTags;
      form.toolTags = toolTags;
      console.log(form);
      http.post("/table/addTable",form).then((res) => {
        console.log('添加表格',res.data)
      });
    };

    //跳转表格内容
    const goTablePage = function (item) {
      testStore(item);
      router.push("/tablePage");
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
      handleClose,
      showInput,
      handleInputConfirm,
      toolHandleClose,
      toolShowInput,
      toolHandleInputConfirm,
      confirmAddTable,
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
      nowTool
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
      width: 100px;
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