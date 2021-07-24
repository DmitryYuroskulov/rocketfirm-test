<template>
    <div class="History">
        <template v-if="searchHistoryImages.length">
            <images-list :images="searchHistoryImages" />
        </template>

        <template v-else> History empty :( </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

import ImagesList from '@/components/ImagesList/index.vue'

export default Vue.extend({
    components: { 'images-list': ImagesList },
    computed: {
        ...mapGetters(['searchHistoryImages']),
    },
})
</script>

<style lang="scss" scoped></style>
