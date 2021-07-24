<template>
    <div class="HeaderSearch">
        <input type="text" placeholder="Поиск" v-model="search_query" @change="addSearchQuery" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    computed: {
        search_query: {
            get() {
                return this.$store.state.searchQuery
            },
            set(value) {
                this.$store.commit('updateSearchQuery', value)
            },
        },
    },
    methods: {
        addSearchQuery(event: InputEvent) {
            const input: HTMLInputElement = event.target as HTMLInputElement
            const query = input.value

            if (!query || query === '') {
                this.$nuxt.$emit('clear-search')
                return
            }

            this.$store.commit('addSearchQuery', query)
            this.$nuxt.$emit('new-search-query')
        },
    },
})
</script>

<style lang="scss" scoped src="./index.scss" />
