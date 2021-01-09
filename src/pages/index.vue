<template>
  <div class="grid grid-cols-1 lg:grid-cols-4">
    <div class="col-span-1">
      <ControlForm />
    </div>
    <div class="col-span-3">
      <Renderer />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ControlForm from '~/components/pages/index/ControlForm.vue'
import Renderer from '~/components/pages/index/Renderer.vue'

export default Vue.extend({
  components: {
    ControlForm,
    Renderer
  }
})
</script>
