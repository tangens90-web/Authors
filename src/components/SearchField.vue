<template>
  <div class="search_class">
    <div class="class">
      <div class="search_field_class">
        <input
          class="search_field"
          type="text"
          placeholder="Search by author"
          v-model="authorField"
        />
      </div>
      <div class="img_class" @click="filterAuthors(authorField)">
        <img class="search_button" src="@/assets/search.svg" alt="" />
      </div>
    </div>
    <div v-if="error" class="error">Введите поисковой запрос</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const sendToFilteredPosts = () => {
  if (route.name == "users") {
    router.go(0);
  } else {
    router.push("/users");
  }
};

const authorField = ref("");
if (route.name == "home") {
  authorField.value = "";
} else {
  let input = JSON.parse(localStorage.getItem("input") || "");
  authorField.value = input;
}
const error = ref(false);
const filterAuthors = (input) => {
  if (input.length > 0) {
    error.value = false;
    localStorage.setItem("input", JSON.stringify(input));

    sendToFilteredPosts();
  } else {
    error.value = true;
  }
};
</script>

<style lang="scss" scoped>
.search_class {
  width: 100%;

  margin: 25px auto;
}

.class {
  width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.search_field {
  display: block;
  width: 200px;
  margin: 0 auto;
}
.img_class {
  display: flex;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 5px;
  background-color: white;
}
img {
  display: block;
  margin: auto;
}
input {
  height: 30px;
}
.search_button {
  width: 20px;
  height: 20px;
}
.error {
  width: 200px;
  margin: 0 auto;
  color: red;
}
</style>
