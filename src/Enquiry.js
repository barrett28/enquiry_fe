import { useFormik } from "formik";
import axios from "axios";

function Enquiry()
{
	const initialValues = {"name":"", "phone":"", "query":""};
	
	const validate = (values) =>{
		const errors = {};

		if (values.name.trim().length <2)
		{
			errors.name = "Invalid name";
		}
		if (! values.name.match('[A-Za-z]+'))
			errors.name = "name should contain only alphabet";
		if (values.phone.toString().length !==10)
			errors.phone = "Invalid Phone";
		if (values.query.trim().length <2)
			errors.query = "Invalid Query";
		return errors;
	}
	const onSubmit = (values, {resetForm}) =>{
		let data = {"name":values.name, "phone":values.phone, "query":values.query};
		let urladd = "https://enquiryapp-g6ssh4gnc-barrett28.vercel.app/save";
		axios.post(urladd, data)
		.then(res=>{
			alert("we will get back to you");
			resetForm();
		})
		.catch(err => console.log(err));
	}
	const formik = useFormik({initialValues, validate, onSubmit});

	return(
		<>
		<center>
		<h1>Fill the form</h1>
		<form onSubmit={formik.handleSubmit}>
		<input type="text" name="name" placeholder="enter ur name"
		onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
		{formik.touched.name && formik.errors.name ? <div className="err">{formik.errors.name}</div>:null}
		<br/><br/>
		<input type="number" name="phone" placeholder="enter phone"
		onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
		{formik.touched.phone && formik.errors.phone ? <div className="err">{formik.errors.phone}</div>:null}
		<br/><br/>
		<textarea name="query" placeholder="enter ur query" row={5} cols={22} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.query} ></textarea>
		{formik.touched.query && formik.errors.query ? <div className="err">{formik.errors.query}</div>:null}
		<br/><br/>
		<input type="submit" value="Send" />
		<br/>
		</form>
		</center>
		</>
	);
}
export default Enquiry;