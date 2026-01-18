export const AVATARS = {
  avatar1: {
    label: "Casual Avatar",
    url: "/models/avatar.glb",
    scale: 1,
    rotation: [0, 0, 0],
    animations: {
      idle: ["idle", "Idle", "mixamo"],
      walk: ["walk", "Walk"],
      run: ["run", "Run"]
    }
  },

  avatar2: {
    label: "Soldier Avatar",
    url: "/models/soldier.glb",
    scale: 1,
    rotation: [0, Math.PI, 0],
    animations: {
      idle: ["idle"],
      walk: ["walk"],
      run: ["run"]
    }
  },

  avatar3: {
    label: "NPC Avatar",
    url: "/models/avatarold.glb",
    scale: 1,
    rotation: [0, 0, 0],
    animations: {
      idle: ["idle"],
      walk: ["walk"],
      run: []
    }
  }
}
