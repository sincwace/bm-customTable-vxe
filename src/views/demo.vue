<template>
	<div class="demo-main">
		<div class="mb20">
			选择模块

			<el-cascader v-model="functionModule.select"
						 :options="functionModule.options"
						 :props="{ checkStrictly: true, label: 'moduleName', value: 'moduleConfig' }"
						 @change="functionModuleChange"></el-cascader>
		</div>

		<CustomTableVxe :requestConfigUrl="''"
						:requestDataUrl="''"
						:btnEvent="btnEvent"
						:page="page"
						:data="customData"
						:config="moduleConfig">
			<div slot="name"
				 slot-scope="scope">
				<a href="https://github.com/x-extends/vxe-table"
				   target="_black">我是超链接：{{ scope.row.name }}</a>
			</div>
			<div slot="state"
				 slot-scope="scope">
				<el-select v-model="select.select"
						   placeholder="请选择">
					<el-option v-for="(i, index) in select.options"
							   :key="'select' + index"
							   :value="i.value"
							   :label="i.label"></el-option>
				</el-select>
			</div>
			<div slot="expand"
				 slot-scope="scope">
				{{JSON.stringify(scope.row)}}
				<vxe-table border
						   :data="tableData"
						   style="width: 100%">
					<vxe-table-column field="role"
									  title="Role"></vxe-table-column>
					<vxe-table-column field="age"
									  title="Age"></vxe-table-column>
				</vxe-table>
			</div>
		</CustomTableVxe>
	</div>
</template>

<script>
import CustomTableVxe from 'components/customTable-vxe'
import axios from 'axios'
import qs from 'qs'

export default {
	name: 'customTable-demo',
	components: { CustomTableVxe },
	data() {
		return {
			btnEvent: [],
			functionModule: { // 接口取来的模块数据
				select: '',
				options: []				
			},
			page: {
				currentPage: 1,
				pageSize: 10,
				total: 20
			},
			select: {
				select: 1,
				options: [
					{ label: '选项一', value: 0 },
					{ label: '选项二', value: 1 }
				]
			},
			customData: [
				{
					title: '中国航天技术学院招生简章',
					num: 30,
					desc: '这是一段关于航天技术学院的简单介绍',
					children: [
						{ title: 'c1', num: 31, desc: 'c1-desc', children: [] }
					]
				},
				{
					title: '中国航天技术学院招生简章',
					num: 30,
					desc: '这是一段关于航天技术学院的简单介绍'
				},
				{
					title: '中国航天技术学院招生简章',
					num: 30,
					desc: '这是一段关于航天技术学院的简单介绍'
				},
				{
					title: '中国航天技术学院招生简章',
					num: 30,
					desc: '这是一段关于航天技术学院的简单介绍'
				},
				{
					title: '中国航天技术学院招生简章',
					num: 30,
					desc: '这是一段关于航天技术学院的简单介绍'
				}
			],
			tableData: [
				{
					id: 10001,
					name: 'Test1',
					role: 'Develop',
					sex: 'Man',
					age: 28,
					address: 'vxe-table 从入门到放弃'
				},
				{
					id: 10002,
					name: 'Test2',
					role: 'Test',
					sex: 'Women',
					age: 22,
					address: 'Guangzhou'
				},
				{
					id: 10003,
					name: 'Test3',
					role: 'PM',
					sex: 'Man',
					age: 32,
					address: 'Shanghai'
				},
				{
					id: 10004,
					name: 'Test4',
					role: 'Designer',
					sex: 'Women ',
					age: 36,
					address: 'Guangzhou'
				},
				{
					id: 10005,
					name: 'Test5',
					role: 'Develop',
					sex: 'Women ',
					age: 24,
					address: 'Shanghai'
				},
				{
					id: 10006,
					name: 'Test6',
					role: 'Designer',
					sex: 'Man ',
					age: 34,
					address: 'vxe-table 从入门到放弃'
				}
			],
			moduleConfig: {}
		}
	},
	methods: {
		// 选择功能模块
		functionModuleChange(val) {
			// console.log(val)
			if (typeof val[0] === 'object') {
				this.moduleConfig = val[0]
			}
		},

		getModel() {
			axios.post('http://1.117.79.182:3001/router/getModel').then(res => {
				// console.log(res)
				this.functionModule.options = res.data.data.routerData
			})
		},

		initBtnEvent() {
			this.btnEvent = [
				{
					name: '查看',
					icon: 'vxe-icon--more',
					show: data => {
						return false
					},
					disabled: data => {
						if (data._XID === 'row_2') return true
						return false
					},
					click: data => {
						console.log(data, '查看')
					}
				},
				{
					name: '编辑',
					icon: 'vxe-icon--edit-outline',
					show: data => {
						return true
					},
					disabled: data => {
						return false
					},
					click: data => {
						console.log(data, '编辑')
					}
				},
				{
					name: '删除',
					icon: 'vxe-icon--minus',
					show: data => {
						return true
					},
					disabled: data => {
						return false
					},
					click: data => {
						console.log(data, '删除')
					}
				}
			]
		}
	},
	created() {
		this.getModel()
		this.initBtnEvent()
	}
}
</script>

<style lang="less">
.demo-main {
	padding: 40px;
	height: 100%;
}
</style>


