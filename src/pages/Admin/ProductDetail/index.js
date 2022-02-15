import { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchProduct, updateProduct } from "../../../api";
import { message } from "antd";
import { Link, useParams } from "react-router-dom";
import {
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { Formik, FieldArray } from "formik";
import TextArea from "antd/lib/input/TextArea";
import validationSchema from "./validations";

function ProductDetail() {
  const { product_id } = useParams();

  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProduct(product_id)
  );
  if (isLoading) {
    return <div> ....loading</div>;
  }
  if (isError) {
    return <div> Error {error.message}</div>;
  }

  const handleSubmit = async (values, bag) => {
    console.log("submit");
    message.loading({ content: "Loading...", key: "product_update" });

    try {
      await updateProduct(values, product_id);
      message.success({
        content: "The product successfully updated",
        key: "product_update",
        duration: 2,
      });
    } catch (e) {
      message.error("the product does not update ");
    }
  };
  return (
    <div>
      <Text fontSize="2xl" p="5">
        <Formik
          initialValues={{
            title: data.title,
            description: data.description,
            price: data.price,
            photos: data.photos,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            handleBlur,
            errors,
            touched,
            values,
            isSubmitting,
            handleChange,
          }) => (
            <>
              <Box>
                <Box my="5" textAlign="left">
                  <form onSubmit={handleSubmit}>
                    <FormControl mt="4">
                      <FormLabel> title</FormLabel>
                      <Input
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        disabled={isSubmitting}
                        isInvalid={touched.title && errors.title}
                      />
                      {touched.title && errors.title && (
                        <Text color="red.500"> {errors.title}</Text>
                      )}
                    </FormControl>
                    <FormControl mt="4">
                      <FormLabel> description</FormLabel>
                      <TextArea
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        disabled={isSubmitting}
                        isInvalid={touched.description && errors.description}
                      />
                      {touched.description && errors.description && (
                        <Text color="red.500"> {errors.description}</Text>
                      )}
                    </FormControl>
                    <FormControl mt="4">
                      <FormLabel> price</FormLabel>
                      <Input
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        disabled={isSubmitting}
                        isInvalid={touched.price && errors.price}
                      />
                      {touched.price && errors.price && (
                        <Text color="red.500"> {errors.price}</Text>
                      )}
                    </FormControl>
                    <FormControl mt="4">
                      <FormLabel> photos</FormLabel>
                      <FieldArray
                        name="photos"
                        render={(arrayHelpers) => (
                          <div>
                            {values.photos &&
                              values.photos.map((photo, index) => (
                                <div key={index}>
                                  <Input
                                    name={`photos.${index}`}
                                    value={photo}
                                    disabled={isSubmitting}
                                    onChange={handleChange}
                                    width="4xl"
                                  />
                                  <Button
                                    ml="4"
                                    type="button"
                                    colorScheme="red"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            <Button
                              mt="5"
                              type="button"
                              colorScheme="red"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Add A photo
                            </Button>
                          </div>
                        )}
                      ></FieldArray>
                    </FormControl>
                    <Button
                      mt={4}
                      width="full"
                      type="submit"
                      colorScheme="red"
                      isLoading={isLoading}
                    >
                      Update
                    </Button>
                  </form>
                </Box>
              </Box>
            </>
          )}
        </Formik>
      </Text>
    </div>
  );
}
export default ProductDetail;
