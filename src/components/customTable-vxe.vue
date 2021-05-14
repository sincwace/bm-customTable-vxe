<template>
	<div class="CustomTableVxe-main">
		<div class="mb20" v-if="screenList.length > 0">
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

		<div class="table-body-main" v-if="tableShow">
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
					   resizable
					   column-key
					   ref="xTable2"
					   height="auto"
					   auto-resize
					   highlight-current-column
					   :highlight-current-row="true"
					   show-overflow
					   show-header-overflow
					   v-show="tableType === 1"
					   @cell-click="cellClick"
					   @radio-change="radioChange"
					   @checkbox-change="checkboxChange"
					   @checkbox-all="checkboxAll"
					   @current-change="currentChange">
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
								  :align="i.align"
								  :header-align="i.headerAlign"
								  :field="i.field"
								  :sortable="i.sortable">
					<template #default="{ row }"
							  v-if="i.isUseTemplate">
						<slot :name="i.title"
							  :row="row"></slot>
					</template>
				</vxe-table-column>
				<vxe-table-column title="操作"
								  align="center"
								  fixed="right"
								  min-width="100"
								  :width="tableConfig.buttons.length * 90"
								  v-if="tableConfig.isHaveOperation && btnEvent.length > 0 && tableConfig.buttons.length > 0">
					<template #default="{row, rowIndex}">
						<vxe-button v-for="(i, index) in tableConfig.buttons"
									size="mini"
									:key="'buttons' + index"
									:status="i.type"
									:icon="btnEvent[index].icon"
									:disabled="btnEvent[index].disabled(row)"
									@click="btnEvent[index].click(row)"
									v-show="btnEvent[index].show(row)">{{i.name}}</vxe-button>
					</template>
				</vxe-table-column>
			</vxe-table>

			<vxe-table resizable
					   :border="tableConfig.border"
					   ref="xTree"
					   :tree-config="{children: 'children', accordion: true, line: true, iconOpen: 'vxe-icon--caret-bottom', iconClose: 'vxe-icon--caret-right'}"
					   :data="tableData"
					   v-if="tableType === 2">
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
				<vxe-table-column :field="tableConfig.tree.father.key.select"
								  :title="tableConfig.tree.father.title"
								  align="left"
								  header-align="center"
								  tree-node></vxe-table-column>
				<vxe-table-column v-for="(i, index) in tableColumn"
								  :key="'tableColumn' + index"
								  :field="i.key.select"
								  :title="i.title"
								  :width="i.width"
								  :min-width="i.minWidth"
								  :fixed="i.fixed"
								  :align="i.align.select"
								  :header-align="i.header_align.select"></vxe-table-column>
			</vxe-table>
		</div>

		<div class="pagination"
			 v-if="pagination.isHave">
			<vxe-pager align="center"
					   :current-page.sync="page.currentPage"
					   :page-size.sync="page.pageSize"
					   :total="page.total"
					   :page-sizes="[10, 20, 100, {label: '大量数据', value: 1000}, {label: '全量数据', value: -1}]"
					   :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"
					   @page-change="pageChange">
			</vxe-pager>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { setTimeout } from 'timers';

export default {
	name: 'CustomTableVxe',
	props: {
		requestConfigUrl: {
			// 表格配置接口地址
			type: String,
			default: 'http://172.16.1.92:8082/test/getData'
		},

		requestUrl: {
			// 表格数据接口地址
			type: String,
			default: 'http://172.16.1.92:8082/test/getApiData'
		},

		btnEvent: {
			type: Array,
			default: () => {
				return []
			}
		},

		config: {
			type: Object,
			default: () => {
				return null
			}
		},

		data: {
			type: Array,
			default: () => {
				return []
			}
		},

		page: {
			type: Object,
			default: () => {
				return {
					currentPage: 1,
					pageSize: 10,
					total: 10
				}
			}
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
			screenList: [],
			pagination: {
				isHave: false
			},
			tableShow: true
		}
	},
	methods: {
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
			this.tableShow = false

			setTimeout(() => {
				this.tableShow = true
				this.$nextTick(() => {
					var ha = document.getElementsByClassName('vxe-header--column')
					var hb = document.getElementsByClassName('vxe-header--row')
					var hc = document.getElementsByClassName(
						'vxe-table--header-wrapper'
					)
					var line = document.getElementsByClassName('vxe-body--row')
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
						case '0':
							this.$refs.xTable1.refreshColumn()
							break
						case '1':
							this.$refs.xTable2.refreshColumn()
							break
						default:
							break
					}
				})
			}, 200)
			
		},

		// 搜索
		search() {
			this.request()
		},

		// 请求链
		request_list() {
			let data = {}
			if (this.screenList.length > 0) {
				this.screenList.map(i => {
					data[i.field] = i.fieldName
				})
			}

			let p1 = axios
				.post('http://172.16.1.92:8082/test/getData')
				.then(res => {
					console.log(res.data.data.data)
					return res.data.data
				})

			let p2 = axios.post(this.requestUrl, data).then(res => {
				console.log(res.data.data)
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
		},

		// radioChange
		radioChange(obj) {
			this.$emit('radio-change', obj)
		},

		// checkboxChange
		checkboxChange() {
			this.$emit('checkbox-change', obj)
		},

		// checkboxAll
		checkboxAll(obj) {
			this.$emit('checkbox-all', obj)
		},

		// currentChange
		currentChange(obj) {
			this.$emit('current-change', obj)
		},

		// cellClick
		cellClick(obj) {
			this.$emit('cell-click', obj)
		},

		// pageChange
		pageChange(obj) {
			this.$emit('page-change', obj)
		}
	},
	created() {
		// this.getTableConfig()
		// this.request()
		if (this.requestConfigUrl.length > 0 && this.requestUrl.length > 0) {
			this.request_list()
		}
		if (this.data.length > 0) {
			this.tableData = this.data
		}
	},
	watch: {
		config(val) {
			this.tableConfig = val.tableConfig
			this.screenList = val.screen || []
			this.tableColumn = val.column
			this.tableType = val.tableType
			this.pagination = val.pagination || { isHave: false }
			this.setTableClass()
		}
	}
}
</script>

<style lang="less">
.CustomTableVxe-main {
	@pageHeight: 48px;

	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	padding-bottom: @pageHeight;

	.table-body-main {
		flex: 1;
		height: 100%;
	}

	.pagination {
		width: 100%;
		height: @pageHeight;
		position: absolute;
		bottom: 0;
		text-align: center;
	}
}
</style>

