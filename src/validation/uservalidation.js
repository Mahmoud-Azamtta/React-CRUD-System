export const validateUserData = (values) => {
  let errors = {};
  const namePattern = /^(?=.*[a-z])[a-z0-9]{5,25}$/;
  const emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
  console.log(values.name);
  if (values.name.trim() == "") {
    errors.name = "Username is required"; 
  }
  else if (!namePattern.test(values.name)) {
    errors.name = "Username must contain at least one lowercase letter and must be between 5-25 characters";
  }
  console.log(values.email);
  if (values.email.trim() == "") {
    errors.email = "Email is required";
  }
  else if (!emailPattern.test(values.email)) {
    errors.email = "Invalid Email"
  }
  console.log(values.password);
  if (values.password.trim() == "") {
    errors.password = "Password is required";
  }
  else if (!passwordPattern.test(values.password)) {
    errors.password = "Password must be at least 8 characters and contains at least 1 lowercase lettern and at least 1 uppercase letter";
  }

  console.log(errors)
  return errors;
}