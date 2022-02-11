import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { createUser, login } from "../api/api";
import { authAtom } from "../state/auth";
import BigButton from "./bigButton";

interface CreateUserComponentProps {
  login: boolean;
}

function CreateUserComponent(signIn: CreateUserComponentProps): JSX.Element {
  const setAuth = useSetRecoilState(authAtom);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    setLoading(true);
    if (signIn.login) {
      login(data.email, data.password)
        .then((response) => {
          if (!response.jwtToken || !response.username) {
            throw new Error("Invalid credentials");
          }

          setAuth({
            token: response.jwtToken,
            user: response.username,
            refresh: response.refreshToken,
          });
          setLoading(false);
          router.push("/");
        })
        .catch((err) => {
          throw new Error(err);
        });
      //reset();
    } else {
      createUser(data.email, data.password, data.name)
        .then((response) => {
          setAuth({
            token: response.jwtToken,
            user: response.username,
            refresh: response.refreshToken,
          });
          setLoading(false);
          router.push("/");
        })
        .catch((err) => {
          throw new Error(err);
        });
      // reset();
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-column m-4 p-6 space-x-4 space-y-4"
    >
      <label htmlFor="email">email</label>
      <input
        className="text-black"
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
        className="text-black"
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
      {!signIn.login ? (
        <div>
          <label htmlFor="name">name</label>
          <input
            className="text-black"
            id="name"
            {...register("name", {
              required: "required",
            })}
            type="text"
          />
          {errors.name && <span role="alert">{errors.name.message}</span>}
        </div>
      ) : null}

      <BigButton type="submit" text="Submit" onClick={() => {}}></BigButton>
    </form>
  );
}
export default CreateUserComponent;
