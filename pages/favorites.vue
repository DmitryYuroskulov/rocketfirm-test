<template>
    <div class="Favorites">
        <h1 class="Favorites__title">Избранное</h1>

        <template v-if="favorites && favorites.length">
            <images-list :images="favorites" :loading="false" />
        </template>

        <template v-else> Favorites empty </template>

        <h2 class="Favorites__title">Ранее вы искали</h2>

        <images-list :images="searchHistoryImages" class="mt-4" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

import ImagesList from '@/components/ImagesList/index.vue'

export default Vue.extend({
    components: { 'images-list': ImagesList },
    computed: {
        ...mapGetters(['favorites', 'searchHistoryImages']),
    },
    data: () => {
        return {
            images: [],
        }
    },
})
</script>

<style lang="scss" scoped>
.Favorites {
    text-align: center;

    &__title {
        font-size: 72px;
        margin-top: 110px;
    }

    & .ImagesList {
        margin-top: 71px;
    }
}

@media screen and (max-width: 767px) {
    .Favorites__title {
        margin-top: 20px;
        font-size: 36px;
    }

    .Favorites .ImagesList {
        margin-top: 40px;
    }
}
</style>
