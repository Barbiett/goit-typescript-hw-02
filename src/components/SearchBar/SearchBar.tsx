import { IoSearchOutline } from "react-icons/io5";
import { Formik, Field, Form, ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
export default function SearchBar({
  onSearch,
  // UserSchema,
  onClickReset,
  showReset,
}) {
  const notify = () => toast("Empty! Write something");

  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        if (!values.query.trim()) {
          notify();
          return;
        }

        onSearch(values.query);
        actions.resetForm();
      }}
      // validationSchema={UserSchema}
    >
      <Form className={css.form}>
        <ErrorMessage
          name="query"
          component="span"
          style={{
            color: "red",
            textAlign: "center",
            fontSize: "30px",
            paddingRight: "20px",
          }}
        />

        <Field
          className={css.field}
          name="query"
          placeholder="Write something /"
        />
        <button type="submit">
          Search
          <IoSearchOutline size={30} className={css.icon} />
        </button>
        {showReset && (
          <button onClick={onClickReset} type="button">
            Reset
          </button>
        )}
        <Toaster
          toastOptions={{
            style: {
              background: "orangered",
              color: "white",
              border: "1px solid black",
              fontSize: "18px",
            },
          }}
        />
      </Form>
    </Formik>
  );
}
