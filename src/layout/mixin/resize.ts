import { Component, Vue, Watch } from 'vue-property-decorator'
import { DeviceType } from "@/store/type";

const WIDTH = 992 // refer to Bootstrap's responsive design

@Component({
  name: 'ResizeMixin'
})
export default class ResizeMixin extends Vue {
  get device() {
    return this.$store.getters.device
  }

  get sidebar() {
    return this.$store.getters.sidebar
  }

  @Watch('$route')
  private onRouteChange() {
    if (this.device === DeviceType.Mobile && this.sidebar.opened) {
      this.$store.dispatch('CloseSideBar', false)
    }
  }

  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }

  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      this.$store.dispatch('ToggleDevice', DeviceType.Mobile)
      this.$store.dispatch('CloseSideBar', true)
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      this.$store.dispatch('ToggleDevice', isMobile ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile) {
        this.$store.dispatch('CloseSideBar', true)
      }
    }
  }
}
