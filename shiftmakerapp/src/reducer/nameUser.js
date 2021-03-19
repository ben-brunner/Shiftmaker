export default function (nameUser = null, action) {
    if (action.type === "saveName") {
      return action.name;
    } else {
      return nameUser
    }
}