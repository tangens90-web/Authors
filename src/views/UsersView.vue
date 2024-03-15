<template>
  <div class="container">
    <SearchField></SearchField>
    <Posts></Posts>
  </div>
</template>

<script setup>
import SearchField from "@/components/SearchField.vue";
import Posts from "@/components/Posts.vue";
</script>

<style lang="scss" scoped>
input {
  height: 30px;
}
.search_button {
  width: 20px;
  height: 20px;
}
</style>
