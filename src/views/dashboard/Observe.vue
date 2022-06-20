<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="12">
        <search>
             
        </search>
      </el-col>
      <el-col :span="12">
        <category>
            
        </category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from "./Search.vue";
import Category from "./Category.vue";
export default {
  name: "Observe",
  components: {
    Search,
    Category,
  },
};
</script>

<style>
</style>