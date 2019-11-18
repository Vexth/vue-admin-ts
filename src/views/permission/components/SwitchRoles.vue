<template>
  <div>
    <div style="margin-bottom:15px;">
      {{ $t('permission.roles') }}： {{ roles }}
    </div>
    {{ $t('permission.switchRoles') }}：
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'SwitchRoles'
})
export default class extends Vue {
  get roles() {
    return this.$store.getters.roles
  }

  get switchRoles() {
    return this.roles[0]
  }

  set switchRoles(value) {
    this.$store.dispatch('ChangeRoles', value).then(() => this.$emit('change'))
  }
}
</script>
