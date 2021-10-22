import { Button, Form, FormControl } from "react-bootstrap"
import { Formik } from "formik"
import { useLocation } from "wouter"

const SearchForm = () => {
    const [path, pushLocation] = useLocation()
    return (
        <Formik
            initialValues={{
                search: ''
            }}
            validate={(values) => {
                const errors = {}
                if(!values.search) {
                    errors.search = 'El campo de búsqueda no debe estar vacío'
                }
                return errors

            }}
            onSubmit={(values, {resetForm}) => {
                resetForm()
                pushLocation(`/search/${values.search}`)
                console.log(`Buscando ${values.search}`)
            }}
        >
            {({values, errors, touched, handleSubmit, handleChange, handleBlur}) => (
                <Form className="d-flex" onSubmit={handleSubmit}>
                    <FormControl
                        type="search"
                        name="search"
                        placeholder="Search a superhero"
                        aria-label="Search"
                        value={values.search}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mr-2"
                    />
                    <Button type="submit" variant="outline-success">Search</Button>
                </Form>
            )}
        </Formik>
    )
}

export default SearchForm