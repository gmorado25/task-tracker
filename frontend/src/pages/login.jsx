// LoginPage.jsx
const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <a href="http://localhost:5000/auth/google">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
          Sign in with Google
        </button>
      </a>
    </div>
  );
};