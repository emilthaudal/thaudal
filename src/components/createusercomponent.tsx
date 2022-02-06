import { useRouter } from "next/router";
import * as React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { createUser } from "../api/api";
import { authAtom } from "../state/auth";

function CreateUserComponent(): JSX.Element {
  const setAuth = useSetRecoilState(authAtom);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    createUser(data.email, data.password, data.name)
      .then((response) =>
        setAuth({
          token: response.jwtToken,
          user: response.username,
          refresh: response.refreshToken,
        })
      )
      .catch(() => {});
    reset();
    router.push("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">email</label>
      <input
        id="email"
        {...register("email", {
          required: "required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        })}
        type="email"
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}
      <label htmlFor="password">password</label>
      <input
        id="password"
        {...register("password", {
          required: "required",
          minLength: {
            value: 5,
            message: "min length is 5",
          },
        })}
        type="password"
      />
      {errors.password && <span role="alert">{errors.password.message}</span>}
      <input
        id="name"
        {...register("name", {
          required: "required",
        })}
        type="text"
      />
      {errors.name && <span role="alert">{errors.name.message}</span>}
      <button type="submit">SUBMIT</button>
    </form>
  );
}
export default CreateUserComponent;
