<template>
  <div>
    <el-card style="margin: 20px 0">
      <category-select @getCategoryId="getCategoryId"></category-select>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <!-- :disabled="!catSegory3Id" -->
        <el-button type="primary" icon="el-icon-plus" @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu的sku列表"
                @click="handle(row)"
              ></hint-button>
              <el-popconfirm title="确定删除吗" @onConfirm="deleteSpu(row)">
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->, sizes,total"
          :total="total"
        >
        </el-pagination>
      </div>
      <spu-form
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></spu-form>
      <sku-form
        v-show="scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></sku-form>
    </el-card>
    <el-dialog :title="`${spu.spuName}的SKU列表`" :visible.sync="dialogTableVisible" before-close="close" >
     <el-table
       :data="skuList"
       style="width: 100%"
       border
       v-loading="loading">
       <el-table-column
         prop="skuName"
         label="名称"
         width="width">
       </el-table-column>
        <el-table-column
         prop="price"
         label="价格"
         width="width">
       </el-table-column>
        <el-table-column
         prop="weight"
         label="重量"
         width="width">
       </el-table-column>
        <el-table-column
         label="默认图片"
         width="width">
         <template slot-scope="{row,$index}">
           <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
         </template>
       </el-table-column>
     </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from "./SkuForm.vue";
import SpuForm from "./SpuForm.vue";
export default {
  name: "Spu",
  components: {
    SkuForm,
    SpuForm,
  },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      records: [],
      page: 1,
      limit: 3,
      total: 0,
      scene: 0,
      dialogTableVisible:false,
      spu:{},
      skuList:[],
      loading:true
    };
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category2Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    async getSpuList(page = 1) {
      page = this.page;
      let result = await this.$API.spu.reqSpuList(
        page,
        this.limit,
        this.category3Id
      );

      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList();
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    changeScene(scene) {
      this.scene = scene;
      this.getSpuList(this.page);
    },
    changeScenes(scene) {
      this.scene = scene;
      this.getSpuList(this.page);
    },
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
   async handle(row){
      this.dialogTableVisible=true
      this.spu=row
      let result = await this.$API.spu.reqSkuList(row.id);
      console.log(result);
      if(result.code==200){
        this.skuList=result.data
        this.loading=false
      }
    },
    close(done){
      this.loading=true;
      this.skuList=[]
      done()
    }
  },
};
</script>

<style>
</style>