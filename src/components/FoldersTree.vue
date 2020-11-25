<template>
  <VuetifyDraggableTreeview
    v-model="folders"
    group="folders"
    activatable
    hoverable
  >
    <template v-slot:label="{ item }">
      <button
        type="button"
        :class="isSelected(item) ? 'font-weight-black' : 'font-weight-regular'"
        @click="selectActive(item)"
      >
        {{ item.name }}
      </button>
    </template>
  </VuetifyDraggableTreeview>
</template>

<script>
import VuetifyDraggableTreeview from "vuetify-draggable-treeview";

export default {
  name: "FoldersTree",
  components: {
    VuetifyDraggableTreeview
  },
  computed: {
    folders: {
      get() {
        return this.$store.state.folders;
      },
      set(value) {
        this.$store.dispatch("updateFolders", value);
      }
    },
    isSelected() {
      return folder => {
        return this.$store.state.selectedFolderId === folder.id;
      };
    }
  },
  methods: {
    selectActive(folder) {
      this.$store.dispatch("selectFolder", folder.id);
    }
  }
};
</script>
