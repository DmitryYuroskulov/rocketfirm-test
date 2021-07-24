<template>
    <header class="Header">
        <div class="container d-flex flex-column">
            <div class="Header__inner d-flex align-items-center justify-content-between">
                <router-link to="/" class="Header__logo d-flex align-items-center">
                    <icon-logo class="Header__logo__icon" />
                    ImageStock
                </router-link>
                <div class="Header__links">
                    <div class="Header__link" to="/search" @click="toggleSearch">
                        <icon-search class="Header__link__icon" />
                        <span class="Header__link__text">Поиск</span>
                    </div>

                    <router-link class="Header__link ms-3" to="/favorites">
                        <icon-favorite class="Header__link__icon" />
                        <span class="Header__link__text">Избранное</span>
                    </router-link>

                    <router-link class="Header__link ms-3" to="/history">
                        <icon-history class="Header__link__icon" />
                        <span class="Header__link__text">История</span>
                    </router-link>
                </div>
            </div>

            <div class="Header__search" :class="{ active: isSearchActive }">
                <header-search v-model="searchQuery" />
                <header-search-history :view-type="historyViewType" />
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import Vue from 'vue'

import iLogo from '@/assets/icons/Logo.svg?inline'
import iSearch from '@/assets/icons/Search.svg?inline'
import iFavorite from '@/assets/icons/Favorite.svg?inline'
import iHistory from '@/assets/icons/History.svg?inline'

import HeaderSearch from '@/components/HeaderSearch/index.vue'
import HeaderSearchHistory from '@/components/HeaderSearchHistory/index.vue'

export default Vue.extend({
    data: () => {
        return {
            searchQuery: null,
            isSearchActive: false,
        }
    },
    computed: {
        historyViewType() {
            const pathIncludesHistory = this.$route.path.includes('history')
            if (pathIncludesHistory) return 'big'
            return 'small'
        },
    },
    components: {
        'icon-logo': iLogo,
        'icon-search': iSearch,
        'icon-favorite': iFavorite,
        'icon-history': iHistory,
        'header-search': HeaderSearch,
        'header-search-history': HeaderSearchHistory,
    },
    methods: {
        toggleSearch() {
            this.isSearchActive = !this.isSearchActive
            this.searchQuery = null
        },
    },
})
</script>

<style lang="scss" scoped src="./index.scss" />
