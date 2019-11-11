<template>
  <article-detail :is-edit="true" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ArticleDetail from './components/ArticleDetail.vue'

@Component({
  name: 'EditArticle',
  components: {
    ArticleDetail
  }
})
export default class EditArticle extends Vue {}
</script>
