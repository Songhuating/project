<template>
  <div id='mars3d-odline' class='mars3d-container'></div>
</template>

<script>
export default {
  name: 'odline',
  props: {
    url: {
      type: String,
      default: 'assets/config/config.json'
    }
  },
  mounted() {
    this.mars3d.Resource.fetchJson({ url: this.url }).then((data) => {
      this.initMars3d(data.map3d) // 构建地图
    })
  },
  methods: {
    initMars3d(options) {
      const mapOptions = this.mars3d.Util.merge(options, {
        scene: {
          center: { lat: 39.467774, lng: 116.410254, alt: 51270, heading: 360, pitch: -46 },
        }
      })
      const map = new this.mars3d.Map('mars3d-odline', mapOptions)
      map.basemap = '黑色底图'
      this.onOdlineload(map)
    },
    onOdlineload(map) {
      // 创建Graphic图层
      var graphicLayer = new this.mars3d.layer.GraphicLayer()
      map.addLayer(graphicLayer)

      this.Cesium.Resource.fetchJson('http://data.marsgis.cn/file/apidemo/bjgj.json').then(function (data) {
        const timeDuration = 10.0
        const moveBaseDuration = 4.0

        const hStep = 300 / (data.length - 1)

        // var busLines = [].concat.apply([], data.map(function (busLine, idx) {
        const busLines = []
        data.map(function (busLine, idx) {
          let prevPt
          const points = []
          for (let i = 0; i < busLine.length; i += 2) {
            let pt = [busLine[i], busLine[i + 1]]
            if (i > 0) {
              pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]]
            }
            prevPt = pt

            const longitude = pt[0] / 1e4
            const latitude = pt[1] / 1e4
            const cart = this.Cesium.Cartesian3.fromDegrees(longitude, latitude, 100.0)
            points.push(cart)
          }
          console.log(points)

          busLines.push({
            positions: points
          })
        })

        busLines.forEach(function (busLine) {
          const primitive = new this.mars3d.graphic.PolylinePrimitive({
            positions: busLine.positions,
            style: {
              width: 2.0,
              material: this.mars3d.MaterialUtil.createMaterial(this.mars3d.MaterialType.ODLine, {
                color: new this.Cesium.Color(Math.random() * 0.5 + 0.5, Math.random() * 0.8 + 0.2, 0.0, 1.0),
                speed: 2 + 1.0 * Math.random(),
                startTime: Math.random()
              })
            }
          })
          graphicLayer.addGraphic(primitive)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
