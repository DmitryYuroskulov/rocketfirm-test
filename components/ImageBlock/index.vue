<template>
    <div class="ImageBlock" v-masonry-tile>
        <div class="ImageBlock__content shadow" />

        <div
            class="ImageBlock__content d-flex flex-column justify-content-center align-items-center"
        >
            <div class="ImageBlock__author d-flex flex-column align-items-center">
                <img :src="image.user.profile_image.medium" class="author__avatar" />

                <span class="author__name">{{ image.user.name }}</span>
                <span class="author__username">@{{ image.user.username }}</span>
            </div>

            <div class="ImageBlock__actions">
                <icon-favorite
                    class="ImageBlock__actions__icon"
                    :class="{ 'in-favorites': inFavorites }"
                    @click="addToFavorites"
                />

                <icon-maximaze class="ImageBlock__actions__icon" @click="scale" />

                <a :href="image.links.download" target="_blank" class="ImageBlock__actions__icon">
                    <icon-download />
                </a>
            </div>
        </div>

        <img class="ImageBlock__img" :src="image.urls.regular" :alt="image.alt_description" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import iFavorite from '@/assets/icons/Favorite.svg?inline'
import iMaximaze from '@/assets/icons/Maximaze.svg?inline'
import iDownload from '@/assets/icons/Download.svg?inline'

export default Vue.extend({
    components: {
        'icon-favorite': iFavorite,
        'icon-maximaze': iMaximaze,
        'icon-download': iDownload,
    },
    props: {
        image: {
            type: Object,
            default: null,
        },
    },
    data: () => {
        return {
            inFavorites: false,
        }
    },
    mounted() {
        this.checkImageInFavorites(this.image.id)
    },
    methods: {
        async checkImageInFavorites(image_id: string) {
            this.inFavorites = await this.$store.dispatch('isInFavorites', image_id)
        },
        async addToFavorites() {
            if (this.inFavorites) {
                await this.$store.dispatch('removeFromFavorites', this.image.id)
                this.inFavorites = false
                return
            }

            await this.$store.dispatch('addToFavorites', this.image)
            this.inFavorites = true
        },
        scale() {
            console.log('scale')
        },
    },
})
</script>

<style lang="scss" src="./index.scss" />
