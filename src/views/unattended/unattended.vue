<template>
  <!-- 无人值守 -->
  <div class="unattended" id="container" />  
</template>
<script>
import* as Three from 'three'
export default {
  data() {
    return {
      //相机
      camera: null,
      //场景
      scene: null,
      //渲染器
      renderer: null,
      //物体对象
      mesh: null   
    };
  },
  mounted() {
      this.init();
      this.animate();
  },
  methods: {
    //   画图
    init(){
        var container = document.getElementById('container');
        // 创建场景
        this.scene = new Three.Scene();
        // 创建相机
        this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);
        this.camera.position.z = 0.6;
        
        var geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
        var material = new Three.MeshNormalMaterial();
        // 创建物体对象
        this.mesh = new Three.Mesh(geometry, material);
        this.scene.add(this.mesh);
        // 创建渲染器
        this.renderer = new Three.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);
    },
    animate(){
        requestAnimationFrame(this.animate);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/unattended/unattended.css";
</style>
