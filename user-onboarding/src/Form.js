import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserForm = ({ values, status, touched, errors }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
      status && setUsers(users => [...users, status])
  }, [status])

  return (
    <div>
      <Form>
        <Field type="text" name="name" placeholder="name" />
        {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
        )}

        <Field type="text" name="email" placeholder="email" />
        {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
        )}
        
        <Field type="password" name="password" placeholder="password" />
        {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
        )}
        
        <label>Accept Terms and Conditions
        
        <Field type="checkbox" name="terms" placeholder="name" />
        {touched.terms && errors.terms && (
            <p className="error">{errors.terms}</p>
        )}
        </label>
        
        <button type="submit">Submit New User </button>
      
      </Form>
      {users.map(user => (
          <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikUserForm = withFormik({
    mapPropsToValues( {name, email, password, terms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
        terms: Yup.boolean().oneOf([true], "Please accept the terms and conditions")
    }),
    handleSubmit(values, {setStatus}) {
        axios.post('https://reqres.in/api/users/', values)
        .then(res => {setStatus(res.data); })
        .catch(err => console.log(err.respose));
    }

})(UserForm);

export default FormikUserForm;
