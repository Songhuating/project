<template>
  <div id="mars3d-container" class="mars3d-container" position='absolute' z-index='1'>
    <div class="infoview">
      <table class="mars-table">
        <tr>
          <td>
            <div class="checkbox checkbox-primary checkbox-inline">
              <label for="chkSnow">
                <input id="chkSnow" class="styled" type="checkbox" v-model='chkSnow' v-on:change='onChkSnow' checked>
                下雪效果
              </label>
            </div>
          </td>
          <td>速度</td>
          <td>
            <input id="snowSpeed" type="range" min="1" max="50" step="1" value='10' v-model='snowSpeed' v-on:change='onSnowSpeed'>
          </td>
        </tr>
        <tr>
          <td>
            <div class="checkbox checkbox-primary checkbox-inline">
              <input id="chkSnowCover" class="styled" type="checkbox" v-model='chkSnowCover' v-on:change='onChkSnowCover' checked>
              <label for="chkSnowCover">
                积雪效果
              </label>
            </div>
          </td>
          <td>积雪程度</td>
          <td>
            <input id="alpha" type="range" min="0.0" max="1.0" step="0.1" value='0.6' v-model='alphaValue' v-on:change='onAlphaValue'>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Snow',
  props: {
    // 初始化配置参数
    url: {
      type: String,
      default: 'assets/config/config.json'
    }
  },
  data: function() {
    return {
      chkSnow: true,
      chkSnowCover: true,
      snowSpeed: 10,
      alphaValue: 0.6
    }
  },
  mounted() {
    this.mars3d.Resource.fetchJson({ url: this.url }).then((data) => {
      this.initMars3d(data.map3d)// 构建地图
    })
  },
  methods: {
    initMars3d(options) {
      // 合并属性参数，可覆盖config.json中的对应配置
      const mapOptions = this.mars3d.Util.merge(options, {
        scene: {
          center: {
            y: 33.591015,
            x: 119.032698,
            z: 72.51,
            heading: 343.3,
            pitch: -20.8,
            roll: 0
          },
          globe: {
            depthTestAgainstTerrain: true
          }
        }
      })
      const map = new this.mars3d.Map('mars3d-container', mapOptions)
      this.onSnowload(map)
      // this.map = map
      // window.map = map
      // Vue.prototype.map = map
      // console.log('地图创建成功', map)
      // this.$emit('onload', map)
      // this.onSnowload(map)
    },
    // 地图构造完成回调
    onSnowload(map) {
      // 以下为演示代码

      // 创建entity图层
      const graphicLayer = new this.mars3d.layer.TilesetLayer({
        url: 'http://data.marsgis.cn/3dtiles/qx-simiao/tileset.json',
        position: { alt: 81.5 },
        maximumScreenSpaceError: 1,
        maximumMemoryUsage: 2048,
        dynamicScreenSpaceError: true,
        cullWithChildrenBounds: false
      })
      map.addLayer(graphicLayer)
      // 下雪效果
      const snowEffect = new this.mars3d.effect.SnowEffect({
        speed: 10
      })
      map.addEffect(snowEffect)
      this.snowEffect = snowEffect
      // 地面积雪效果
      const snowCover = new this.mars3d.effect.SnowCoverEffect({
        maxHeight: 8000,
        alpha: this.alphaValue
      })
      map.addEffect(snowCover)
      this.snowCover = snowCover
    },
    onChkSnow: function(event) {
      if (event) {
        this.snowEffect.enabled = this.chkSnow
      }
    },
    onChkSnowCover: function(event) {
      if (event) {
        this.snowCover.enabled = this.chkSnowCover
      }
    },
    onSnowSpeed: function(event) {
      if (event) {
        if (this.snowEffect) {
          this.snowEffect.speed = Number(this.snowSpeed)
        }
      }
    },
    onAlphaValue: function(event) {
      if (event) {
        this.snowCover.alpha = Number(this.alphaValue)
      }
    }
    // 以下为演示代码
  }
}
</script>

<style scoped>

</style>
