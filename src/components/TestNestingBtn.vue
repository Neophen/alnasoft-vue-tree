<template>
  <v-btn rounded color="primary" elevation="0" @click="testNestingFolder">
    Test nesting
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "TestNestingBtn",
  computed: mapState(["currentId"]),
  methods: {
    testNestingFolder() {
      for (let i = 0; i < 500; i++) {
        this.$store.dispatch("selectFolder", this.currentId);
        this.$store.dispatch("addFolder", `Folder ${this.currentId + 1}`);
      }
    }
  }
});
</script>
