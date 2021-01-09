<template>
  <div class="container max-w-full mx-auto mt-8 lg:mt-0">
    <button
      class="inline-block border-blue-400 bg-gray-400 py-2 px-8"
      @click="download"
    >
      ダウンロードする
    </button>
    <a ref="download" target="_blank" class="hidden" />
    <canvas ref="renderer" class="w-full mx-auto my-4 bg-black" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Application } from "@pixi/app";
import { Point } from "@pixi/math";
import { Text, TextStyle } from "@pixi/text";
import { Sprite } from "@pixi/sprite";
import { Renderer, BatchPluginFactory, Texture, BaseTexture } from "@pixi/core";
import { BlurFilter } from "@pixi/filter-blur";
import { titleStore, backgroundImageStore } from "~/store";
import WebFont from "webfontloader";

type RendererData = {
  app: Application | null;
  background: Sprite | null;
  primaryText: Text | null;
  secondaryText: Text | null;
};

const DEFAULT_FONT_SIZE = 77.0;
const DEFAULT_WIDTH = 1920.0;
const DEFAULT_HEIGHT = 1080.0;
const FONT_SIZE_RATIO = DEFAULT_FONT_SIZE / DEFAULT_HEIGHT;
const TEXT_BLUR = new BlurFilter(0.1);
const TEXT_ANCHOR = new Point(0.5, 0.5);

const textStyle = new TextStyle({
  fontFamily: "Noto Serif JP",
  fontSize: DEFAULT_FONT_SIZE,
  fontStyle: "normal",
  fontWeight: "600",
  fill: ["#ffffff"],
  stroke: "#cb8a00",
  strokeThickness: 2,
  dropShadow: true,
  dropShadowColor: "#cb8a00",
  dropShadowBlur: 6,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 0,
  lineJoin: "round",
  letterSpacing: -9,
});

export default Vue.extend({
  data: (): RendererData => {
    return {
      app: null,
      background: null,
      primaryText: null,
      secondaryText: null,
    };
  },
  computed: {
    primary() {
      return titleStore.primary;
    },
    secondary() {
      return titleStore.secondary;
    },
    image() {
      return backgroundImageStore.image;
    },
    width() {
      if (backgroundImageStore.width > 0) {
        return backgroundImageStore.width;
      } else {
        return 1920;
      }
    },
    height() {
      if (backgroundImageStore.height > 0) {
        return backgroundImageStore.height;
      } else {
        return 1080;
      }
    },
    fileName() {
      return "ffxiv-cfgen_" + new Date().getTime() + ".png";
    },
  },
  watch: {
    primary() {
      this.updateSecondaryText(this.primary);
      this.render();
      this.refreshOnFontLoaded();
    },
    secondary() {
      this.updateSecondaryText(this.secondary);
      this.render();
      this.refreshOnFontLoaded();
    },
    image() {
      if (this.background == null) {
        return;
      }
      if (this.image == null) {
        return;
      }
      if (this.app == null) {
        return;
      }

      const baseTexture = new BaseTexture(this.image);
      const texture = new Texture(baseTexture);
      this.background.texture = texture;
      this.app.renderer.resize(this.width, this.height);
      this.refresh();
    },
  },
  mounted() {
    const rendererView = this.$refs.renderer;
    if (!(rendererView instanceof HTMLCanvasElement)) {
      return;
    }

    WebFont.load({
      google: {
        families: ["Noto+Serif+JP:wght@700"],
      },
    });

    const batchPlugin = BatchPluginFactory.create();
    Renderer.registerPlugin("batch", batchPlugin);

    const app = new Application({
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      view: rendererView,
      antialias: false,
      transparent: true,
      backgroundColor: 0x000000,
      preserveDrawingBuffer: true,
    });

    const background = new Sprite();
    app.stage.addChild(background);

    const primaryText = new Text("", textStyle);
    primaryText.filters = [TEXT_BLUR];
    primaryText.anchor = TEXT_ANCHOR;
    app.stage.addChild(primaryText);

    const secondaryText = new Text("", textStyle);
    secondaryText.filters = [TEXT_BLUR];
    secondaryText.anchor = TEXT_ANCHOR;
    app.stage.addChild(secondaryText);

    this.app = app;
    this.background = background;
    this.primaryText = primaryText;
    this.secondaryText = secondaryText;
    this.render();
  },
  methods: {
    getFontSize() {
      return FONT_SIZE_RATIO * this.height;
    },
    getLetterSpacing() {
      return Math.ceil(this.width * -0.0025);
    },
    getTextX() {
      return this.width / 2.03;
    },
    getPrimaryY() {
      return this.height * 0.3;
    },
    getSecondaryY() {
      return this.getPrimaryY() + this.getFontSize() * 1.1;
    },
    isBlank() {
      return this.primary.length < 1 && this.secondary.length < 1;
    },
    download() {
      if (this.isBlank()) {
        alert("テキストを入力してください");
        return;
      }

      const rendererView = this.$refs.renderer;
      if (!(rendererView instanceof HTMLCanvasElement)) {
        return;
      }

      const downloadLink = this.$refs.download;
      if (!(downloadLink instanceof HTMLAnchorElement)) {
        return;
      }

      downloadLink.setAttribute("disabled", "disabled");
      downloadLink.setAttribute("download", this.fileName);
      downloadLink.href = rendererView.toDataURL("image/png");
      downloadLink.click();
      downloadLink.removeAttribute("disabled");
    },
    updatePrimaryText(text: string) {
      if (this.primaryText == null) {
        return;
      }
      if (!(this.primaryText.style instanceof TextStyle)) {
        return;
      }

      this.primaryText.style.fontSize = this.getFontSize();
      this.primaryText.style.letterSpacing = this.getLetterSpacing();
      this.primaryText.x = this.getTextX();
      this.primaryText.y = this.getPrimaryY();
      this.primaryText.text = text;
    },
    updateSecondaryText(text: string) {
      if (this.secondaryText == null) {
        return;
      }
      if (!(this.secondaryText.style instanceof TextStyle)) {
        return;
      }

      this.secondaryText.style.fontSize = this.getFontSize();
      this.secondaryText.style.letterSpacing = this.getLetterSpacing();
      this.secondaryText.x = this.getTextX();
      this.secondaryText.y = this.getSecondaryY();
      this.secondaryText.text = text;
    },
    refreshOnFontLoaded() {
      if (!(document?.fonts?.ready instanceof Promise)) {
        return;
      }

      document.fonts.ready.then(() => {
        this.refresh();
      });
    },
    refresh() {
      this.updatePrimaryText("");
      this.updateSecondaryText("");
      this.render();
      this.updatePrimaryText(this.primary);
      this.updateSecondaryText(this.secondary);
      this.render();
    },
    render() {
      this.app?.render();
    },
  },
});
</script>
