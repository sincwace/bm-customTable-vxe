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
				  ref="customTable"
				  highlight-current-column
				  :scroll-x="{enabled: false}"
				  show-overflow
				  show-header-overflow>
		</vxe-grid>
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
		getTableConfig() {
            // ajax
            axios.post('http://172.16.1.92:8082/test/getData').then(res => {
                console.log(res)
                this.tableConfig = res.data.data.data.table
                this.screenList = res.data.data.data.screen
                this.tableColumn = res.data.data.data.column
            })
            // this.screenList = []
            // this.tableColumn = []
		},

        request() {
            let data = {}
            if (this.screenList.length > 0) {
                this.screenList.map(i => {
                    data[i.field] = i.fieldName
                })
            }
            axios.post(this.requestUrl, data).then(res => {
                // console.log(res)
                this.tableData = res.data.data
            })
        },

        search() {
            this.request()
        }
	},
	created() {
        this.getTableConfig()
		this.request()
	}
}
</script>

