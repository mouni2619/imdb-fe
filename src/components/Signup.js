// import { TextField, Typography } from "@mui/material";
// import React, { useState } from "react";
// import IMDBIcon from "../assets/imdb_icon.png";
// import { LoadingButton } from "@mui/lab";
// import { Link, useNavigate } from "react-router-dom";
// import * as yup from "yup";
// import { useFormik } from "formik";

// const formValidationSchema = yup.object().shape({
//   username: yup
//     .string()
//     .min(4, "Atleast 4 charaters required.")
//     .required("* Fill Username"),
//   email: yup
//     .string()
//     .email("Enter valid email address")
//     .required("* Fill Email Address"),
//   password: yup.string().required("* Fill Password"),
// });

// function Signup() {
//   const navigate = useNavigate();
//   const [loadingButton, setLoadingButton] = useState(false);
//   const [err, setErr] = useState("");
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//     validationSchema: formValidationSchema,
//     onSubmit: (values) => {
//       setLoadingButton(true);
//       createUser(values);
//     },
//   });

//   const createUser = async (values) => {
//     await fetch(`${process.env.REACT_APP_API_LINK}/user/signup`, {
//       method: "POST",
//       body: JSON.stringify(values),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setLoadingButton(false);
//         if (data.message) {
//           navigate("/login");
//         } else {
//           setErr(data.error);
//         }
//       });
//   };
//   return (
//     <div className="signup-main-div d-flex justify-content-center align-items-center">
//       <form
//         onSubmit={formik.handleSubmit}
//         className="signup-div container-sm p-2 p-sm-5 d-flex flex-column justify-content-center align-items-center"
//       >
//         <img src={IMDBIcon} alt="imdb_icon" />
//         <h3>WELCOME</h3>
//         <div className="mt-4 w-100">
//           <TextField
//             id="username"
//             name="username"
//             type="text"
//             value={formik.values.username}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             variant="outlined"
//             label="Username"
//             fullWidth
//             size="small"
//           />
//           {formik.touched.username && formik.errors.username ? (
//             <p className="text-danger">{formik.errors.username}</p>
//           ) : (
//             ""
//           )}
//         </div>
//         <div className="mt-3 w-100">
//           <TextField
//             id="email"
//             name="email"
//             type="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             variant="outlined"
//             label="Email"
//             fullWidth
//             size="small"
//           />
//           {formik.touched.email && formik.errors.email ? (
//             <p className="text-danger">{formik.errors.email}</p>
//           ) : (
//             ""
//           )}
//         </div>
//         <div className="mt-3 w-100">
//           <TextField
//             id="password"
//             name="password"
//             type="password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             variant="outlined"
//             label="Password"
//             fullWidth
//             size="small"
//           />
//           {formik.touched.password && formik.errors.password ? (
//             <p className="text-danger">{formik.errors.password}</p>
//           ) : (
//             ""
//           )}
//         </div>
//         <div className="w-100 text-center">
//           {err ? (
//             <Typography className="mt-3" color={"error"}>
//               {err}
//             </Typography>
//           ) : null}
//         </div>
//         <LoadingButton
//           className="mt-3"
//           variant="contained"
//           loading={loadingButton}
//           type="submit"
//         >
//           Create
//         </LoadingButton>
//         <Link
//           className="mt-4 w-100 text-center text-decoration-none text-black login-link"
//           to={"/login"}
//         >
//           Already have an Account, Login ...
//         </Link>
//       </form>
//     </div>
//   );
// }

// export default Signup;


import { TextField, Typography, Paper, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import IMDBIcon from "../assets/imdb_icon.png";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

// Form validation schema
const formValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "At least 4 characters required.")
    .required("Required"),
  email: yup
    .string()
    .email("Enter valid email address")
    .required("Required"),
  password: yup.string().required("Required"),
});

function Signup() {
  const navigate = useNavigate();
  const [loadingButton, setLoadingButton] = useState(false);
  const [err, setErr] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      setLoadingButton(true);
      createUser(values);
    },
  });

  // Function to create a user
  const createUser = async (values) => {
    await fetch(`${process.env.REACT_APP_API_LINK}/user/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoadingButton(false);
        if (data.message) {
          navigate("/login");
        } else {
          setErr(data.error);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs"  className="mt-5">
      <Paper elevation={3} className="p-4">
        <div className="text-center mb-3">
          <img src={IMDBIcon} alt="imdb_icon" style={{ width: "50px" }} />
          <Typography variant="h5" component="h1">Join Us Today!</Typography>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="username"
                name="username"
                type="text"
                label="Username"
                variant="outlined"
                fullWidth
                size="small"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                size="small"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            {err && (
              <Grid item xs={12}>
                <Typography className="text-danger text-center">{err}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <LoadingButton
                className="mt-2"
                variant="contained"
                loading={loadingButton}
                type="submit"
                fullWidth
              >
                Create Account
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
        <Typography variant="body2" align="center" className="mt-3">
          Already have an account? 
          <Link to="/login" className="text-primary">
            <strong> Login here</strong>
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Signup;

