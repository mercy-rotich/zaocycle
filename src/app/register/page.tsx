import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-green-500">ZaoCycle</span>
          <p className="mt-1 text-slate-400 text-sm">Create your buyer account</p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 ring-1 ring-slate-800">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
