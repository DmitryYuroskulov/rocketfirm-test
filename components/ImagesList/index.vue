<template>
    <div class="ImagesList d-flex flex-column align-items-center">
        <div class="ImagesList__view">
            <icon-view-as-list
                class="ImagesList__view__icon"
                :class="{ active: isListView }"
                @click="changeView(true)"
            />
            <icon-view-as-table
                class="ImagesList__view__icon"
                :class="{ active: !isListView }"
                @click="changeView(false)"
            />
        </div>
        <div class="ImagesList__images" :class="{ list: isListView }">
            <div
                v-masonry="masonryConatinerId"
                transition-duration="0.3s"
                item-selector=".ImageBlock"
                column-width=".grid-sizer"
                gutter=".gutter-sizer"
            >
                <div class="grid-sizer"></div>
                <div class="gutter-sizer"></div>

                <image-block v-for="(image, i) in images" :key="`${i}-${image}`" :image="image" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import iViewAsList from '@/assets/icons/ViewAsList.svg?inline'
import iViewAsTable from '@/assets/icons/ViewAsTable.svg?inline'

import ImageBlock from '@/components/ImageBlock/index.vue'

export default Vue.extend({
    components: {
        'icon-view-as-list': iViewAsList,
        'icon-view-as-table': iViewAsTable,
        'image-block': ImageBlock,
    },
    props: {
        images: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandler)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler)
    },
    data: () => {
        return {
            masonryConatinerId: 'masonry-container',
            isListView: true,
        }
    },
    watch: {
        images() {
            setTimeout(this.redrawGrid, 100)
        },
    },
    methods: {
        scrollHandler() {
            const scrollHeight = window.scrollY
            const maxHeight =
                window.document.body.scrollHeight - window.document.documentElement.clientHeight

            if (scrollHeight >= maxHeight && !this.loading) {
                this.$emit('load-more')
            }
        },
        redrawGrid() {
            // @ts-ignore
            this.$redrawVueMasonry(this.masonryConatinerId)
        },
        changeView(list_view_value: boolean) {
            this.isListView = list_view_value
            setTimeout(this.redrawGrid, 100)
        },
    },
})
</script>

<style lang="scss" scoped src="./index.scss" />
