<template>
    <div class="DefaultLayout">
        <Header />
        <div class="container page">
            <Nuxt />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Header from '~/components/Header/index.vue'

export default Vue.extend({
    components: {
        Header,
    },
})
</script>
