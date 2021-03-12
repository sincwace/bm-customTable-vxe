<template>
	<div class="table_design-main">
		<el-row class="h100">
			<el-col :span="4"
					class="h100">
				<div class="design">
					<el-form :model="form"
							 label-width="120px">
						<div class="tc mb10">
							<el-button type="primary"
									   @click="configuration">使用代码配置表格</el-button>
						</div>
						<el-form-item label="表格模式:">
							<el-select v-model="tableType.select"
									   placeholder="请选择表格模式"
									   @change="tableTypeChange">
								<el-option v-for="(i, index) in tableType.options"
										   :key="'tableType' + index"
										   :label="i.label"
										   :value="i.value"
										   :disabled="i.disabled"></el-option>
							</el-select>
						</el-form-item>
						<p class="col_red fz12">在编辑表格前，请先获取表格字段</p>
						<el-form-item label="字段接口:"></el-form-item>
						<div class="mb20">
							<el-input v-model="interfaceUrl"
									  size="mini">
								<template slot="prepend">http://</template>
								<template slot="append">
									<el-button @click="getApiData">点击请求</el-button>
								</template>
							</el-input>
						</div>

						<el-collapse v-model="activeNames"
									 class="resetCollapse">
							<el-collapse-item title="工具栏编辑"
											  :name="1"
											  :disabled="screenDisabled">
								<el-form-item label="筛选条件名称:">
									<el-input v-model="form.screen.title"
											  size="mini"></el-input>
								</el-form-item>
								<el-form-item label="宽度占比:">
									<el-input v-model="form.screen.width"
											  type="number"
											  size="mini"></el-input>
								</el-form-item>
								<el-form-item label="字段名称:">
									<el-select v-model="form.screen.key.select"
											   placeholder="请选择列字段"
											   size="mini"
											   @change="screenKeyChange">
										<el-option v-for="(i, index) in form.screen.key.keys"
												   :key="'screenkeys' + index"
												   :label="i.label"
												   :value="i.value"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="">
									<el-button type="primary"
											   @click="addScreen"
											   size="mini">增加筛选</el-button>
								</el-form-item>
							</el-collapse-item>

							<el-collapse-item title="表属性编辑"
											  :name="2"
											  :disabled="collapseDisabled">
								<el-form-item label="是否有序号:">
									<el-radio-group v-model="form.table.isHaveSeq"
													size="mini"
													@change="isHaveSeqChange">
										<el-radio :label="true">是</el-radio>
										<el-radio :label="false">否</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="是否有选择框:">
									<el-radio-group v-model="form.table.isHaveCheck"
													size="mini"
													@change="isHaveCheckChange">
										<el-radio :label="true">是</el-radio>
										<el-radio :label="false">否</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="选择框模式:"
											  v-if="form.table.isHaveCheck">
									<el-radio-group v-model="form.table.checkType"
													size="mini"
													@change="checkTypeChange">
										<el-radio :label="0">单选</el-radio>
										<el-radio :label="1">复选</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="是否允许拖动列宽:">
									<el-radio v-model="form.table.resizable"
											  :label="true">是</el-radio>
									<el-radio v-model="form.table.resizable"
											  :label="false">否</el-radio>
								</el-form-item>
								<el-form-item label="是否带有斑马纹:">
									<el-radio v-model="form.table.stripe"
											  :label="true">是</el-radio>
									<el-radio v-model="form.table.stripe"
											  :label="false">否</el-radio>
								</el-form-item>
								<el-form-item label="是否带有边框:">
									<el-radio-group v-model="form.table.border"
													size="mini">
										<el-radio :label="false">无边框</el-radio>
										<el-radio :label="'default'">默认边框</el-radio>
										<el-radio :label="'full'">完整边框</el-radio>
										<el-radio :label="'outer'">外边框</el-radio>
										<el-radio :label="'inner'">内边框</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="表头部高度:">
									<el-input type="number"
											  v-model="form.table.header.height" @change="headerHeightChange"></el-input>
								</el-form-item>
								<el-form-item label="表头字体大小:">
									<el-input type="number"
											  v-model="form.table.header.fz" @change="headerFzChange"></el-input>
								</el-form-item>

								<!-- 高级选项 -->
								<template v-if="tableType.select === 1">
									<p class="fz13 mb10 col_red">高级选项</p>
									<el-form-item label="是否有操作列:">
										<el-radio-group v-model="form.table.isHaveOperation"
														@change="isHaveOperationChange">
											<el-radio :label="true">是</el-radio>
											<el-radio :label="false">否</el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item label="选择操作列按钮:"
												  v-if="form.table.isHaveOperation">
										<el-checkbox-group v-model="form.table.buttons" @change="buttonsChange">
											<el-checkbox v-for="(i, index) in btns"
														 :key="'btns' + index"
														 :label="i">{{i.name}}</el-checkbox>
										</el-checkbox-group>
									</el-form-item>
									<el-form-item label="自定义操作按钮:"
												  v-if="form.table.isHaveOperation">
										<el-input v-model="customBtns.name">
											<el-select v-model="customBtns.type.select"
													   slot="prepend"
													   placeholder="请选择按钮类型">
												<el-option v-for="(i, index) in customBtns.type.options"
														   :key="'customBtnsType' + index"
														   :label="i.label"
														   :value="i.type">
													<span style="position: relative;top: 5px;">{{i.label}}</span>
													<el-button :type="i.type"
															   circle></el-button>
												</el-option>
											</el-select>
											<el-button slot="append"
													   icon="el-icon-plus"
													   @click="addCustomBtns"></el-button>
										</el-input>
									</el-form-item>
									<div class="mt10">
										<el-tag v-for="(i, index) in customBtns.list"
												:key="'customBtns.list' + index"
												:type="i.type"
												closable
												size="medium"
												effect="plain"
												@close="tagClose(i)"
												@click="tagConfiguration(i, index)"
												class="cusp">
											{{i.name}}
										</el-tag>
									</div>
								</template>
							</el-collapse-item>

							<el-collapse-item title="列属性编辑"
											  :name="3"
											  :disabled="collapseDisabled">
								<div class="collapse_body">
									<el-form-item label="列名称:">
										<el-input v-model="form.column.title"
												  size="mini"></el-input>
									</el-form-item>
									<el-form-item label="列字段:">
										<el-select v-model="form.column.key.select"
												   placeholder="请选择列字段"
												   size="mini">
											<el-option v-for="(i, index) in form.column.key.keys"
													   :key="'keys' + index"
													   :label="i.label"
													   :value="i.value"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="列宽:">
										<div>
											<el-radio-group v-model="form.column.widthType"
															size="mini"
															@change="widthTypeChange">
												<el-radio :label="0">固定宽度</el-radio>
												<el-radio :label="1">最小宽度</el-radio>
											</el-radio-group>
										</div>
										<div>
											<el-input v-model="form.column.width"
													  placeholder="请输入宽度数值"
													  type="number"
													  v-show="form.column.widthType === 0"
													  size="mini"></el-input>
											<el-input v-model="form.column.minWidth"
													  placeholder="请输入最小宽度数值"
													  type="number"
													  size="mini"
													  v-show="form.column.widthType === 1"></el-input>
										</div>
									</el-form-item>
									<el-form-item label="列头部对齐方式:">
										<el-select v-model="form.column.header_align.select"
												   placeholder="请选择列头部对齐方式"
												   size="mini">
											<el-option v-for="(i, index) in form.column.header_align.options"
													   :key="'header_align' + index"
													   :label="i.label"
													   :value="i.value"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="列对齐方式:">
										<el-select v-model="form.column.align.select"
												   placeholder="请选择列对齐方式"
												   size="mini">
											<el-option v-for="(i, index) in form.column.align.options"
													   :key="'align' + index"
													   :label="i.label"
													   :value="i.value"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="是否允许拖动:">
										<el-radio v-model="form.column.resizable"
												  :label="true">是</el-radio>
										<el-radio v-model="form.column.resizable"
												  :label="false">否</el-radio>
									</el-form-item>
									<el-form-item label="列固定方式:">
										<el-radio v-model="form.column.fixed"
												  :label="''">自动排列</el-radio>
										<el-radio v-model="form.column.fixed"
												  :label="'left'">固定左侧</el-radio>
										<el-radio v-model="form.column.fixed"
												  :label="'right'">固定右侧</el-radio>
									</el-form-item>
									<el-form-item label="是否排序:">
										<el-radio v-model="form.column.sortable"
												  :label="true">是</el-radio>
										<el-radio v-model="form.column.sortable"
												  :label="false">否</el-radio>
									</el-form-item>
									<el-form-item label=""
												  label-width="80px">
										<el-button type="primary"
												   size="mini"
												   @click="addColumn">增加一列</el-button>
										<el-button type="primary"
												   :disabled="selectedColumn.length === 0"
												   size="mini"
												   @click="saveColumn">保存修改</el-button>
									</el-form-item>
								</div>
							</el-collapse-item>
						</el-collapse>
					</el-form>
				</div>
			</el-col>

			<el-col :span="16"
					class="h100">
				<div class="example">
					<div class="mb20">
						<el-form :model="form"
								 label-width="120px">
							<el-row>
								<el-col v-for="(i, index) in screenList"
										:key="'screenList' + index"
										:span="parseInt(i.width)">
									<el-form-item :label="i.title + ':'">
										<el-input v-model="i.field"
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
							  :stripe="form.table.stripe"
							  :border="form.table.border"
							  :columns="tableColumn"
							  column-key
							  ref="xTable1"
							  highlight-current-column
							  :scroll-x="{enabled: false}"
							  @header-cell-click="choseColumn"
							  show-overflow
							  show-header-overflow
							  v-if="tableType.select === 0">
					</vxe-grid>

					<vxe-table :data="tableData"
							   :stripe="form.table.stripe"
							   :border="form.table.border"
							   column-key
							   ref="xTable2"
							   highlight-current-column
							   :scroll-x="{enabled: false}"
							   @header-cell-click="choseColumn"
							   show-overflow
							   show-header-overflow
							   v-if="tableType.select === 1">
						<vxe-table-column title="选择"
										  align="center"
										  width="80"
										  :type="form.table.checkType ? 'checkbox' : 'radio'"
										  v-if="form.table.isHaveCheck">
						</vxe-table-column>
						<vxe-table-column title="序号"
										  align="center"
										  width="80"
										  type="seq"
										  v-if="form.table.isHaveSeq">
						</vxe-table-column>
						<vxe-table-column v-for="(i, index) in tableColumn2"
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
										  v-if="form.table.isHaveOperation">
							<template v-slot:default>
								<el-button v-for="(i, index) in form.table.buttons"
										   :key="'buttons' + index"
										   :type="i.type"
										   :disabled="eval(i.disabledConditions, index)">{{i.name}}</el-button>
							</template>
						</vxe-table-column>
					</vxe-table>

					<div class="menu mt20 tc">
						<el-button type="primary"
								   @click="resetTable"
								   size="mini"
								   :disabled="tableColumn.length === 0">重置所有配置</el-button>
						<!-- <el-button type="primary"
								   @click="previewTable"
								   size="mini"
								   :disabled="tableColumn.length === 0">预览当前配置</el-button> -->
						<el-button type="primary"
								   @click="createJson"
								   size="mini"
								   :disabled="tableColumn.length === 0">生成配置代码</el-button>
						<el-button type="primary"
								   @click="sendConfig"
								   size="mini"
								   :disabled="tableColumn.length === 0">发送配置至服务器</el-button>
						<el-button type="primary"
								   @click="routeToDemo"
								   size="mini"
								   :disabled="tableColumn.length === 0">前往demo</el-button>
					</div>
				</div>
			</el-col>
		</el-row>

		<el-dialog title="按钮属性配置"
				   :visible.sync="btnsDialog.show"
				   width="70%"
				   :close-on-click-modal="false">
			<div>
				<el-form label-width="120px">
					<el-form-item label="禁用条件:">
						<el-input v-model="btnsDialog.disabledConditions"
								  placeholder="输入禁用条件代码"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer"
				 class="tc">
				<el-button type="primary"
						   @click="saveBtn">确定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="预览"
				   :visible.sync="tablePreviewDialog"
				   width="70%">
			<div>
				<vxe-table :data="tableData"
						   :stripe="form.table.stripe"
						   :border="form.table.border"
						   :columns="tableColumn"
						   column-key
						   highlight-current-column
						   show-overflow
						   show-header-overflow>
				</vxe-table>
			</div>
		</el-dialog>

		<el-dialog title="预览"
				   :visible.sync="createJsonDialog"
				   width="70%"
				   :close-on-click-modal="false">
			<el-input type="textarea"
					  autosize
					  v-model="formJson"></el-input>
			<div slot="footer"
				 class="tc">
				<el-button type="primary"
						   @click="saveJson">保存修改代码</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import tableTypeJson from './tableType.json'
import Sortable from 'sortablejs'
import axios from 'axios'

export default {
	name: 'table_design', // 表格表单设计器
	data() {
		return {
			interfaceUrl: '172.16.1.92:8082/test/getApiData',
			screenDisabled: true,
			collapseDisabled: false,
			tableType: {
				select: 1,
				options: [
					{ label: '普通表格', value: 0, disabled: false },
					{ label: '高级表格', value: 1, disabled: false },
					{ label: '树形表格', value: 2, disabled: true }
				]
			},
			btns: [
				{ name: '查看', type: '', disabledConditions: '' },
				{ name: '编辑', type: 'primary', disabledConditions: '' },
				{ name: '删除', type: 'danger', disabledConditions: '' }
			],
			customBtns: {
				name: '',
				type: {
					select: '',
					options: [
						{ label: '默认', type: '' },
						{ label: '主要', type: 'primary' },
						{ label: '成功', type: 'success' },
						{ label: '信息', type: 'info' },
						{ label: '警告', type: 'warning' },
						{ label: '危险', type: 'danger' }
					]
				},
				list: []
			},
			form: {
				screen: {
					title: '',
					width: 6,
					field: '',
					fieldName: '',
					key: {
						select: '',
						keys: []
					}
				},
				table: {
					isHaveSeq: false,
					isHaveCheck: false,
					resizable: true,
					stripe: true,
					border: 'full',
					checkType: 0,
					header: {
						height: 50,
						fz: 14
					},
					isHaveOperation: false,
					buttons: []
				},
				column: {
					title: '',
					widthType: 0,
					width: 100,
					minWidth: 100,
					sortable: false,
					header_align: {
						select: 'center',
						options: [
							{ label: '左对齐', value: 'left' },
							{ label: '居中', value: 'center' },
							{ label: '右对齐', value: 'right' }
						]
					},
					align: {
						select: 'center',
						options: [
							{ label: '左对齐', value: 'left' },
							{ label: '居中', value: 'center' },
							{ label: '右对齐', value: 'right' }
						]
					},
					key: {
						select: '',
						keys: []
					},
					resizable: true,
					fixed: ''
				}
			},
			activeNames: [1, 2, 3],
			tableColumn: [],
			tableColumn2: [],
			screenList: [],
			tableData: [],
			selectedColumn: '',
			tablePreviewDialog: false,
			createJsonDialog: false,
			btnsDialog: {
				show: false,
				disabledConditions: '',
				index: ''
			},
			formJson: '',
			interfaceData: []
		}
	},
	methods: {
		// 使用代码配置表格
		configuration() {
			switch (this.tableType.select) {
				case 0:
					this.formJson = JSON.stringify(tableTypeJson.base, null, 4)
					break
				case 1:
					this.formJson = JSON.stringify(tableTypeJson.chose, null, 4)
					break
				default:
					break
			}
			this.createJsonDialog = true
		},

		// 表格模式监听
		tableTypeChange() {
			this.resetTable()
			switch (this.tableType.select) {
				case 0:
					break
				case 1:
					break
				default:
					break
			}
		},

		// 是否有选择框
		isHaveCheckChange() {
			if (this.form.table.isHaveCheck) {
				this.tableColumn.unshift({
					type: 'radio',
					width: 80,
					title: '选择',
					align: 'center'
				})
				this.form.table.checkType = 0
			} else {
				this.tableColumn.map((i, k) => {
					if (i.title === '选择') {
						this.tableColumn.splice(k, 1)
					}
				})
			}
		},

		// 选择框模式
		checkTypeChange() {
			if (this.tableColumn.length > 0) {
				if (
					this.tableColumn[0].type === 'checkbox' ||
					this.tableColumn[0].type === 'radio'
				) {
					return
				}
				if (this.form.table.checkType) {
					this.tableColumn.unshift({
						type: 'radio',
						width: 80,
						title: '选择'
					})
				} else {
					this.tableColumn.unshift({
						type: 'checkbox',
						width: 80,
						title: '选择'
					})
				}
			} else {
				if (this.form.table.checkType) {
					this.tableColumn.unshift({
						type: 'radio',
						width: 80,
						title: '选择'
					})
				} else {
					this.tableColumn.unshift({
						type: 'checkbox',
						width: 80,
						title: '选择'
					})
				}
			}
		},

		// 筛选字段监听
		screenKeyChange() {
			this.form.screen.field = this.form.screen.key.select
		},

		// 增加筛选
		addScreen() {
			let screenData = this.$deepCopy(this.form.screen)
			this.screenList.push(screenData)
		},

		// 点击搜索
		search() {
			// 请求....
		},

		// 操作列监听
		isHaveOperationChange() {
			if (this.form.table.isHaveOperation) {
				this.tableData = this.interfaceData
			}
		},

		// 增加自定义操作按钮
		addCustomBtns() {
			if (this.customBtns.name.length === 0) {
				this.$message({
					type: 'warning',
					message: '请输入按钮名称'
				})
				return
			}
			this.customBtns.list.push({
				name: this.customBtns.name,
				type: this.customBtns.type.select
			})
			this.form.table.buttons.push({
				type: this.customBtns.type.select,
				name: this.customBtns.name,
				disabledConditions: ''
			})
			this.customBtns.name = ''
			this.customBtns.type.select = ''
		},

		// 点选按钮
		buttonsChange() {
			// console.log(this.form.table.buttons)
			this.customBtns.list = this.$deepCopy(this.form.table.buttons)
		},

		// 删除自定义按钮
		tagClose(data) {
			this.form.table.buttons.map((i, k) => {
				if (i.name === data.name) {
					this.form.table.buttons.splice(k, 1)
				}
			})
			this.customBtns.list.map((i, k) => {
				if (i.name === data.name) {
					this.customBtns.list.splice(k, 1)
				}
			})
		},

		// 配置按钮信息
		tagConfiguration(data, index) {
			this.btnsDialog.show = true
			this.btnsDialog.index = index
		},

		// 保存按钮信息
		saveBtn() {
			this.form.table.buttons[this.btnsDialog.index].disabledConditions = this.btnsDialog.disabledConditions
			this.btnsDialog.show = false
			console.log(this.form.table.buttons)
		},

		// 序号列监听
		isHaveSeqChange() {
			if (this.form.table.isHaveSeq) {
				if (
					this.tableColumn.length === 0 ||
					this.tableColumn[0].title !== '选择'
				) {
					this.tableColumn.unshift({
						type: 'seq',
						width: 80,
						title: '序号',
						align: 'center'
					})
				} else {
					this.tableColumn.splice(1, 0, {
						type: 'seq',
						width: 80,
						title: '序号',
						align: 'center'
					})
				}
			} else {
				this.tableColumn.map((i, k) => {
					if (i.title === '序号') {
						this.tableColumn.splice(k, 1)
					}
				})
			}
			this.tableData = this.$deepCopy(this.interfaceData)
		},

		// 列宽模式监听
		widthTypeChange() {
			if (this.form.column.widthType) {
				this.form.column.minWidth = 100
				this.form.column.width = ''
			} else {
				this.form.column.minWidth = ''
				this.form.column.width = 100
			}
		},

		// 增加一列
		addColumn() {
			if (this.form.column.title.length === 0) {
				this.$message({
					type: 'warning',
					message: '列名没写'
				})
				return
			}
			if (this.form.column.key.select.length === 0) {
				this.$message({
					type: 'warning',
					message: '列字段没选'
				})
				return
			}

			let column = this.$deepCopy(this.form.column)
			let obj = {
				title: column.title,
				width: column.width,
				minWidth: column.minWidth,
				fixed: column.fixed.select,
				align: column.align.select,
				headerAlign: column.header_align.select,
				sortable: column.sortable,
				data: column,
				field: column.key.select
			}
			if (!this.tableType.select) {
				this.tableColumn.push(obj)
			} else {
				this.tableColumn2.push(column)
			}

			this.$nextTick(() => {
				let xTable = this.tableType.select
					? this.$refs.xTable2
					: this.$refs.xTable1
				this.sortable1 = Sortable.create(
					xTable.$el.querySelector(
						'.body--wrapper>.vxe-table--header .vxe-header--row'
					),
					{
						handle: '.vxe-header--column:not(.col--fixed)',
						onEnd: ({ item, newIndex, oldIndex }) => {
							const {
								fullColumn,
								tableColumn
							} = xTable.getTableColumn()
							const targetThElem = item
							const wrapperElem = targetThElem.parentNode
							const newColumn = fullColumn[newIndex]
							if (newColumn.fixed) {
								// 错误的移动
								if (newIndex > oldIndex) {
									wrapperElem.insertBefore(
										targetThElem,
										wrapperElem.children[oldIndex]
									)
								} else {
									wrapperElem.insertBefore(
										wrapperElem.children[oldIndex],
										targetThElem
									)
								}
								return this.$XModal.message({
									message: '固定列不允许拖动！',
									status: 'error'
								})
							}
							// 转换真实索引
							const oldColumnIndex = xTable.getColumnIndex(
								tableColumn[oldIndex]
							)
							const newColumnIndex = xTable.getColumnIndex(
								tableColumn[newIndex]
							)
							// 移动到目标列
							const currRow = fullColumn.splice(
								oldColumnIndex,
								1
							)[0]
							fullColumn.splice(newColumnIndex, 0, currRow)
							xTable.loadColumn(fullColumn)
						}
					}
				)
				this.tableData = this.$deepCopy(this.interfaceData)
			})
		},

		// 列选择
		choseColumn(val) {
			// console.log(val)
			this.selectedColumn = val.$columnIndex
			if (this.tableColumn[val.$columnIndex].data) {
				this.form.column = this.$deepCopy(
					this.tableColumn[val.$columnIndex].data
				)
			} else {
				this.form.column.title = val.column.title || ''
				this.form.column.width = val.column.width || ''
				this.form.column.minWidth = val.column.minWidth || ''
				this.form.column.sortable = val.column.sortable || false
				this.form.column.header_align.select =
					val.column.headerAlign || 'left'
				this.form.column.align.select = val.column.align || 'left'
				this.form.column.resizable = val.column.resizable || true
				this.form.column.fixed = val.column.fixed || false
			}
		},

		// 保存修改
		saveColumn() {
			this.tableData = this.interfaceData
			let column = this.$deepCopy(this.form.column)
			let obj = {
				title: column.title,
				width: column.width,
				minWidth: column.minWidth,
				fixed: column.fixed.select,
				align: column.align.select,
				headerAlign: column.header_align.select,
				sortable: column.sortable,
				data: column,
				field: column.key.select
			}
			this.$set(this.tableColumn, this.selectedColumn, obj)
			this.$refs.xTable1.refreshColumn()
		},

		// 保存表格修改
		saveTable() {
			// console.log(this.form.table)
			this.$refs.xTable1.refreshColumn()
		},

		// 重置配置
		resetTable() {
			this.form = {
				screen: {
					title: '',
					width: 6,
					field: '',
					fieldName: '',
					key: {
						select: '',
						keys: []
					}
				},
				table: {
					isHaveSeq: false,
					isHaveCheck: false,
					resizable: true,
					stripe: true,
					border: 'full',
					checkType: 0,
					isHaveOperation: false,
					buttons: []
				},
				column: {
					title: '',
					widthType: 0,
					width: 100,
					minWidth: 100,
					sortable: false,
					header_align: {
						select: 'center',
						options: [
							{ label: '左对齐', value: 'left' },
							{ label: '居中', value: 'center' },
							{ label: '右对齐', value: 'right' }
						]
					},
					align: {
						select: 'center',
						options: [
							{ label: '左对齐', value: 'left' },
							{ label: '居中', value: 'center' },
							{ label: '右对齐', value: 'right' }
						]
					},
					key: {
						select: '',
						keys: []
					},
					resizable: true,
					fixed: false
				}
			}
			this.selectedColumn = ''
			this.screenList = []
			this.tableData = []
			this.tableColumn = []
		},

		// 预览当前表格
		previewTable() {
			this.tablePreviewDialog = true
		},

		// 预览代码
		createJson() {
			let obj = {
				screenList: this.screenList,
				tableColumn: this.tableColumn,
				tableConfig: this.form.table
			}
			this.formJson = JSON.stringify(obj, null, 4)
			this.createJsonDialog = true
		},

		// 保存代码修改
		saveJson() {
			let code = eval('(' + this.formJson + ')')
			if (typeof code !== 'object') {
				this.$message({
					type: 'warning',
					message: '代码无法解析成一个对象, 请检查代码准确性'
				})
			} else {
				this.screenList = code.screenList
				this.tableColumn = code.tableColumn
				this.createJsonDialog = false
			}
		},

		// 发送配置去数据库
		sendConfig() {
			let config = {
				table: this.form.table,
				column: this.tableColumn,
				screen: this.screenList
			}
			axios
				.post('http://172.16.1.92:8082/test/saveData', {
					data: config
				})
				.then(res => {
					// console.log(res)
					this.$message({
						type: 'warning',
						message: res.data.msg
					})
				})
		},

		// 获取配置
		getApiData() {
			this.collapseDisabled = true
			// this.interfaceData = [
			//     { title: '中国航天技术学院招生简章', num: 30, desc: '这是一段关于航天技术学院的简单介绍' },
			//     { title: '中国航天技术学院招生简章', num: 30, desc: '这是一段关于航天技术学院的简单介绍' },
			//     { title: '中国航天技术学院招生简章', num: 30, desc: '这是一段关于航天技术学院的简单介绍' },
			//     { title: '中国航天技术学院招生简章', num: 30, desc: '这是一段关于航天技术学院的简单介绍' },
			//     { title: '中国航天技术学院招生简章', num: 30, desc: '这是一段关于航天技术学院的简单介绍' }
			// ]
			// let list = Object.keys(this.interfaceData[0])
			// this.form.column.key.select = ''
			// this.form.column.key.keys = []
			// this.form.screen.key.select = ''
			// this.form.screen.key.keys = []
			// if (list.length > 0) {
			//     list.map((i, k) => {
			//         this.form.column.key.keys.push({
			//             label: i,
			//             value: i
			//         })
			//         this.form.screen.key.keys.push({
			//             label: i,
			//             value: i
			//         })
			//     })
			//     this.$message({
			//         type: 'success',
			//         message: '成功获取字段信息, 可以编辑表格了'
			//     })
			//     this.collapseDisabled = false
			//     this.screenDisabled = false
			//     this.activeNames = [1, 2, 3]
			// }
			axios.post('http://' + this.interfaceUrl).then(res => {
				// console.log(res)
				if (res.data.code === 0) {
					if (res.data.data.length === 0) {
						this.$message({
							type: 'warning',
							message: '未获取到字段数据, 请检查接口'
						})
					} else {
						this.interfaceData = this.$deepCopy(res.data.data)
						let list = Object.keys(res.data.data[0])
						this.form.column.key.select = ''
						this.form.column.key.keys = []
						this.form.screen.key.select = ''
						this.form.screen.key.keys = []
						if (list.length > 0) {
							list.map((i, k) => {
								this.form.column.key.keys.push({
									label: i,
									value: i
								})
								this.form.screen.key.keys.push({
									label: i,
									value: i
								})
							})
							this.$message({
								type: 'success',
								message: '成功获取字段信息, 可以编辑表格了'
							})
							this.collapseDisabled = false
							this.screenDisabled = false
							this.activeNames = [1, 2, 3]
						} else {
							this.$message({
								type: 'warning',
								message: '数组对象没有子属性'
							})
						}
					}
				}
			})
		},

		// 前往demo
		routeToDemo() {
			this.$router.push({ name: 'demo' })
		},

		// 头部高度
		headerHeightChange() {
			var hc = document.getElementsByClassName('vxe-header--column')
			console.log(hc)
		},

		// 头部字体
		headerFzChange() {

		},

		eval(data, index) {
			console.log(data)
			return eval(data)
		}
	},
	created() {}
}
</script>

<style lang="less">
.table_design-main {
	height: 100%;
	.el-tag {
		margin-right: 5px;
		margin-top: 5px;
	}
	.design {
		height: 100%;
		padding: 20px 10px;
		border-right: 1px solid #efefef;
		overflow: auto;
		.el-radio-group {
			width: 100%;
		}
		.el-radio {
			max-width: 48%;
			margin-right: 4%;
			line-height: 28px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			-webkit-line-clamp: 1;
		}
	}
	.example {
		height: 100%;
		padding: 20px 10px;
		border-right: 1px solid #efefef;
		.active {
			border: 3px solid blue;
			box-sizing: border-box;
		}
		.vxe-table {
			.vxe-header--column {
				padding: 0;
				line-height: 50px;
				height: 50px;
			}
		}
	}
}
</style>


