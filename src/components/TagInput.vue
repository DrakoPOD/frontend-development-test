<template>
  <div
    class="input-tag form-control d-flex flex-row gap-1 flex-wrap align-center p-0"
    :class="{ 'input-tag-focus': isFocus }"
  >
    <span
      class="tag-div badge bg-primary rounded-pill align-middle"
      v-for="(tag, idx) in tagList"
      :key="idx"
      data-test="tag"
    >
      {{ tag }}
      <i
        class="bi bi-x-circle close-icon"
        @click.prevent="
          {
            tagList.splice(idx, 1);
            emits('update:modelValue', tagList);
          }
        "
      ></i>
    </span>
    <input
      v-bind="$attrs"
      class="flex-grow-1 p-1"
      @keydown="enterTag"
      type="text"
      @focus="isFocus = true"
      @focusout="isFocus = false"
      v-model="inputValue"
    />
    {{ inputValue }}
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{ modelValue?: String[] }>(), {
  modelValue: () => [],
});

const emits = defineEmits<{
  (e: "update:modelValue", value: String[]): void;
}>();

const tagList = ref<String[]>([...props.modelValue]);
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
  border: none;
  outline: none;
  min-width: 10px;
  flex-basis: 50px;
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
  margin: 2px;
  height: 24.25px;
}
</style>
