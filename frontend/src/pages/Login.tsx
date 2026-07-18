import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import AuthLayout from "../layouts/AuthLayout";

import Logo from "../components/ui/Logo";

import {
  Button,
  Card,
  Input,
  Label,
} from "../components/ui";

import {
  loginSchema,
  type LoginFormData,
} from "../validation/auth.schema";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const { loginUser } = useAuth();

  async function onSubmit(
    data: LoginFormData
  ) {
    try {
      await loginUser(data);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  }

  return (
    <AuthLayout>
      <Card
        hover={false}
        className="mx-auto w-full max-w-md rounded-3xl p-8"
      >

        {/* Logo */}

        <div className="mb-6 flex justify-center">

          <Logo variant="full" />

        </div>

        {/* Heading */}

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to continue your career journey.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>

            <Label>Email</Label>

            <Input
              type="email"
              placeholder="Enter your email"
              leftIcon={<Mail size={18} />}
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}

          </div>

          <div>

            <Label>Password</Label>

            <Input
              type="password"
              placeholder="Enter your password"
              leftIcon={<Lock size={18} />}
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}

          </div>

          <div className="flex justify-end">

            <button
              type="button"
              className="text-sm text-blue-400 transition hover:text-blue-300"
            >
              Forgot Password?
            </button>

          </div>

          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full"
          >
            Sign In
          </Button>

        </form>

        {/* Footer */}

        <div className="mt-8 border-t border-slate-800 pt-6">

          <p className="text-center text-sm text-slate-400">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="mt-2 block text-center font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Create one →
          </Link>

        </div>

      </Card>
    </AuthLayout>
  );
}