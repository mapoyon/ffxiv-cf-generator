<template>
  <div
    class="font-sans text-gray-700 min-h-screen grid"
    style="grid-template-rows: auto 1fr auto"
  >
    <Header />
    <div class="w-100 py-4 px-8 text-4xl lg:text-base">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "~/components/layouts/Header.vue";
import Footer from "~/components/layouts/Footer.vue";

export default Vue.extend({
  components: {
    Header,
    Footer,
  },
});
</script>
