<template>
  <v-treeview
    :items="folders"
    activatable
    hoverable
    @update:active="selectActive"
  >
    <template v-slot:prepend="{ open }">
      <v-icon>
        {{ open ? "mdi-folder-open" : "mdi-folder" }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "FoldersTree",
  computed: {
    folders: {
      get() {
        return this.$store.state.folders;
      },
      set(value) {
        this.$store.dispatch("updateFolders", value);
      }
    }
  },
  methods: {
    selectActive(folders: string[]) {
      this.$store.dispatch("selectFolder", folders[0] || null);
    }
  }
});
</script>
