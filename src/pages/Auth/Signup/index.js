import React from "react";
import { Box,Button,Flex,  Input, FormControl,  FormLabel, Heading, Alert,} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
 import {fetchRegister} from "../../../api.js"
 import { useAuth } from "../../../contexts/AuthContext";
 
function Signup({history}) {
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
    const registerResponse = await fetchRegister({
      email:values.email,
      password:values.password
    })
login(registerResponse)
history.push("/profile")

    console.log(registerResponse);
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
<Heading >Sign Up</Heading>
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

  <FormLabel htmlFor='passwordConfirm'>password Confirm</FormLabel>
  <Input name='passwordConfirm' type='password'
    onChange={formik.handleChange}
    onBlur={formik.handleBlur} 
    value={formik.values.passwordConfirm} 
    isInvalid={formik.touched.passwordConfirm && 
              formik.errors.passwordConfirm}  />
</FormControl>
   <Button mt="4" width="full" type="submit">
								Sign Up
	</Button>
</form>
</Box>
</Box>

</Flex>
  </div>
  
  )
}

export default Signup;
