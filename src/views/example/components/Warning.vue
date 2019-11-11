<template>
  <aside>
    {{ $t('example.warning') }}
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Warning'
})
export default class Warning extends Vue {}
</script>
