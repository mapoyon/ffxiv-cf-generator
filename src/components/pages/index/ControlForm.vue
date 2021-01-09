<template>
  <div class="lg:pr-8">
    <label
      class="inline-block border-blue-400 bg-gray-400 py-2 px-8 cursor-pointer"
      for="select-image"
    >
      画像を選ぶ
    </label>
    <input
      id="select-image"
      type="file"
      class="hidden"
      accept="image/png, image/jpeg"
      @change="changeImage"
    >
    <label class="block mt-4">1行目のテキストを入力</label>
    <input
      id="input-primary"
      type="text"
      placeholder="例) コンテンツ開放"
      class="border mt-2 w-full lg:max-w-full lg:w-64 p-1 border-gray-400 focus:border-gray-600 outline-none"
      :value="primary"
      @keyup="changePrimary"
      @change="changePrimary"
    >
    <label class="block mt-4">2行目のテキストを入力</label>
    <input
      id="input-secondary"
      type="text"
      placeholder="例) サスタシャ侵食洞"
      class="border mt-2 w-full lg:max-w-full lg:w-64 p-1 border-gray-400 focus:border-gray-600 outline-none"
      :value="secondary"
      @keyup="changeSecondary"
      @change="changeSecondary"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { titleStore, backgroundImageStore } from '~/store'

export default Vue.extend({
  computed: {
    primary: (): string => {
      return titleStore.primary
    },
    secondary: (): string => {
      return titleStore.secondary
    }
  },
  methods: {
    changePrimary (e: InputEvent) {
      if (!(e.target instanceof HTMLInputElement)) {
        return
      }

      const text = e?.target?.value
      if (text != null) {
        titleStore.updatePrimary(text)
      }
    },
    changeSecondary (e: InputEvent) {
      if (!(e.target instanceof HTMLInputElement)) {
        return
      }

      const text = e?.target?.value
      if (text != null) {
        titleStore.updateSecondary(text)
      }
    },
    changeImage: (e: InputEvent) => {
      if (!(e.target instanceof HTMLInputElement)) {
        return
      }

      const file = e?.target?.files?.item(0)
      if (file == null) {
        return
      }

      backgroundImageStore.updateImage(file)
    }
  }
})
</script>
