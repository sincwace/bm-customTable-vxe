# bm-customtable-vxe

用于本末项目的自定义表格组件, 该组件依赖vxe-table, 可以实现表格的自定义配置

# 安装

```shell
npm install bm-customtable-vxe -s
```

```javascript
import Vue from 'vue'
import bmCustomTableVxe from 'bm-customtable-vxe'
Vue.use(bmCustomTableVxe)
```

```html
<template>
    <div>
        <design-table-vxe></design-table-vxe>

        <custom-table-vxe :requestConfigUrl="requestConfigUrl"
                          :requestDataUrl="requestDataUrl">
            <div slot="keyName"
                 slot-scope="scope">
                <!-- 自定义元素 -->
            </div>            
        </custom-table-vxe>                
    </div>
</template>

<script>
export default {
    data () {
        return {
            requestConfigUrl: '',
            requestDataUrl: ''
        }
    }
}
</script>
```

## 使用指南
designTable-vxe.vue 文件为表格设计器
customTable-vxe.vue 文件为表格渲染器

requestConfigUrl: 服务端获取当前功能模块表格配置

requestDataUrl: 服务端获取当前功能模块表格数据

slot: 可以自定义表格某个单元格元素, keyName为单元格的键名, scope为行数据

## 演示地址

[click this](http://1.117.79.182:8083/)


