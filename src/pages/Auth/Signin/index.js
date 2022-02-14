 
import React from "react";
import { Box,Button,Flex,  Input, FormControl,  FormLabel, Heading, Alert,} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
 import {fetchLogin} from "../../../api.js"
 import { useAuth } from "../../../contexts/AuthContext";
 
function Signin({history}) {
  const {login}=useAuth();

 const formik=useFormik({
	initialValues: {
    email: "",
    password: "",
    passwordConfirm: "",
  },
  validationSchema,
  onSubmit:async(values,bag)=>{
  try {
    const loginResponse = await fetchLogin({
      email:values.email,
      password:values.password
    })
login(loginResponse)
history.push("/profile")

    console.log(loginResponse);
  } catch (e) {
    bag.setErrors({ general: e.response.data.message });

  }
  }
 })
 
  return (

  <div>

<Flex justifyContent="center" align="center" width="full">
<Box pt={10}> 
  <Box textAlign="center">
<Heading >Sign In</Heading>
  </Box>

    <Box my={5}>
						{formik.errors.general && (
							<Alert status="error">{formik.errors.general}</Alert>
						)}
					</Box>

  <Box my={5} textAlign="left">     
  
  <form onSubmit={formik.handleSubmit}>       
<FormControl>
  <FormLabel htmlFor='email'>Email address</FormLabel>
  <Input name='email'
  onChange={formik.handleChange}
  onBlur={formik.handleBlur} 
  value={formik.values.email} 
  isInvalid={formik.touched.email&&formik.errors.email}
  />

  <FormLabel htmlFor='password'>password</FormLabel>
  <Input name='password' type='password'
   onChange={formik.handleChange}
   onBlur={formik.handleBlur} 
   value={formik.values.password} 
   isInvalid={formik.touched.password&&formik.errors.password} />

</FormControl>
   <Button mt="4" width="full" type="submit">
								Sign In
	</Button>
</form>
</Box>
</Box>

</Flex>
  </div>
  
  )
}

export default Signin;
