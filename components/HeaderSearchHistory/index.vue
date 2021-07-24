<template>
    <div
        class="HeaderSearchHistory d-flex flex-column align-items-center justify-content-center"
        :class="{ small: isSmall }"
    >
        <span v-if="!isSmall" class="HeaderSearchHistory__title"> Ваши запросы </span>

        <div
            class="HeaderSearchHistory__words d-flex"
            :class="{ 'flex-wrap align-items-center justify-content-center': !isSmall }"
        >
            <span
                v-for="(query, i) in searchHistory"
                :key="`${i}-${query}`"
                @click="changeSearchQuery(query)"
            >
                {{ query }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
    props: {
        viewType: {
            type: String,
            default: 'big',
        },
    },
    computed: {
        isSmall() {
            return this.viewType === 'small'
        },
        ...mapGetters(['searchHistory']),
    },
    methods: {
        changeSearchQuery(query: string) {
            this.$store.commit('updateSearchQuery', query)
            this.$nuxt.$emit('new-search-query')
        },
    },
})
</script>

<style lang="scss" scoped src="./index.scss" />
