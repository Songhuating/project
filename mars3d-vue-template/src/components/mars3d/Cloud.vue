<template>
  <div id="mars3d-container" class="mars3d-container">
<!--    <Cloud @onload='onCloudload'></Cloud>-->
  </div>
</template>
<script type="text/javascript">

export default {
  name: 'Cloud',
  props: {
    url: {
      type: String,
      default: 'assets/config/config.json'
    }
  },
  mounted() {
    this.mars3d.Resource.fetchJson({ url: this.url }).then((data) => {
      this.initMars3d(data.map3d)// 构建地图
    })
    // this.initMars3d()
  },
  methods: {
    // details: function() {
    //   return  this.site + " - 学的不仅是技术，更是梦想！";
    // }
    initMars3d(options) {
      // 创建三维地球场景
      // 合并属性参数，可覆盖config.json中的对应配置
      const mapOptions = this.mars3d.Util.merge(options, {
        scene: {
          center: {
            y: 12.845055,
            x: 112.931363,
            z: 24286797.17,
            heading: 3.4,
            pitch: -89.6,
            roll: 0
          },
          cameraController: {
            zoomFactor: 3.0,
            minimumZoomDistance: 1000,
            maximumZoomDistance: 300000000,
            constrainedAxis: false // 解除在南北极区域鼠标操作限制
          }
        }
      })
      const map = new this.mars3d.Map('mars3d-container', mapOptions)
      this.map = map
      window.map = map
      // Vue.prototype.map = map
      console.log('地图创建成功', map)
      this.$emit('onload', map)
      this.onCloudload(map)
    },
    onCloudload(map) {
      // 以下为演示代码

      // 创建entity图层
      const graphicLayer = new this.mars3d.layer.GraphicLayer()
      map.addLayer(graphicLayer)

      // 2.在layer上绑定监听事件
      graphicLayer.on(this.mars3d.EventType.click, function (event) {
        console.log('监听layer，单击了矢量对象', event)
      })
      graphicLayer.on(this.mars3d.EventType.mouseOver, function (event) {
        console.log('监听layer，鼠标移入了矢量对象', event)
      })
      graphicLayer.on(this.mars3d.EventType.mouseOut, function (event) {
        console.log('监听layer，鼠标移出了矢量对象', event)
      })

      // 可在图层上绑定popup,对所有加到这个图层的矢量数据都生效
      graphicLayer.bindPopup('我是layer上绑定的Popup', {
        anchor: [0, -10]
      })

      // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
      graphicLayer.bindContextMenu([
        {
          text: '删除对象',
          iconCls: 'fa fa-trash-o',
          callback: function (e) {
            const graphic = e.graphic
            if (graphic) {
              graphicLayer.removeGraphic(graphic)
            }
          }
        }
      ])

      // 加一些演示数据
      this.addGraphic_e00(graphicLayer)
    },
    // 以下为演示代码
    addGraphic_e00(graphicLayer) {
      const graphic = new this.mars3d.graphic.RectangleEntity({
        coordinates: this.Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0),
        style: {
          height: 6000,
          material: this.mars3d.MaterialUtil.createMaterialProperty(this.mars3d.MaterialType.RectSlide, {
            image: 'assets/img/tietu/cloud.png',
            color: this.Cesium.Color.WHITE.withAlpha(0.6),
            speed: 0.5,
            pure: true
          }),
          distanceDisplayCondition: new this.Cesium.DistanceDisplayCondition(3000000, 100000000)
        }
      })
      graphicLayer.addGraphic(graphic)
    }
  }

}
</script>

<style>
.mars3d-container {
  height: 100%;
  overflow: hidden;
}
</style>
