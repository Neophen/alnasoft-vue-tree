<template>
  <v-dialog v-model="isDialogOpen" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" rounded v-bind="attrs" v-on="on">
        <v-icon left>
          mdi-folder-plus
        </v-icon>
        Add folder
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add folder</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              label="Folder name*"
              v-model="newFolderName"
              hint="The folder will be added to the currently selected folder, if none it will be added to the root"
              persistent-hint
              required
            ></v-text-field>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn rounded elevation="0" @click="isDialogOpen = false">
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          rounded
          elevation="0"
          :disabled="!newFolderName"
          @click="addFolder"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddFolder",
  data() {
    return {
      isDialogOpen: false,
      newFolderName: ""
    };
  },
  methods: {
    addFolder() {
      this.$store.dispatch("addFolder", this.newFolderName);
      this.isDialogOpen = false;
      this.newFolderName = "";
    }
  }
};
</script>
