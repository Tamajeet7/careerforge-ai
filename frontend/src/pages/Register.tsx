import { User, Mail, Lock } from "lucide-react";
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
  registerSchema,
  type RegisterFormData,
} from "../validation/auth.schema";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const { registerUser } = useAuth();

  async function onSubmit(
    data: RegisterFormData
  ) {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
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
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Build your AI-powered career in minutes.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <div>

            <Label>Full Name</Label>

            <Input
              placeholder="John Doe"
              leftIcon={<User size={18} />}
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-400">
                {errors.name.message}
              </p>
            )}

          </div>

          <div>

            <Label>Email</Label>

            <Input
              type="email"
              placeholder="john@example.com"
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
              placeholder="Create a password"
              leftIcon={<Lock size={18} />}
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}

          </div>

          <div>

            <Label>Confirm Password</Label>

            <Input
              type="password"
              placeholder="Confirm your password"
              leftIcon={<Lock size={18} />}
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}

          </div>

          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full"
          >
            Create Account
          </Button>

        </form>

        {/* Footer */}

        <div className="mt-8 border-t border-slate-800 pt-6">

          <p className="text-center text-sm text-slate-400">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="mt-2 block text-center font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Sign In →
          </Link>

        </div>

      </Card>
    </AuthLayout>
  );
}