<template>
	<div>
		<div class="mb20">
			<el-form label-width="120px">
				<el-row>
					<el-col v-for="(i, index) in screenList"
							:key="'screenList' + index"
							:span="parseInt(i.width)">
						<el-form-item :label="i.title + ':'">
							<el-input v-model="i.fieldName"
									  style="width: 80%;"
									  size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6"
							v-if="screenList.length > 0">
						<el-form-item label="">
							<el-button type="primary"
									   @click="search"
									   size="mini">搜索</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>

		<vxe-grid :data="tableData"
				  :stripe="tableConfig.stripe"
				  :border="tableConfig.border"
				  :columns="tableColumn"
				  column-key
				  ref="xTable1"
				  highlight-current-column
				  :scroll-x="{enabled: false}"
				  show-overflow
				  show-header-overflow
				  v-if="tableType === 0">
		</vxe-grid>

		<vxe-table :data="tableData"
				   :stripe="tableConfig.stripe"
				   :border="tableConfig.border"
				   column-key
				   ref="xTable2"
				   highlight-current-column
				   show-overflow
				   show-header-overflow
				   v-if="tableType === 1">
			<vxe-table-column title="选择"
							  align="center"
							  width="80"
							  :type="tableConfig.checkType ? 'checkbox' : 'radio'"
							  v-if="tableConfig.isHaveCheck">
			</vxe-table-column>
			<vxe-table-column title="序号"
							  align="center"
							  width="80"
							  type="seq"
							  v-if="tableConfig.isHaveSeq">
			</vxe-table-column>
			<vxe-table-column v-for="(i, index) in tableColumn"
							  :type="i.type || ''"
							  :key="'tableColumn' + index"
							  :title="i.title"
							  :width="i.width"
							  :min-width="i.minWidth"
							  :fixed="i.fixed"
							  :align="i.align.select"
							  :header-align="i.header_align.select"
							  :field="i.key.select">
			</vxe-table-column>
			<vxe-table-column title="操作"
							  align="center"
							  fixed="right"
							  min-width="100"
							  v-if="tableConfig.isHaveOperation">
				<template v-slot:default>
					<el-button v-for="(i, index) in tableConfig.buttons"
							   :key="'buttons' + index"
							   :type="i.type">{{i.name}}</el-button>
				</template>
			</vxe-table-column>
		</vxe-table>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: '',
	props: {
		requestConfigUrl: {
			type: String,
			default: 'http://172.16.1.92:8082/test/getData'
		},
		requestUrl: {
			type: String,
			default: 'http://172.16.1.92:8082/test/getApiData'
		}
	},
	data() {
		return {
			tableType: '',
			form: {},
			tableData: [],
			tableConfig: {
				isHaveSeq: false,
				resizable: true,
				stripe: true,
				border: 'full',
				checkType: 0
			},
			tableColumn: [],
			screenList: []
		}
	},
	methods: {
		// getTableConfig() {
		// 	axios.post('http://172.16.1.92:8082/test/getData').then(res => {
		// 		console.log(res.data.data)
		// 		this.tableConfig = res.data.data.data.tableConfig
		// 		this.screenList = res.data.data.data.screen
		// 		this.tableColumn = res.data.data.data.column
		// 		this.tableType = res.data.data.data.tableType
		// 		return res.data.data
		// 	})
		// },

		request() {
			let data = {}
			if (this.screenList.length > 0) {
				this.screenList.map(i => {
					data[i.field] = i.fieldName
				})
			}

			axios.post(this.requestUrl, data).then(res => {
				this.tableData = res.data.data
			})
		},

		// 设置表格样式
		setTableClass() {
			this.$nextTick(() => {
				var ha = document.getElementsByClassName('vxe-header--column')
				var hb = document.getElementsByClassName('vxe-header--row')
				var hc = document.getElementsByClassName(
					'vxe-table--header-wrapper'
				)
				var line = document.getElementsByClassName('vxe-body--row')
				console.log(hc)
				ha.forEach(e => {
					// 高
					e.style.height = this.tableConfig.header.height + 'px'
					e.style.lineHeight = this.tableConfig.header.height + 'px'
				})
				hb.forEach(e => {
					// 字体
					e.style.fontSize = this.tableConfig.header.fz + 'px'
					e.style.color = this.tableConfig.header.fc
				})
				hc.forEach(e => {
					// 背景色
					e.style.backgroundColor = this.tableConfig.header.bgc
				})

				line.forEach(e => {
					// 行
					e.style.height = this.tableConfig.row.height + 'px'
					e.style.lineHeight = this.tableConfig.row.height + 'px'
					e.style.fontSize = this.tableConfig.row.fz + 'px'
					let list = e.getAttribute('class').split(' ')
					if (list.indexOf('row--stripe') === -1) {
						e.style.backgroundColor = this.tableConfig.row.bgc
					} else {
						e.style.backgroundColor = this.tableConfig.row.stripeColor
					}
				})

				switch (this.tableType) {
					case 0:
						this.$refs.xTable1.refreshColumn()
						break
					case 1:
						this.$refs.xTable2.refreshColumn()
						break
					default:
						break
				}
			})
		},

		search() {
			this.request()
		},

		request_list() {
			let data = {}
			if (this.screenList.length > 0) {
				this.screenList.map(i => {
					data[i.field] = i.fieldName
				})
			}

			let p1 = axios.post('http://172.16.1.92:8082/test/getData').then(res => {
				// console.log(res.data.data.data)
				return res.data.data
			})

			let p2 = axios.post(this.requestUrl, data).then(res => {
				return res.data.data
			})

			return Promise.all([p1, p2]).then(res => {
				// console.log(res)
				this.tableConfig = res[0].data.tableConfig
				this.screenList = res[0].data.screen
				this.tableColumn = res[0].data.column
				this.tableType = res[0].data.tableType

				this.tableData = res[1]
				this.setTableClass()
			})
		}
	},
	created() {
		// this.getTableConfig()
		// this.request()
		this.request_list()
	}
}
</script>

