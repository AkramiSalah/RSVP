// app/login/page.js
'use client';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button onClick={handleGoogleSignIn} className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign in with Google
      </button>
    </div>
  );
}
