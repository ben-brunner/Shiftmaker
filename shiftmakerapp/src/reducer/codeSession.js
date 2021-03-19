export default function (codeSession = "", action) {
    if (action.type == "saveCode") {
      return action.code;
    } else {
        return codeSession
      }
      
  }