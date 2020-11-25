import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

enum MUTATIONS {
  SELECT_FOLDER = "SELECT_FOLDER",
  ADD_FOLDER = "ADD_FOLDER",
  UPDATE_FOLDERS = "UPDATE_FOLDERS"
}

type Folder = {
  id: number;
  name: string;
  children: Array<Folder>;
};

const mapFolders = (selectedFolderId: number, newFolder: Folder) => {
  let filled = false;

  const mapFolder = (folder: Folder) => {
    if (folder.id === selectedFolderId) {
      folder.children = [...folder.children, newFolder];
      filled = true;
    }
    if (!filled) {
      folder.children = folder.children.map(mapFolder);
    }

    return folder;
  };

  return (folder: Folder) => {
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
    [MUTATIONS.UPDATE_FOLDERS](state, folders) {
      state.folders = folders;
    },
    [MUTATIONS.SELECT_FOLDER](state, folderId) {
      if (state.selectedFolderId === folderId) {
        state.selectedFolderId = null;
        return;
      }

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

      if (!selectedFolderId) {
        state.folders = [...state.folders, newFolder];
        return;
      }

      state.folders = state.folders.map(
        mapFolders(selectedFolderId, newFolder)
      );
    }
  },
  actions: {
    updateFolders(context, folders) {
      context.commit(MUTATIONS.UPDATE_FOLDERS, folders);
    },
    selectFolder(context, folderId) {
      context.commit(MUTATIONS.SELECT_FOLDER, folderId);
    },
    addFolder(context, name) {
      context.commit(MUTATIONS.ADD_FOLDER, name);
    }
  }
});
