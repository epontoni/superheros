import { useState } from "react"
import { Formik } from "formik"
import { Alert, Button, Form } from "react-bootstrap"
//import getLoginToken from "../../services/getLoginToken"
import axios from "axios"
import { useLocation } from "wouter"
import { useDispatch } from "react-redux"
import { logInUser } from "../../actions"

const LoginForm = () => {
    const [authorized, setAuthorized] = useState('')
    const [location, setLocation] = useLocation()
    const dispatch = useDispatch()
    return (
        <Formik
            initialValues={{
                email: 'challenge@alkemy.org',
                password: 'react'
            }}
            validate={(values) => {
                const errors = {}
                if(!values.email) {
                    console.log('Por favor ingrese un email.')
                    errors.email = 'Por favor ingrese un email.'
                } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)){
                    errors.email = 'El correo sólo puede contener letras, números, puntos, guiones y guión bajo e incluir @'
                }
                if(!values.password) {
                    console.log('Por favor ingrese un password.')
                    errors.password = 'Por favor ingrese un password.'
                }
                return errors

            }}
            onSubmit={async (values, {resetForm}) => {
                resetForm()

                const credentials = {
                    email: values.email,
                    password: values.password
                }

                //console.log(`Enviando formulario con los datos: email ${values.email} y password: ${values.password}`)
                
                axios
                  .post("http://challenge-react.alkemy.org", credentials)
                  .then((response) => response.data)
                  .then((data) => {
                      const { token } = data
                      const { password, ...email } = credentials 
                      window.localStorage.setItem(
                          'loggedAppUser', JSON.stringify({...email , token})
                      )
                      dispatch(logInUser())
                      setLocation('/')
                      //console.log(data, token)
                  })
                  .catch((e) => {
                    console.log(e.response.data.error);
                    setAuthorized(e.response.data.error)
                    setTimeout( () => {
                        setAuthorized('')
                    }, 5000)
                  });
            }}
        >
            {({values, errors, touched, handleSubmit, handleChange, handleBlur}) => (
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        name="email" 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.email && errors.email && (
                                <Form.Text className="text-danger">
                                    {errors.email}
                                </Form.Text>
                            )
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.password && errors.password && (
                                <Form.Text className="text-danger">
                                    {errors.password}
                                </Form.Text>
                            )
                    }
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg">
                        Log in!
                    </Button>
                </div>
                {
                    authorized
                        ?
                        (
                            <Alert variant='danger' className="my-4">
                                {authorized}
                            </Alert> 
                        )
                        : null
                }
            </Form> 
            )}
        </Formik>
    )
}

export default LoginForm