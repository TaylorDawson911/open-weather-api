import { useFormik } from "formik";
import UserContext from "../../usercontext";
import { basicSchema, loginSchema } from "../../schemas";
import Axios from "axios";
import Cookies from 'js-cookie';
import { reach } from "yup";
import React, { useContext } from "react";
const bcrypt = require('bcryptjs');

// add Access-Control-Allow-Origin header to the request



const Login = () => {

  const onSubmit = async (values, actions) => {
    
    console.log(values);
    console.log(actions);
      try {
          // add Access-Control-Allow-Origin header to the request
  
          Axios.post("http://localhost:3001/login", {
              email: values.email,
              password: values.password,
          }).then((response) => {
              if (response.data.message == "Wrong email/password combination!") {
                  document.getElementById("dberror").innerHTML = "Wrong email/password combination!";
              } else {

                const token = response.data.token_name
                console.log(token)
                sessionStorage.setItem("jwt", token)

                const first_name = response.data.firstName
                const last_name = response.data.lastName
                const email = response.data.email
                const profile_pic = response.data.userPic
                const authorization_level = response.data.authorizationLevel
                const id = response.data.id

                const userData = {
                  user_id: id,
                  first_name: first_name,
                  last_name: last_name,
                  email: email,
                  profile_pic: profile_pic,
                  authorization_level: authorization_level
                }

                sessionStorage.setItem("UserData", JSON.stringify(userData))

                window.location.href = "/Dashboard"

              }
          });
      } catch (error) {
          console.log(error);
      }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
      } = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: loginSchema,
        onSubmit,
        
      });
    
    return (

        <div className="LoginForm">
          <div className="GlassForm">
          
          <form onSubmit={handleSubmit}>
          <h2>Login</h2>
            <div className="form-group">
              <p className="plabel" htmlFor="email">Email</p>
              <input 
              type="text" 
              id="email" 
              values={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className= {errors.email && touched.email ? "input-error" : ""}
              placeholder="Enter email" />
              {errors.email && touched.email && <p className="error">{errors.email}</p>}
              
            </div>
            <div className="form-group">
              <p className="plabel" htmlFor="password">Password</p>
              <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "input-error" : ""}
              />
              {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
              )}
            </div>
            <div className="bottomForm">
              <p className="error" id="dberror"></p>
              <button className=""disabled={isSubmitting} type="submit">
                Submit
              </button>
              <div className="centered">
              <small><a href="#">Forgot your password?</a></small>
              </div>
              <div className="centered">
              <small><a href="/register">Don't have an account? Sign up</a></small>
              </div>
            </div>

            
          </form>
        
        </div>
      </div>
    );
}


export default Login;