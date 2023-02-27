export const validateEmail = (email) => {
    const regextSt =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regextSt.test(email);
  };
  
  export const validateCreateProject = (project, images) => {

    let details = project.details;
  
    const checks = [
      {
        msg: "Name, Description, Brand added successfully.",
        type: "success",
      },
    ];
    
  };
  /*
  if (images.length < 3) {
      checks.push({
        msg: `Choose atleast 3 images (${3 - images.length} remaining).`,
        type: "error",
      });
    } else {
      checks.push({
        msg: `${images.length} images choosen.`,
        type: "success",
      });
    }



    for (var i = 0; i < details.length; i++) {
      if (details[i].name == "" || details[i].value == "") {
        checks.push({
          msg: `Please fill all informations on details.`,
          type: "error",
        });
        break;
      } else {
        checks.push({
          msg: `Atleast one detail added.`,
          type: "success",
        });
      }
    }
  */