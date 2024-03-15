<template>
  <div>
    <div class="posts_container" v-if="postsWithAuthors.length > 0">
      <article
        class="post_article"
        v-for="post in postsWithAuthors"
        :key="post.id"
      >
        <div class="post_info">
          <div class="post_title">{{ upperCaseFirst(post.title) }}</div>
          <div class="post_body">{{ upperCaseFirst(post.body) }}</div>
          <div class="post_author">{{ post.authorName }}</div>
        </div>
      </article>
    </div>
    <div class="posts_container" v-else>
      Не найдены посты с данной фамилией или именен
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
// import { usePostsStore } from "@/stores/posts";

import { onMounted, computed, ref } from "vue";
import { usePostsStore } from "@/stores/posts";
let input = JSON.parse(localStorage.getItem("input") || "");

const inputField = ref("");

inputField.value = input;

const postsStore = usePostsStore();

const route = useRoute();
const upperCaseFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
function findAuthors(input, author) {
  let regex = "^";
  input = input.toLowerCase();
  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    regex += `(?=[^${char}])?${char}`;
  }
  regex += ".*$";
  regex = new RegExp(regex);
  author = author.toLowerCase().split(" ");

  return regex.test(author[0]) || regex.test(author[1]);
}
const postsWithAuthors = computed(() => {
  return inputField.value == "" || route.name == "home"
    ? postsStore.postsWithAuthors
    : postsStore.postsWithAuthors.filter((item) => {
        return findAuthors(inputField.value, item.authorName);
      });
});

onMounted(() => {
  postsStore.getPosts();
  postsStore.getUsers();
});
</script>

<style lang="scss" scoped>
.posts_container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  gap: 20px;
  @media (max-width: 969px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 669px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.post_article {
  width: 80%;
  max-width: 500px;
  height: auto;
  display: flex;
  margin: 0 auto;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
}

.post_info {
  display: flex;
  flex-direction: column;
  margin: 0px 15px;
}
.post_title {
  color: rgb(137, 137, 246);
  font-size: 20px;
}
.post_body {
  font-size: 18px;
}
.post_author {
  color: gray;
  font-size: 12px;
  margin-top: auto;
}
</style>
