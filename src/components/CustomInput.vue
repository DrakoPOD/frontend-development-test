<template>
  <div class="mb-1">
    <label :for="ID">{{ label }}</label>
    <input
      v-model="value"
      type="text"
      :id="ID"
      class="form-control"
      :class="{ 'is-invalid': !isValid }"
      :aria-describedby="ID_HELP"
      :required="required"
      @focusout="validate"
      @keypress="isValid = true"
    />
    <div
      :id="ID_HELP"
      class="form-text"
      :class="{ 'invalid-feedback d-block': !isValid }"
    >
      {{ isValid ? textHelp : inputMsg }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance } from "vue";
import type { IValidationRuleFunction } from "@/types/funcTypes";

interface Props {
  modelValue?: string | number;
  label?: string;
  textHelp?: string;
  rules?: IValidationRuleFunction<any>[];
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  textHelp: "",
  rules: () => [],
  required: false,
});

const emits = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const ID = "input-component-" + getCurrentInstance()?.uid;
const ID_HELP = "input-help-" + getCurrentInstance()?.uid;

const value = computed({
  set: (val: any) => {
    emits("update:modelValue", val);
  },
  get: () => props.modelValue,
});

const isValid = ref(true);
const inputMsg = ref("");

function validate() {
  const rules = props.rules;
  if (rules.length > 0) {
    const rule = rules.find((f) => f(props.modelValue) != true);
    if (rule) {
      inputMsg.value = rule(props.modelValue) as string;
      isValid.value = false;
    } else {
      isValid.value = true;
    }
    return;
  }
  isValid.value = true;
}
</script>

<style scoped>
.form-text:empty::before {
  content: "\A0";
}
</style>
