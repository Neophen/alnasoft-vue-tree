<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
        <v-row class="space-x-4">
          <v-col cols="2">
            <AddFolderBtn />
          </v-col>
          <v-col cols="1">
            <TestNestingBtn />
          </v-col>
        </v-row>
        <v-row class="">
          <v-col cols="12">
            <FoldersTree />
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import AddFolderBtn from "./components/AddFolderBtn.vue";
import TestNestingBtn from "./components/TestNestingBtn.vue";
import FoldersTree from "./components/FoldersTree.vue";

export default Vue.extend({
  name: "App",
  components: {
    AddFolderBtn,
    TestNestingBtn,
    FoldersTree
  }
});
</script>
