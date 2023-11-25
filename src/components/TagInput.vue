<template>
  <div
    class="input-tag form-control d-flex gap-1"
    :class="{ 'input-tag-focus': isFocus }"
  >
    <span
      class="tag-div badge bg-primary rounded-pill align-middle"
      v-for="(tag, idx) in tagList"
      :key="idx"
    >
      {{ tag }}
      <i
        class="bi bi-x-circle close-icon"
        @click.prevent="tagList.splice(idx, 1)"
      ></i>
    </span>
    <input
      @keydown="enterTag"
      type="text"
      @focus="isFocus = true"
      @focusout="isFocus = false"
      v-model="inputValue"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

withDefaults(defineProps<{ modelValue?: String[] }>(), {
  modelValue: () => [],
});

const emits = defineEmits<{
  (e: "update:modelValue", value: String[]): void;
}>();

const tagList = ref<String[]>([]);
const isFocus = ref(false);

const inputValue = ref("");

function enterTag(e: KeyboardEvent) {
  const { key } = e;

  if (key == "Enter") {
    e.preventDefault();

    const text = inputValue.value.toString();

    if (text === "") return;

    tagList.value.push(text);
    inputValue.value = "";
  } else if (key == "Backspace") {
    const text = inputValue.value.toString();

    if (text === "" && tagList.value.length > 0) {
      tagList.value.pop();
    } else {
      return;
    }
  }
  emits("update:modelValue", tagList.value);
}
</script>

<style scoped>
input {
  width: 100%;
  border: none;
  outline: none;
}

.input-tag-focus {
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.close-icon {
  cursor: pointer;
}

.badge {
  padding: 5px;
}
</style>
