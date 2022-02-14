import * as yup from "yup"

const validations=yup.object().shape( {
 email: yup.string().email("geçerli email giriniz").required("zorunlu alan"),
 password:yup.string().min(5,"parolanız en az 5 karakter olmalı").required("zorunlu ala"),
}
)
export default validations;
