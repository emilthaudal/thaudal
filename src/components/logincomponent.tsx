import { useRouter } from "next/router";
import * as React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { login } from "../api/api";
import { authAtom } from "../state/auth";
import Card from "./card";

function LoginComponent(): JSX.Element {
  const router = useRouter();
  const setAuth = useSetRecoilState(authAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    login(data.email, data.password).then((response) =>
      setAuth({
        token: response.jwtToken,
        user: response.username,
        refresh: response.refreshToken,
      })
    );
    router.push("/");
    reset();
  };
  return (
    <Card>
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
        <button type="submit">SUBMIT</button>
      </form>
    </Card>
  );
}
export default LoginComponent;
