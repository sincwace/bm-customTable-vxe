<template>
    <div class="demo-main">
        <CunstomTableVxe :requestConfigUrl="'http://172.16.1.92:8082/test/getData'"
                         :requestDataUrl="'http://172.16.1.92:8082/test/getApiData'"></CunstomTableVxe>
    </div>
</template>

<script>
import CunstomTableVxe from 'components/customTable-vxe'

export default {
    name: 'customTable-demo',
    components: { CunstomTableVxe },
    data() {
        return {
        }
    },
    methods: {
        getTableConfig() {
            // this is ajax
            this
        }
    }
}
</script>

<style lang="less">
.demo-main {
    padding: 40px;
}
</style>


