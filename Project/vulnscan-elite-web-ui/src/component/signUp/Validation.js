export default function ValidationInfo(values, confpass) {
  const errors = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  const password_pattern = /^[A-Za-z0-9]\w{7,14}$/;
  if (values.FirstName === "") {
    errors.firstname = " FirstName is Required";
  }
  if (values.LastName === "") {
    errors.lastname = "Last Name is Required";
  }
  if (values.Email === "") {
    errors.email = "Email is Requied";
  } else if (!email_pattern.test(values.Email)) {
    errors.email = "Email did'nt match";
  }

  if (values.Password === "") {
    errors.password = "Password is Requied";
  } else if (!password_pattern.test(values.Password)) {
    errors.password =
      "Password Must have at least one letter and eight character ";
  }
  if (confpass === "") {
    errors.confpassword = "Confirm password please";
  } else if (!(values.Password === confpass)) {
    errors.confpassword = "password not correct";
  }
  return errors;
}
