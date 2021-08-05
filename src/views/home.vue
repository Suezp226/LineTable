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
      <el-form :model="form" :label-width="84" label-position="left">
        <el-form-item label="表格名称">
          <el-input
            v-model="form.name"
            size="small"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-divider />
        <el-form-item label="表格数据项">
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
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </el-form-item>
        <el-divider />
        <el-form-item label="工具栏">
          <el-tag
            :key="tag"
            v-for="tag in toolTags"
            closable
            :disable-transitions="false"
            @close="toolHandleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="toolInputVisible"
            v-model="toolInputValue"
            placeholder="回车确定"
            ref="saveTagInput"
            size="small"
            @keyup.enter="toolHandleInputConfirm"
            @blur="toolHandleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="toolShowInput"
            >+ New Tool Tag</el-button
          >
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
import { useRouter } from "vue-router";
import store from "../store/store"
import http from "../http/http";
export default {
  name: "Home",
  props: {},
  setup(props) {
    // 路由
    const router = useRouter();
    let tableList = ref([{ name: "示例", path: '/tablePage' }]);

    // Stroe
    const testStore = async function(obj) {
      let jud = true;
      store.commit('changeNowTag',obj.name)
      await store.state.tableNameList.forEach(ele=>{
        if(ele.name === obj.name) {
          jud = false;
        }
      });
      if(obj && jud) {
        store.commit('addTableName',obj);
      }
    }

    // 获取列表显示数据
    const queryData = function () {
      // http
      //   .get("/singlePart?page=1&pageNum=12&name=&phone=&keyWord=")
      //   .then((res) => {
      //     // console.log(res.data,'res.data')
      //   });
      tableList.value = tableList.value.concat([{ name: "七周年", path: '/tablePage' }]);
    };
    queryData();

    // 添加弹窗
    let showDialog = ref(false); // 操作ref 类型数据 要使用 .value
    const openAddForm = function () {
      showDialog.value = true;
    };

    // 添加表单数据内容
    let form = reactive({
      name: "",
      region: "",
    });

    // 列表项设置
    let dynamicTags = ref(["标签一", "标签二", "标签三"]),
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
    let toolTags = ref([
        "时间搜索：取件日期",
        "输入框搜索：姓名",
        "关键字搜索：姓名+手机号+备注",
      ]),
      toolInputVisible = ref(false),
      toolInputValue = ref("");

    const toolHandleClose = function (tag) {
      toolTags.value.splice(toolTags.value.indexOf(tag.value), 1);
    };

    const toolShowInput = function () {
      toolInputVisible.value = true;
    };

    const toolHandleInputConfirm = function () {
      let oldValue = toolInputValue;
      if (oldValue.value) {
        toolTags.value.push(oldValue.value);
      }
      toolInputVisible.value = false;
      toolInputValue.value = "";
    };

    // 确认添加表格
    const confirmAddTable = function () {
      console.log(form.name);
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
      toolInputValue,
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
      testStore
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

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
}
.bgRed {
  background: #f63f5a;
}
</style>