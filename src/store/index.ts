import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

enum MUTATIONS {
  SELECT_FOLDER = "SELECT_FOLDER",
  ADD_FOLDER = "ADD_FOLDER"
}
const mapFolders = (selectedFolderId, newFolder) => {
  let filled = false;

  const mapFolder = folder => {
    if (folder.id == selectedFolderId) {
      folder.children = [...folder.children, newFolder];
      filled = true;
    }
    if (!filled) {
      folder.children = folder.children.map(mapFolder);
    }

    return folder;
  };
  return folder => {
    if (filled) {
      return folder;
    }

    return mapFolder(folder);
  };
};

export default new Vuex.Store({
  state: {
    folders: [
      {
        id: 1,
        name: "Folder 1",
        children: [
          {
            id: 2,
            name: "Folder 2",
            children: []
          },
          {
            id: 3,
            name: "Folder 3",
            children: [
              {
                id: 4,
                name: "Folder 4",
                children: []
              }
            ]
          },
          {
            id: 5,
            name: "Folder 5",
            children: []
          }
        ]
      },
      {
        id: 6,
        name: "Folder 6",
        children: []
      },
      {
        id: 7,
        name: "Folder 7",
        children: [
          {
            id: 8,
            name: "Folder 8",
            children: []
          }
        ]
      }
    ],
    currentId: 8,
    selectedFolderId: null
  },
  mutations: {
    [MUTATIONS.SELECT_FOLDER](state, folderId) {
      state.selectedFolderId = folderId;
    },
    [MUTATIONS.ADD_FOLDER](state, name) {
      const selectedFolderId = state.selectedFolderId;
      const newId = state.currentId + 1;
      state.currentId = newId;

      const newFolder = {
        id: newId,
        name,
        children: []
      };

      if (selectedFolderId == null) {
        state.folders = [...state.folders, newFolder];
        return;
      }

      state.folders = state.folders.map(
        mapFolders(selectedFolderId, newFolder)
      );
    }
  },
  actions: {
    selectFolder(context, folder) {
      context.commit(MUTATIONS.SELECT_FOLDER, folder);
    },
    addFolder(context, name) {
      context.commit(MUTATIONS.ADD_FOLDER, name);
    }
  }
});
