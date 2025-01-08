import { ref } from "vue";
import { defineStore } from "pinia";

export const useFeedbackStore = defineStore("feedbackStore", () => {
  const loading = ref<boolean>(false);

  return {
    loading,
  };
});
