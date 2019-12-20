import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log("status has changed", status);
        status && setUsers(users => [...users, status]);
      }, [status]);
    return (
        <div>
            <Form>
                <label htmlFor="name">Name:</label>
                <Field id="name" type="text" name="name" /> 
                {touched.name && errors.name && (
                <p>{errors.name}</p>
                )}

                <label htmlFor="email">Email:</label>
                <Field id="email" type="text" name="email" />
                {touched.email && errors.email && (
                <p>{errors.email}</p>
                )}

                <label htmlFor="password">Password:</label>
                <Field id="password" type="text" name="password" />
                {touched.password && errors.password && (
                <p>{errors.password}</p>
                )}

                <label htmlFor="termsOfService">Vaccinations:</label>
                <Field id="termsOfService" type="checkbox" name="termsOfService" />
                {touched.termsOfService && errors.termsOfService && (
                <p>{errors.termsOfService}</p>
                )}

                <button type = 'submit'>Submit</button>
            </Form>
            {users.map(user => (
                <ul key = {user.id}>
                    <li>Name: {user.name}</li>
                    <li>Name: {user.email}</li>
                    <li>Name: {user.password}</li>
                </ul>

            ))}

        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, termsOfService}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: termsOfService || false,
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
        .min(3, "Too Short")
        .required("Is Required"),
        email: Yup.string()
        .min(4, "Too Short")
        .required("Is Required"),
        password: Yup.string()
        .min(8, "Too Short")
        .required("Is Required"),
        termsOfService: Yup.boolean().oneOf([true], "Must indicate if you accept")
      }),
    handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
        })
        .catch(err => console.log(err.response));
    }  
}) (UserForm)
export default FormikUserForm;