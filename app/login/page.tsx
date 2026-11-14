import LoginForm from "@/app/login/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12 text-neutral-950">
      <section className="w-full max-w-sm">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">
          Ujala / Admin
        </p>
        <h1 className="mt-4 font-sans text-4xl font-semibold tracking-tighter">
          Sign in
        </h1>
        <LoginForm />
      </section>
    </main>
  );
}
