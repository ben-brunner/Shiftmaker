export default function (paramsMur = {}, action) {
    if (action.type == "addParams") {

        console.log(action.settings);
      return action.settings;
    } else {
  
      return paramsMur
  
    }
  }