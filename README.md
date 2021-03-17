# bm-customTable-vxe

> This is a plugin for designing VXE tables

# install dependencies
npm install bm-customTable-vxe -s

# serve with hot reload at localhost:8080
npm run dev


> 这是一个用来设计VXE表格的插件

# 安装
npm install bm-customTable-vxe -s

# 运行
npm run dev

# 使用
import CunstomTableVxe from 'components/customTable-vxe'

components: { CunstomTableVxe }

# html模板中
<CunstomTableVxe :requestConfigUrl="'http://172.16.1.92:8082/test/getData'"
                 :requestDataUrl="'http://172.16.1.92:8082/test/getApiData'"></CunstomTableVxe>

