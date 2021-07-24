<template>
    <div>
        <images-list :images="images" :loading="isImagesLoading" @load-more="loadImages" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ImagesList from '@/components/ImagesList/index.vue'

export default Vue.extend({
    components: { 'images-list': ImagesList },
    data: () => {
        return {
            isImagesLoading: false,
            images: [],
            page: 1,
        }
    },
    mounted() {
        this.loadImages()

        this.$nuxt.$on('clear-search', () => {
            this.page = 1
            this.images = []
            this.loadImages()
        })

        this.$nuxt.$on('new-search-query', () => {
            this.page = 1
            this.images = []
            this.searchImages(this.page, this.$store.state.searchQuery)
        })
    },
    methods: {
        async searchImages(page: number, query: string) {
            try {
                this.isImagesLoading = true

                //@ts-ignore
                const images = await this.$apiRepository.searchImages(page, query)
                this.images = this.images.concat(images)
                this.$store.commit('addSearchHistoryImages', images)
            } catch (error) {
                console.error(error)
            } finally {
                this.isImagesLoading = false
            }
        },
        async loadImages() {
            if (this.$store.state.searchQuery && this.$store.state.searchQuery !== '') {
                this.page++
                this.searchImages(this.page, this.$store.state.searchQuery)
                return
            }

            try {
                this.isImagesLoading = true

                //@ts-ignore
                const images = await this.$apiRepository.getImages(this.page)
                this.images = this.images.concat(images)

                this.page++
            } catch (error) {
                console.error(error)
            } finally {
                this.isImagesLoading = false
            }
        },
    },
})
</script>
