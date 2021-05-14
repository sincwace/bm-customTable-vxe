<template>
	<div class="table_design-main">
		<el-row class="h100">
			<el-col :span="4"
					class="h100">
				<div class="design">
					<el-form :model="form"
							 label-width="130px">
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
						<p class="col_red fz12 mb10">在编辑表格前，请先获取表格字段</p>
						<el-form-item label="创建一个功能模块:">
							<el-input v-model="moduleName">
								<el-button slot="append" 
										   type="primary" 
										   icon="el-icon-plus"
										   @click="appendModule"></el-button>
							</el-input>
						</el-form-item>

						<el-collapse v-model="activeNames"
									 class="resetCollapse">
							<!-- 工具栏 -->
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

							<!-- 表 -->
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
								<el-form-item label="是否有展开行:"
											  v-if="tableType.select !== 2">
									<el-radio-group v-model="form.table.isHaveExpand"
													size="mini"
													@change="isHaveExpandChange">
										<el-radio :label="true">是</el-radio>
										<el-radio :label="false">否</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="是否允许拖动列宽:">
									<el-radio v-model="form.table.resizable"
											  :label="true">是</el-radio>
									<el-radio v-model="form.table.resizable"
											  :label="false">否</el-radio>
								</el-form-item>
								<el-form-item label="是否带有斑马纹:"
											  v-if="tableType.select !== 2">
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
											  v-model="form.table.header.height"
											  @change="headerHeightChange"></el-input>
								</el-form-item>
								<el-form-item label="表头字体大小:">
									<el-input type="number"
											  v-model="form.table.header.fz"
											  @change="headerFzChange"></el-input>
								</el-form-item>
								<el-form-item label="表头背景颜色:">
									<el-input v-model="form.table.header.bgc"
											  disabled
											  size="medium">
										<el-color-picker v-model="form.table.header.bgc"
														 slot="append"
														 @change="headerBgcChange"></el-color-picker>
									</el-input>
								</el-form-item>
								<el-form-item label="表头字体颜色:">
									<el-input v-model="form.table.header.fc"
											  disabled
											  size="medium">
										<el-color-picker v-model="form.table.header.fc"
														 slot="append"
														 @change="headerfcChange"></el-color-picker>
									</el-input>
								</el-form-item>

								<el-form-item label="行高度:">
									<el-input type="number"
											  v-model="form.table.row.height"
											  @change="rowHeightChange"></el-input>
								</el-form-item>
								<el-form-item label="行字体大小:">
									<el-input type="number"
											  v-model="form.table.row.fz"
											  @change="rowFzChange"></el-input>
								</el-form-item>
								<el-form-item label="行背景颜色:">
									<el-input v-model="form.table.row.bgc"
											  disabled
											  size="medium">
										<el-color-picker v-model="form.table.row.bgc"
														 slot="append"
														 @change="rowBgcChange"></el-color-picker>
									</el-input>
								</el-form-item>
								<el-form-item label="行字体颜色:">
									<el-input v-model="form.table.row.fc"
											  disabled
											  size="medium">
										<el-color-picker v-model="form.table.row.fc"
														 slot="append"
														 @change="rowfcChange"></el-color-picker>
									</el-input>
								</el-form-item>
								<el-form-item label="斑马纹颜色:"
											  v-if="tableType.select !== 2">
									<el-input v-model="form.table.row.stripeColor"
											  disabled
											  size="medium">
										<el-color-picker v-model="form.table.row.stripeColor"
														 slot="append"
														 @change="rowStripeColorChange"></el-color-picker>
									</el-input>
								</el-form-item>

								<!-- 高级选项 -->
								<template v-if="tableType.select === 1 || tableType.select === 2">
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
										<el-checkbox-group v-model="form.table.buttons"
														   @change="buttonsChange">
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
									<div class="mt10 mb10">
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

								<!-- 树形表格选项 -->
								<template v-if="tableType.select === 2">
									<el-form-item label="父级标题:">
										<el-input v-model="form.table.tree.father.title"></el-input>
									</el-form-item>
									<el-form-item label="父级字段:">
										<el-select v-model="form.table.tree.father.key.select"
												   placeholder="请选择列字段"
												   size="mini">
											<el-option v-for="(i, index) in form.table.tree.father.key.keys"
													   :key="'fatherkeys' + index"
													   :label="i.label"
													   :value="i.value"></el-option>
										</el-select>
									</el-form-item>
								</template>
							</el-collapse-item>

							<!-- 列 -->
							<el-collapse-item title="列属性编辑"
											  :name="3"
											  :disabled="collapseDisabled">
								<div class="collapse_body">
									<el-form-item label="自定义模板:">
										<el-radio-group v-model="form.column.isUseTemplate">
											<el-radio :label="true">是</el-radio>
											<el-radio :label="false">否</el-radio>
										</el-radio-group>
									</el-form-item>
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
									<el-button type="primary"
											   size="mini"
											   @click="addColumn">增加一列</el-button>
									<el-button type="primary"
											   :disabled="selectedColumn.length === 0 || !columnType"
											   size="mini"
											   @click="saveColumn">保存修改</el-button>
									<el-button type="danger"
											   :disabled="selectedColumn.length === 0 || deleteColumnBtn || !columnType"
											   size="mini"
											   @click="deleteColumn">删除该列</el-button>
								</div>
							</el-collapse-item>

							<!-- 分页 -->
							<el-collapse-item title="分页编辑"
											  :name="4"
											  :disabled="collapseDisabled">
								<el-form-item label="是否有分页:">
									<el-radio-group v-model="form.pagination.isHave"
													size="mini">
										<el-radio :label="true">是</el-radio>
										<el-radio :label="false">否</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="选择功能:">
									<el-checkbox-group v-model="form.pagination.layouts"
													   @change="layoutsChange"
													   disabled>
										<el-checkbox v-for="(i, index) in form.pagination.layoutChecks"
													 :key="'layoutChecks' + index"
													 :label="i">{{i.name}}</el-checkbox>
									</el-checkbox-group>
								</el-form-item>
							</el-collapse-item>
						</el-collapse>
					</el-form>
				</div>
			</el-col>

			<el-col :span="16"
					class="h100">
				<div class="example">
					<!-- 工具栏 -->
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

					<!-- 普通表格 -->
					<vxe-grid :data="tableData"
							  :stripe="form.table.stripe"
							  :border="form.table.border"
							  :columns="tableColumn"
							  resizable
							  column-key
							  ref="xTable1"
							  highlight-current-column
							  :scroll-x="{enabled: false}"
							  @header-cell-click="choseColumn"
							  show-overflow
							  show-header-overflow
							  v-if="tableType.select === 0">
					</vxe-grid>

					<!-- 高级表格 -->
					<vxe-table :data="tableData"
							   :stripe="form.table.stripe"
							   :border="form.table.border"
							   :resizable="form.table.resizable"
							   column-key
							   ref="xTable2"
							   highlight-current-column
							   :scroll-x="{enabled: false}"
							   @header-cell-click="choseColumn"
							   show-overflow
							   show-header-overflow
							   v-if="tableType.select === 1"
							   @resizable-change="resizableChange">
						<vxe-table-column title="选择"
										  align="center"
										  width="80"
										  type="radio"
										  v-if="form.table.isHaveCheck && !form.table.checkType">
						</vxe-table-column>
						<vxe-table-column title="选择"
										  align="center"
										  width="80"
										  type="checkbox"
										  v-if="form.table.isHaveCheck && form.table.checkType">
						</vxe-table-column>
						<vxe-table-column title="序号"
										  align="center"
										  width="80"
										  type="seq"
										  v-if="form.table.isHaveSeq">
						</vxe-table-column>
						<vxe-table-column type="expand"
										  width="80"
										  v-if="form.table.isHaveExpand">
							<template #content="{ row, rowIndex }">
								...
							</template>
						</vxe-table-column>
						<vxe-table-column v-for="(i, index) in tableColumn2"
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
								自定义模板
							</template>
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

					<!-- 树形表格 -->
					<vxe-table ref="xTable3"
							   :data="tableData"
							   :stripe="form.table.stripe"
							   :border="form.table.border"
							   :resizable="form.table.resizable"
							   :tree-config="{children: 'children', accordion: true, line: true, iconOpen: 'vxe-icon--caret-bottom', iconClose: 'vxe-icon--caret-right'}"
							   v-if="tableType.select === 2">
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
						<vxe-table-column :field="form.table.tree.father.key.select"
										  :title="form.table.tree.father.title"
										  align="left"
										  header-align="center"
										  tree-node></vxe-table-column>
						<vxe-table-column v-for="(i, index) in tableColumn3"
										  :key="'tableColumn3' + index"
										  :field="i.key.select"
										  :title="i.title"
										  :width="i.width"
										  :min-width="i.minWidth"
										  :fixed="i.fixed"
										  :align="i.align.select"
										  :header-align="i.header_align.select"></vxe-table-column>
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

					<!-- 分页 -->
					<div class="pagination"
						 v-if="form.pagination.isHave">
						<vxe-pager align="center"
								   :current-page.sync="page.currentPage"
								   :page-size.sync="page.pageSize"
								   :total="page.total"
								   :page-sizes="[10, 20, 100, {label: '大量数据', value: 1000}, {label: '全量数据', value: -1}]"
								   :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"
								   @page-change="pageChange">
						</vxe-pager>
					</div>

					<!-- 菜单 -->
					<div class="menu mt20 tc">
						<el-button type="primary"
								   @click="resetTable"
								   size="mini"
								   :disabled="tableColumn2.length === 0">重置所有配置</el-button>
						<el-button type="primary"
								   @click="createJson"
								   size="mini"
								   :disabled="tableColumn2.length === 0">生成配置代码</el-button>
						<el-button type="primary"
								   @click="sendConfig"
								   size="mini"
								   :disabled="tableColumn2.length === 0">发送配置至服务器</el-button>
						<el-button type="primary"
								   @click="routeToDemo"
								   size="mini"
								   :disabled="tableColumn2.length === 0">前往demo</el-button>
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
import qs from 'qs'

export default {
	name: 'DesignTableVxe', // 表格表单设计器
	data() {
		return {
			interfaceUrl: '172.16.1.92:8082/test/getApiData', // 真实接口url示例
			moduleName: '', // 创建的模块名
			screenDisabled: true, 
			collapseDisabled: true,
			tableType: {
				select: 1,
				options: [
					{ label: '普通表格', value: 0, disabled: true },
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
					isHaveExpand: false,
					resizable: true,
					stripe: true,
					border: 'full',
					checkType: 0,
					header: {
						height: 50,
						fz: 14,
						bgc: '#f8f8f9',
						fc: '#606266'
					},
					row: {
						height: 50,
						fz: 14,
						bgc: '#fff',
						fc: '#606266',
						stripeColor: '#fafafa'
					},
					isHaveOperation: false,
					buttons: [],
					tree: {
						father: {
							title: '',
							key: {
								select: '',
								keys: []
							}
						}
					}
				},
				column: {
					isUseTemplate: false,
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
				},
				pagination: {
					isHave: false,
					layoutChecks: [
						{ name: '显示总数', value: 'total' },
						{ name: '每页条数', value: 'sizes' },
						{ name: '直接前往', value: 'jumper' }
					],
					layouts: [],
					layout: 'prev, pager, next'
				}
			},
			activeNames: [],
			tableColumn: [],
			tableColumn2: [],
			tableColumn3: [],
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
			interfaceData: [],
			deleteColumnBtn: true,
			columnType: 1,
			page: {
				currentPage: 1,
				pageSize: 10,
				total: 10
			}
		}
	},
	methods: {
		// 刷新整个表格
		refreshTable() {
			this.tableType.select = ''
			setTimeout(() => {
				this.tableType.select = 1
			}, 100)
		},

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
			this.tableData = this.$deepCopy(this.interfaceData)
		},

		// 选择框模式
		checkTypeChange(val) {
			// console.log(val)
			this.refreshTable()
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
			this.form.table.buttons[
				this.btnsDialog.index
			].disabledConditions = this.btnsDialog.disabledConditions
			this.btnsDialog.show = false
			// console.log(this.form.table.buttons)
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

		// 展开行选择
		isHaveExpandChange() {
			if (!this.tableType.select) {
				this.tableColumn.unshift({
					type: 'expand',
					width: 80
				})
			}
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
				fixed: column.fixed,
				align: column.align.select,
				headerAlign: column.header_align.select,
				sortable: column.sortable,
				field: column.key.select,
				isUseTemplate: column.isUseTemplate
			}

			switch (this.tableType.select) {
				case 0:
					this.tableColumn.push(obj)
					break
				case 1:
					if (this.selectedColumn !== '') {
						this.tableColumn2.splice(
							this.selectedColumn + 1,
							0,
							obj
						)
					} else {
						this.tableColumn2.push(obj)
					}
					break
				case 2:
					this.tableColumn3.push(obj)
					break
				default:
					break
			}
			this.tableData = this.$deepCopy(this.interfaceData)
			if (this.tableType.select === 2) return
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
			})
		},

		// 列选择
		choseColumn(val, width) {
			console.log(val)
			let typeList = ['radio', 'seq', 'checkbox', 'expand']
			if (
				typeList.indexOf(val.column.type) !== -1 ||
				val.column.title === '操作'
			) {
				this.columnType = 0
				return
			} else {
				this.columnType = 1
			}

			let index = ''
			switch (this.tableType.select) {
				case 0:
					index = this.arr_object_contrast(
						this.tableColumn,
						'title',
						val.column.title
					)
					break
				case 1:
					index = this.arr_object_contrast(
						this.tableColumn2,
						'title',
						val.column.title
					)
				default:
					break
			}
			if (index !== false) {
				this.selectedColumn = index
			} else {
				console.log('逻辑错误，检查代码')
			}
			this.form.column.title = val.column.title || ''
			if (typeof width === 'String' || typeof width === 'Number') {
				this.form.column.width = width
			} else {
				this.form.column.width = val.column.width || ''
			}
			this.form.column.isUseTemplate = this.tableColumn2[this.selectedColumn].isUseTemplate
			this.form.column.minWidth = val.column.minWidth || ''
			this.form.column.sortable = val.column.sortable || false
			this.form.column.header_align.select =
				val.column.headerAlign || 'left'
			this.form.column.align.select = val.column.align || 'left'
			this.form.column.resizable = val.column.resizable || true
			this.form.column.fixed = val.column.fixed || ''
			this.form.column.key.select = this.tableColumn2[
				this.selectedColumn
			].field
		},

		// 保存修改
		saveColumn() {
			this.tableData = this.interfaceData
			let column = this.$deepCopy(this.form.column)

			let obj = {
				title: column.title,
				width: column.width,
				minWidth: column.minWidth,
				fixed: column.fixed,
				align: column.align.select,
				headerAlign: column.header_align.select,
				sortable: column.sortable,
				field: column.key.select,
				isUseTemplate: column.isUseTemplate
			}

			// return

			// console.log(this.selectedColumn)
			// console.log(this.tableColumn2)
			// return

			switch (this.tableType.select) {
				case 0: // 普通表格
					this.$set(this.tableColumn, this.selectedColumn, obj)
					this.$refs.xTable1.refreshColumn()
					break
				case 1: // 高级表格
					this.$set(this.tableColumn2, this.selectedColumn, obj)
					this.$refs.xTable2.reloadData(this.interfaceData)
					this.$refs.xTable2.refreshColumn()
				default:
					break
			}

			this.refreshTable()
		},

		// 删除一列
		deleteColumn() {
			// console.log(this.selectedColumn)
			this.tableColumn2.splice(this.selectedColumn, 1)
		},

		// 保存表格修改
		saveTable() {
			// console.log(this.form.table)
			switch (this.tableType.select) {
				case 0:
					this.$refs.xTable1.refreshColumn()
					break
				case 1:
					this.$refs.xTable2.refreshColumn()
					break
				default:
					break
			}
		},

		// resizable监听 obj = { $rowIndex, column, columnIndex, $columnIndex, $event }
		resizableChange(obj) {
			// console.log(obj.column.resizeWidth)
			this.choseColumn(obj, obj.column.resizeWidth)
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
					buttons: [],
					header: {
						height: 50,
						fz: 14,
						bgc: '#f8f8f9',
						fc: '#606266'
					},
					row: {
						height: 50,
						fz: 14,
						bgc: '#fff',
						fc: '#606266',
						stripeColor: '#fafafa'
					},
					tree: {
						father: {
							title: '',
							key: {
								select: '',
								keys: []
							}
						}
					}
				},
				column: {
					isUseTemplate: false,
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
				},
				pagination: {
					isHave: false,
					layoutChecks: [
						{ name: '显示总数', value: 'total' },
						{ name: '每页条数', value: 'sizes' },
						{ name: '直接前往', value: 'jumper' }
					],
					layouts: [],
					layout: 'prev, pager, next'
				}
			}
			this.functionModule.select = ''
			this.selectedColumn = ''
			this.screenList = []
			this.tableData = []
			this.tableColumn = []
			this.tableColumn2 = []
			this.tableColumn3 = []
		},

		// 预览当前表格
		previewTable() {
			this.tablePreviewDialog = true
		},

		// 预览代码
		createJson() {
			let obj = {
				tableType: this.tableType.select,
				screenList: this.screenList,
				tableColumn: this.tableType.select
					? this.tableColumn2
					: this.tableColumn,
				tableConfig: this.form.table,
				pagination: this.form.pagination
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
				tableType: this.tableType.select,
				column: this.tableType.select
					? this.tableColumn2
					: this.tableColumn,
				screen: this.screenList,
				tableConfig: this.form.table,
				pagination: this.form.pagination
			}

			let query = qs.stringify({
				moduleName: this.moduleName,
				moduleConfig: JSON.stringify(config) 
			})
			axios.post('http://1.117.79.182:3001/router/updateModel', query).then(res => {
				// console.log(res)
				this.$message({
					type: res.data.type,
					message: res.data.message
				})
			})
		},

		// 获取配置
		getApiData() {
			this.collapseDisabled = true
			this.interfaceData = [
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
			]
			let list = Object.keys(this.interfaceData[0])
			this.form.column.key.select = ''
			this.form.column.key.keys = []
			this.form.screen.key.select = ''
			this.form.screen.key.keys = []
			this.form.table.tree.father.key.select = ''
			this.form.table.tree.father.key.keys = []
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
					this.form.table.tree.father.key.keys.push({
						label: i,
						value: i
					})
				})
				// this.$message({
				// 	type: 'success',
				// 	message: '成功获取字段信息, 可以编辑表格了'
				// })
				this.collapseDisabled = false
				this.screenDisabled = false
				this.activeNames = [1, 2, 3]
			}
			// return
			// axios.post('http://' + this.interfaceUrl).then(res => {
			// 	// console.log(res)
			// 	if (res.data.code === 0) {
			// 		if (res.data.data.length === 0) {
			// 			this.$message({
			// 				type: 'warning',
			// 				message: '未获取到字段数据, 请检查接口'
			// 			})
			// 		} else {
			// 			this.interfaceData = this.$deepCopy(res.data.data)
			// 			let list = Object.keys(res.data.data[0])
			// 			this.form.column.key.select = ''
			// 			this.form.column.key.keys = []
			// 			this.form.screen.key.select = ''
			// 			this.form.screen.key.keys = []
			// 			this.form.table.tree.father.key.select = ''
			// 			this.form.table.tree.father.key.keys = []
			// 			if (list.length > 0) {
			// 				list.map((i, k) => {
			// 					this.form.column.key.keys.push({
			// 						label: i,
			// 						value: i
			// 					})
			// 					this.form.screen.key.keys.push({
			// 						label: i,
			// 						value: i
			// 					})
			// 					this.form.table.tree.father.key.keys.push({
			// 						label: i,
			// 						value: i
			// 					})
			// 				})
			// 				this.$message({
			// 					type: 'success',
			// 					message: '成功获取字段信息, 可以编辑表格了'
			// 				})
			// 				this.collapseDisabled = false
			// 				this.screenDisabled = false
			// 				this.activeNames = [1, 2, 3, 4]
			// 			} else {
			// 				this.$message({
			// 					type: 'warning',
			// 					message: '数组对象没有子属性'
			// 				})
			// 			}
			// 		}
			// 	}
			// })
		},

		// 前往demo
		routeToDemo() {
			this.$router.push({ name: 'demo' })
		},

		// 头部高度
		headerHeightChange(val) {
			var hc = document.getElementsByClassName('vxe-header--column')
			hc.forEach(e => {
				e.style.height = val + 'px'
				e.style.lineHeight = val + 'px'
			})
			switch (this.tableType.select) {
				case 0:
					this.$refs.xTable1.refreshColumn()
					break
				case 1:
					this.$refs.xTable2.refreshColumn()
					break
				default:
					break
			}
		},

		// 头部字体
		headerFzChange(val) {
			var hc = document.getElementsByClassName('vxe-header--row')
			hc.forEach(e => {
				e.style.fontSize = val + 'px'
			})
		},

		// 头部背景色
		headerBgcChange(val) {
			var hc = document.getElementsByClassName(
				'vxe-table--header-wrapper'
			)
			hc.forEach(e => {
				e.style.backgroundColor = val
			})
		},

		// 头部字体颜色
		headerfcChange(val) {
			var hc = document.getElementsByClassName('vxe-header--row')
			hc.forEach(e => {
				e.style.color = val
			})
		},

		// 行高度
		rowHeightChange(val) {
			var hc = document.getElementsByClassName('vxe-body--row')
			hc.forEach(e => {
				e.style.height = val + 'px'
				e.style.lineHeight = val + 'px'
			})
			switch (this.tableType.select) {
				case 0:
					this.$refs.xTable1.refreshColumn()
					break
				case 1:
					this.$refs.xTable2.refreshColumn()
					break
				default:
					break
			}
		},

		// 行字体
		rowFzChange(val) {
			var hc = document.getElementsByClassName('vxe-body--row')
			hc.forEach(e => {
				e.style.fontSize = val + 'px'
			})
		},

		// 行背景色
		rowBgcChange(val) {
			var hc = document.getElementsByClassName('vxe-body--row')
			hc.forEach(e => {
				let list = e.getAttribute('class').split(' ')
				if (list.indexOf('row--stripe') === -1) {
					e.style.backgroundColor = val
				}
			})
		},

		// 行字体颜色
		rowfcChange(val) {
			var hc = document.getElementsByClassName('vxe-body--row')
			hc.forEach(e => {
				e.style.color = val
			})
		},

		// 斑马纹颜色
		rowStripeColorChange(val) {
			var hc = document.getElementsByClassName('vxe-body--row')
			hc.forEach(e => {
				let list = e.getAttribute('class').split(' ')
				if (list.indexOf('row--stripe') !== -1) {
					e.style.backgroundColor = val
				}
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

				ha.forEach(e => {
					// 高
					e.style.height = this.form.table.header.height + 'px'
					e.style.lineHeight = this.form.table.header.height + 'px'
				})
				hb.forEach(e => {
					// 字体
					e.style.fontSize = this.form.table.header.fz + 'px'
					e.style.color = this.form.table.header.fc
				})
				hc.forEach(e => {
					// 背景色
					e.style.backgroundColor = this.form.table.header.bgc
				})

				line.forEach(e => {
					// 行
					e.style.height = this.form.table.row.height + 'px'
					e.style.lineHeight = this.form.table.row.height + 'px'
					e.style.fontSize = this.form.table.row.fz + 'px'
					let list = e.getAttribute('class').split(' ')
					if (list.indexOf('row--stripe') === -1) {
						e.style.backgroundColor = this.form.table.row.bgc
					} else {
						e.style.backgroundColor = this.form.table.row.stripeColor
					}
				})

				switch (this.tableType.select) {
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

		// 分页功能监听
		layoutsChange() {
			let str = ['prev', 'pager', 'next']
			if (this.form.pagination.layouts.length > 0) {
				this.form.pagination.layouts.map(i => {
					if (i.value === 'sizes') {
						str.unshift(i.value)
					} else {
						str.push(i.value)
					}
				})
			}
			this.form.pagination.layout = str.join(',')
		},

		eval(data, index) {
			return eval(data)
		},

		$deepCopy(source) {
			let stringify = JSON.stringify(source)
			return JSON.parse(stringify)
		},

		// 与数组中某个对象的值进行对比, 找到相同打的则返回相同位置对象的下标
		arr_object_contrast(arr, keyName, val) {
			let same = false
			let index
			arr.forEach((i, k) => {
				if (i[keyName] === val) {
					same = true
					index = k
				}
			})

			if (same) {
				return index
			} else {
				return same
			}
		},

		pageChange() {},

		// 向接口添加一个模块
		appendModule() {
			axios.post('http://1.117.79.182:3001/router/addModel', qs.stringify({ moduleName: this.moduleName })).then(res => {
				// console.log(res)
				this.$message({
					type: res.data.type,
					message: res.data.message
				})
				this.getApiData()
			})
		}
	},
	created() {},
	watch: {
		tableColumn(val) {
			if (val.length > 0) {
				this.setTableClass()
			}
		},

		tableColumn2(val) {
			if (val.length > 0) {
				this.setTableClass()
			}
		},

		selectedColumn(val) {
			if (val !== '') {
				this.deleteColumnBtn = false
				let data = this.tableColumn2[val]
				console.log(val)
			} else {
				this.deleteColumnBtn = true
			}
		}
	}
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
		.vxe-table {
			.vxe-header--column {
				padding: 0;
				line-height: 50px;
				height: 50px;
			}
		}
		.table_header_box {
			height: 50px;
			position: relative;
			.vxe-icon--close {
				position: absolute;
				top: 5px;
				right: 5px;
			}
		}

		.first-col {
			position: relative;
			height: 20px;
		}
		.first-col:before {
			content: '';
			position: absolute;
			left: -15px;
			top: 10px;
			width: 170px;
			height: 1px;
			transform: rotate(20deg);
			background-color: #e8eaec;
		}
		.first-col .first-col-top {
			position: absolute;
			right: 4px;
			top: -10px;
		}
		.first-col .first-col-bottom {
			position: absolute;
			left: 4px;
			bottom: -10px;
		}
	}
}
</style>



